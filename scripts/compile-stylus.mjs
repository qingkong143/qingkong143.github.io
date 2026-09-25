import fs from "node:fs";
import path from "node:path";
import stylus from "stylus";
import { loadTheme, root } from "../src/lib/load-site.mjs";

const theme = loadTheme();
theme.css_prefix = false;
if (theme.local_search) theme.local_search.enable = true;

function getByPath(obj, p) {
  return String(p)
    .split(".")
    .reduce((o, k) => (o == null ? o : o[k]), obj);
}

function toNode(val) {
  if (val == null) return stylus.nodes.null;
  if (val instanceof stylus.nodes.Node) return val;
  if (typeof val === "boolean") return new stylus.nodes.Boolean(val);
  if (typeof val === "number") return new stylus.nodes.Unit(val);
  if (typeof val === "string") return new stylus.nodes.String(val);
  if (Array.isArray(val)) {
    const expr = new stylus.nodes.Expression(true);
    val.forEach((item) => expr.push(toNode(item)));
    return expr;
  }
  if (typeof val === "object") {
    const obj = new stylus.nodes.Object();
    for (const [k, v] of Object.entries(val)) {
      obj.set(k, toNode(v));
    }
    return obj;
  }
  return new stylus.nodes.Boolean(Boolean(val));
}

const cssDir = path.join(root, "src/styles/anzhiyu");
const indexFile = path.join(cssDir, "index.styl");
const out = path.join(root, "public/css/index.css");

if (!fs.existsSync(indexFile)) {
  console.error(`missing ${indexFile}`);
  process.exit(1);
}

const source = fs.readFileSync(indexFile, "utf8");

const style = stylus(source)
  .set("filename", indexFile)
  .set("paths", [cssDir])
  .set("include css", true)
  .define("hexo-config", function (key) {
    const name = key.string ?? key.val ?? String(key);
    return toNode(getByPath(theme, name));
  })
  .define("$highlight_enable", true)
  .define("$highlight_line_number", false)
  .define("$prismjs_enable", false)
  .define("$prismjs_line_number", false);

try {
  const css = style.render();
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, css);
  console.log(`compiled css (${(css.length / 1024).toFixed(1)} KB) -> public/css/index.css`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
