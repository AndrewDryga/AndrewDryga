#!/usr/bin/env node
import { spawn } from "node:child_process";
import { access, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { htmlToText } from "html-to-text";

const distDir = process.argv[2] ?? "dist";
const baseUrl = process.env.LLMS_BASE_URL ?? "https://dryga.com/";
const forceRebuild = process.env.LLMS_FORCE_REBUILD === "true";
const buildIfMissing = process.env.LLMS_BUILD_IF_MISSING === "true";
const defaultTargets = [
  join(distDir, "llms-full.txt"),
  join("public", "llms-full.txt"),
];
const rawTargetList = process.env.LLMS_EXPORT_TARGETS ?? defaultTargets.join(",");
const targets = rawTargetList
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean)
  .filter((value, index, self) => self.indexOf(value) === index);

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectHtmlFiles(fullPath);
      }
      if (entry.isFile() && entry.name.endsWith(".html")) {
        return fullPath;
      }
      return [];
    }),
  );
  return files.flat();
}

function routeFromFile(file) {
  let rel = relative(distDir, file).replace(/\\+/g, "/");
  if (!rel.startsWith("/")) rel = `/${rel}`;
  let routePath = rel.replace(/index\.html$/, "");
  if (routePath === "" || routePath === "/") {
    routePath = "/";
  }
  const url = new URL(routePath, baseUrl).toString();
  const relPath = rel.slice(1) || "index.html";
  return { rel: relPath, url };
}

function normalizeWhitespace(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function toPlainText(html) {
  const plain = htmlToText(html, {
    wordwrap: 100,
    selectors: [
      { selector: "a", options: { hideLinkHrefIfSameAsText: true } },
      { selector: "img", format: "skip" },
      { selector: "nav", format: "skip" },
      { selector: "script", format: "skip" },
      { selector: "style", format: "skip" },
    ],
  });
  return sanitizeText(normalizeWhitespace(plain));
}

function sanitizeText(text) {
  const replacements = new Map([
    ["\u203a", ">"],
    ["\u2039", "<"],
    ["\u00a9", "(c)"],
    ["\u00ae", "(r)"],
    ["\u2013", "-"],
    ["\u2014", "-"],
    ["\u2011", "-"],
    ["\u2018", "'"],
    ["\u2019", "'"],
    ["\u201c", '"'],
    ["\u201d", '"'],
    ["\u00b7", "-"],
    ["\u00d7", "x"],
    ["\u00b2", "^2"],
    ["\u0142", "l"],
    ["\u2212", "-"],
    ["\u2022", "-"],
    ["\u2190", "<-"],
    ["\u2191", "^"],
    ["\u2192", "->"],
    ["\u2193", "v"],
    ["\u2500", "-"],
    ["\u2502", "|"],
    ["\u250c", "+"],
    ["\u2510", "+"],
    ["\u2514", "+"],
    ["\u2518", "+"],
    ["\u251c", "+"],
    ["\u252c", "+"],
    ["\u2588", "#"],
    ["\u258a", "#"],
    ["\u2591", "."],
    ["\u25b2", "^"],
    ["\u25b6", ">"],
    ["\u25bc", "v"],
    ["\u25c0", "<"],
    ["\u25cf", "*"],
    ["\u2b22", "*"],
    ["\ud83c\udfc6", "[trophy]"],
    ["\ud83d\ude05", "[sweat_smile]"],
    ["\ud83d\ude31", "[scream]"],
    ["\ud83d\ude43", "[upside_down]"],
    ["\ud83e\udd2c", "[rage]"],
  ]);
  let result = "";
  for (const char of text) {
    if (replacements.has(char)) {
      result += replacements.get(char);
    } else {
      result += char;
    }
  }
  return result;
}

async function main() {
  if (!targets.length) {
    console.error("No export targets configured. Set LLMS_EXPORT_TARGETS or use defaults.");
    process.exit(1);
  }

  if (!forceRebuild) {
    const targetStates = await Promise.all(targets.map(pathExists));
    if (targetStates.every(Boolean)) {
      console.log("LLM export already exists for all targets. Skipping.");
      return;
    }
  }

  const distReady = await ensureDistDir();
  if (!distReady) {
    console.error(`Build output not found in "${distDir}". Run \`npm run build\` first.`);
    process.exit(1);
  }

  const htmlFiles = await collectHtmlFiles(distDir);
  htmlFiles.sort();

  const sections = await Promise.all(
    htmlFiles.map(async (file) => {
      const html = await readFile(file, "utf8");
      const stats = await stat(file);
      const text = toPlainText(html);
      if (!text) return "";
      const { rel, url } = routeFromFile(file);
      const chars = text.length;
      const words = text.split(/\s+/).filter(Boolean).length;
      const title = extractTitle(html) ?? "Untitled";
      const lastModified = stats.mtime.toISOString();
      return [
        `URL: ${url}`,
        `Path: ${rel}`,
        `Title: ${title}`,
        `Last-Modified: ${lastModified}`,
        `Content-Length: ${chars} characters (~${words} words)`,
        "Content:",
        text,
      ].join("\n");
    }),
  );

  const filteredSections = sections.filter(Boolean);
  const header = [
    "# dryga.com - Full Content Export",
    `Generated: ${new Date().toISOString()}`,
    `Source directory: ${distDir}`,
    `Base URL: ${baseUrl}`,
    "",
    "Each section below is delimited by a line containing exactly five dashes (-----).",
    "Every section includes the canonical URL, relative path, title, last-modified timestamp, character count, and the rendered text.",
    "",
  ].join("\n");

  const footer = "\n-----\nExport generated from static build output.\n";

  const finalContent = [header, "-----", filteredSections.join("\n-----\n"), footer].join("\n");

  async function writeWithDirs(path, content) {
    try {
      await writeFile(path, content, "utf8");
    } catch (error) {
      if (error && error.code === "ENOENT") {
        await mkdir(dirname(path), { recursive: true });
        await writeFile(path, content, "utf8");
      } else {
        throw error;
      }
    }
  }

  for (const target of targets) {
    await writeWithDirs(target, finalContent);
  }

  console.log(`LLM export written to ${targets.join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

function extractTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!match) return undefined;
  return match[1].replace(/\s+/g, " ").trim();
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function ensureDistDir() {
  try {
    await stat(distDir);
    return true;
  } catch {
    if (!buildIfMissing) {
      return false;
    }
    await runAstroBuild(distDir);
    return true;
  }
}

async function runAstroBuild(outDir) {
  console.log(`Building Astro output at "${outDir}" for LLM export...`);
  const astroCmd = process.platform === "win32" ? "astro.cmd" : "astro";
  await new Promise((resolve, reject) => {
    const child = spawn(
      astroCmd,
      ["build", "--outDir", outDir, "--silent"],
      {
        stdio: "inherit",
        shell: process.platform === "win32",
      },
    );
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Astro build failed with exit code ${code}`));
    });
    child.on("error", reject);
  });
}
