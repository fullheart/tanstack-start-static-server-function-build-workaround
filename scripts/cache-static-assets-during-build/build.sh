#!/usr/bin/env sh

# Workarund to generate static data during build time
# Only this solution provide a static page, like Astro.
# Other solutions have this problem:
# - Brower try to load `__tsr` file, but it doesn't exist
# - Static Server Function fetch data on each page load

# Absolut script dir
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Switch to project directory
cd "$SCRIPT_DIR/../.."

# First run `npm build` with `ssr: "data-only"` in `src/start.ts`
mv "$SCRIPT_DIR/start.build1.ts" src/start.ts
npm run build

# Then copy `dist/` folder to project directory
mv .output/dist .

# Run again `npm build` with `ssr: false` in `src/start.ts`
mv "$SCRIPT_DIR/start.build2.ts" src/start.ts
npm run build