#!/usr/bin/env node
/**
 * Simple Blog Migration Script
 *
 * Reads .md files from 'ready' folder and uploads to Strapi
 * - Title = filename
 * - Content = full file content
 */

const fs = require("fs");
const path = require("path");

const READY_FOLDER = path.join(__dirname, "ready");
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

/**
 * Convert filename to title
 * "my-blog-post.md" -> "My Blog Post"
 */
function filenameToTitle(filename) {
  return path
    .basename(filename, ".md")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Upload article to Strapi
 */
async function uploadArticle(title, content) {
  const response = await fetch(`${STRAPI_URL}/api/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        title: title,
        content: content,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  return await response.json();
}

/**
 * Main migration
 */
async function migrate() {
  console.log("🚀 Starting migration...\n");

  // Check folder exists
  if (!fs.existsSync(READY_FOLDER)) {
    console.error('❌ Folder "ready" not found!');
    process.exit(1);
  }

  // Get all .md files
  const files = fs.readdirSync(READY_FOLDER).filter((f) => f.endsWith(".md"));

  if (files.length === 0) {
    console.log('⚠️  No .md files found in "ready" folder');
    process.exit(0);
  }

  console.log(`📂 Found ${files.length} file(s)\n`);

  let success = 0;
  let failed = 0;

  // Process each file
  for (const file of files) {
    try {
      const filePath = path.join(READY_FOLDER, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const title = filenameToTitle(file);

      console.log(`📄 ${file}`);
      console.log(`   Title: "${title}"`);

      const result = await uploadArticle(title, content);
      console.log(`   ✅ Uploaded (ID: ${result.data.id})\n`);

      success++;
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}\n`);
      failed++;
    }
  }

  // Summary
  console.log("═".repeat(40));
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Failed: ${failed}`);
  console.log("═".repeat(40));

  if (success > 0) {
    console.log(`\n🎉 Done! Check: ${STRAPI_URL}/admin`);
  }
}

migrate().catch((err) => {
  console.error("💥 Error:", err);
  process.exit(1);
});
