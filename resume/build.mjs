// Prints resume/index.html to public/Burce_Boran_Resume_2026.pdf, the résumé
// the site links to: node resume/build.mjs
//
// It serves the repository on a local port (the page loads the site's fonts
// and my portrait from it), opens the page in headless Chrome or Chromium and
// saves it as a Letter PDF with its backgrounds. Set CHROME to the browser's
// path if it isn't found.

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = join(root, "public", "Burce_Boran_Resume_2026.pdf");

const findChrome = () => {
  if (process.env.CHROME) return process.env.CHROME;
  const playwright = join(homedir(), ".cache", "ms-playwright");
  if (existsSync(playwright)) {
    for (const dir of readdirSync(playwright).filter((name) => name.startsWith("chromium-")).sort().reverse()) {
      const path = join(playwright, dir, "chrome-linux64", "chrome");
      if (existsSync(path)) return path;
    }
  }
  for (const path of ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"]) {
    if (existsSync(path)) return path;
  }
  throw new Error("No Chrome or Chromium found; set CHROME to its path.");
};

const types = { ".html": "text/html", ".css": "text/css", ".ttf": "font/ttf", ".woff2": "font/woff2", ".png": "image/png" };
const server = createServer((request, response) => {
  const path = normalize(join(root, decodeURIComponent(new URL(request.url, "http://x").pathname)));
  if (!path.startsWith(root) || !existsSync(path)) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { "Content-Type": types[extname(path)] ?? "application/octet-stream" });
  response.end(readFileSync(path));
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));
const { port } = server.address();

const debugPort = 9500 + Math.floor(Math.random() * 400);
const chrome = spawn(
  findChrome(),
  [
    "--headless=new",
    "--no-sandbox",
    `--remote-debugging-port=${debugPort}`,
    "--remote-debugging-address=127.0.0.1",
    `--user-data-dir=${join(tmpdir(), `resume-chrome-${debugPort}`)}`,
    "about:blank"
  ],
  { stdio: "ignore" }
);

try {
  let targets;
  for (let tries = 0; !targets && tries < 50; tries++) {
    await new Promise((done) => setTimeout(done, 200));
    targets = await fetch(`http://127.0.0.1:${debugPort}/json`).then((r) => r.json()).catch(() => null);
  }
  const socket = new WebSocket(targets.find((target) => target.type === "page").webSocketDebuggerUrl);
  await new Promise((done) => socket.addEventListener("open", done));
  let id = 0;
  const waiting = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    waiting.get(message.id)?.(message);
  });
  const send = (method, params = {}) =>
    new Promise((done, fail) => {
      waiting.set(++id, (message) => (message.error ? fail(new Error(message.error.message)) : done(message.result)));
      socket.send(JSON.stringify({ id, method, params }));
    });

  await send("Page.enable");
  await send("Page.navigate", { url: `http://127.0.0.1:${port}/resume/index.html` });
  // Wait for the fonts and the portrait.
  for (let tries = 0; tries < 50; tries++) {
    const { result } = await send("Runtime.evaluate", {
      expression: "document.readyState === 'complete' && document.fonts.status === 'loaded'",
      returnByValue: true
    });
    if (result.value) break;
    await new Promise((done) => setTimeout(done, 100));
  }
  // Each page is one window: say if any page's content doesn't fit it.
  const { result: overflow } = await send("Runtime.evaluate", {
    expression: "[...document.querySelectorAll('.window')].map((w, i) => w.scrollHeight > w.clientHeight + 1 ? `page ${i + 1} overflows by ${w.scrollHeight - w.clientHeight}px` : '').filter(Boolean)",
    returnByValue: true
  });
  for (const warning of overflow.value) console.warn(`warning: ${warning}`);
  const { data } = await send("Page.printToPDF", { printBackground: true, preferCSSPageSize: true, generateTaggedPDF: true });
  writeFileSync(output, Buffer.from(data, "base64"));
  console.log(`wrote ${output}`);
  socket.close();
} finally {
  chrome.kill();
  server.close();
}
