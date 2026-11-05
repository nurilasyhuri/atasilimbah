import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('dist/ does not exist. Run npm run build first.');
  process.exit(1);
}

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html') && !file.includes('404')) {
      results.push(filePath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(DIST_DIR);
console.log(`Checking SEO completeness across ${htmlFiles.length} HTML pages...\n`);

let errorsCount = 0;
let passCount = 0;

for (const filePath of htmlFiles) {
  const relativePath = path.relative(DIST_DIR, filePath);
  const html = fs.readFileSync(filePath, 'utf8');

  // 1. Check title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) {
    console.error(`[FAIL] ${relativePath}: Missing <title> tag`);
    errorsCount++;
    continue;
  }
  const title = titleMatch[1].trim();

  if (title.includes('|')) {
    console.error(`[FAIL] ${relativePath}: Title contains '|' separator: "${title}"`);
    errorsCount++;
  }
  if (title.includes('—')) {
    console.error(`[FAIL] ${relativePath}: Title contains '—' separator: "${title}"`);
    errorsCount++;
  }
  if (title.length < 55 || title.length > 70) {
    console.error(`[FAIL] ${relativePath}: Title length out of range (55-70 chars): ${title.length} chars -> "${title}"`);
    errorsCount++;
  }

  // 2. Check meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (!descMatch) {
    console.error(`[FAIL] ${relativePath}: Missing <meta name="description">`);
    errorsCount++;
    continue;
  }
  const desc = descMatch[1].trim();
  if (desc.length < 120 || desc.length > 155) {
    console.error(`[FAIL] ${relativePath}: Description length out of range (120-155 chars): ${desc.length} chars -> "${desc}"`);
    errorsCount++;
  }
  if (!desc.endsWith('.')) {
    console.error(`[FAIL] ${relativePath}: Description does not end with full stop: "${desc}"`);
    errorsCount++;
  }

  // 3. Check author and publisher
  const authorMatch = html.match(/<meta\s+name="author"\s+content="([^"]+)"/i);
  if (!authorMatch) {
    console.error(`[FAIL] ${relativePath}: Missing <meta name="author"> tag`);
    errorsCount++;
  }
  const publisherMatch = html.match(/<meta\s+name="publisher"\s+content="([^"]+)"/i);
  if (!publisherMatch) {
    console.error(`[FAIL] ${relativePath}: Missing <meta name="publisher"> tag`);
    errorsCount++;
  }

  // 4. Check canonical
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (!canonMatch || !canonMatch[1].startsWith('https://atasilimbah.com')) {
    console.error(`[FAIL] ${relativePath}: Invalid or missing canonical: ${canonMatch ? canonMatch[1] : 'NONE'}`);
    errorsCount++;
  }

  // 5. Check JSON-LD
  const jsonLdMatch = html.match(/<script\s+is:inline\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i) ||
                     html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!jsonLdMatch) {
    console.error(`[FAIL] ${relativePath}: Missing JSON-LD schema`);
    errorsCount++;
  } else {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      if (!parsed['@context']) {
        console.error(`[FAIL] ${relativePath}: Invalid JSON-LD structure`);
        errorsCount++;
      }
    } catch (e) {
      console.error(`[FAIL] ${relativePath}: JSON-LD parse error: ${e.message}`);
      errorsCount++;
    }
  }

  passCount++;
  console.log(`[PASS] ${relativePath} | Title (${title.length}c): "${title}" | Desc (${desc.length}c)`);
}

console.log(`\n================================`);
console.log(`SEO Audit Completed: ${passCount} pages checked.`);
if (errorsCount > 0) {
  console.error(`Total Errors: ${errorsCount}`);
  process.exit(1);
} else {
  console.log(`Status: 100% PASS (0 errors). Perfect compliance!`);
}
