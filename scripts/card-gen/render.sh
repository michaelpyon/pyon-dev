#!/bin/bash
# Renders card preview images using Chrome headless
# Each HTML file becomes a 1200x630 PNG

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="/Users/michaelpyon/Documents/pyon-dev/public/cards"

# Back up originals
mkdir -p "$OUT/originals"
for f in "$OUT"/*.png; do
  [ -f "$f" ] && cp "$f" "$OUT/originals/"
done

for html in "$DIR"/cards/*.html; do
  name=$(basename "$html" .html)
  echo "Rendering $name..."
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --no-sandbox \
    --screenshot="$OUT/$name.png" \
    --window-size=1200,630 \
    --hide-scrollbars \
    "file://$html" 2>/dev/null
  echo "  -> $OUT/$name.png"
done

echo "Done. Originals backed up to $OUT/originals/"
