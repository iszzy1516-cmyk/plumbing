// Downloads the Unsplash photos listed in images.json into public/images and writes CREDITS.md.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const images = JSON.parse(readFileSync(join(here, "images.json"), "utf8"));
const out = join(root, "public", "images");
mkdirSync(out, { recursive: true });

for (const img of images) {
  const file = join(out, `${img.name}.jpg`);
  if (existsSync(file)) continue;
  const url = `https://images.unsplash.com/${img.id}?w=2200&q=78&fm=jpg&fit=max`;
  execFileSync("curl.exe", ["-sS", "-L", "--fail", "--retry", "4", "-o", file, url], { stdio: "inherit" });
  console.log("saved", img.name);
}

const rows = images
  .map(
    (i) =>
      `| \`public/images/${i.name}.jpg\` | ${i.shows} | ${i.by} | [Unsplash](https://unsplash.com/photos/${i.slug}) | Unsplash License |`,
  )
  .join("\n");

writeFileSync(
  join(root, "CREDITS.md"),
  `# Credits

## Photographs

All photographs are real, free-licence stock pictures from Unsplash. None is AI-generated, and none is an Unsplash+ (paid) image.
They stand in for the business's own photography. They do not show its team, vans or finished jobs, so replace them with your own pictures when you have them.

| File | Shows | Photographer | Source | Licence |
| --- | --- | --- | --- | --- |
${rows}

The Unsplash License allows free commercial use and does not require credit: https://unsplash.com/license

## Video

| File | Shows | Credit | Source | Licence |
| --- | --- | --- | --- | --- |
| \`public/video/running-tap.webm\`, \`public/images/running-tap-poster.jpg\` | Water running into a kitchen sink, cropped on the page | "A running tap of water" by Justeraren | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:A_running_tap_of_water.webm) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0), credit required and shown in the site footer |

## Typefaces

- Google Sans, SIL Open Font License 1.1, self-hosted through \`next/font\`

## Icons

- Lucide, ISC License
`,
);
