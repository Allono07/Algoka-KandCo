#!/bin/bash
set -e
FONTS_DIR="public/fonts"
mkdir -p "$FONTS_DIR"

echo "📥 Fetching Montserrat CSS..."
MONT_CSS=$(curl -sL -A "Mozilla/5.0 Chrome/120" "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap")

echo "📥 Fetching Cormorant CSS..."
CORM_CSS=$(curl -sL -A "Mozilla/5.0 Chrome/120" "https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,600;1,300&display=swap")

ALL_CSS="$MONT_CSS
$CORM_CSS"

# Extract all woff2 URLs and download them
echo "$ALL_CSS" | grep -oE 'https://fonts\.gstatic\.com/[^)]+\.woff2' | while read url; do
  # Make a safe filename from URL
  fname=$(echo "$url" | md5 | cut -c1-8).woff2
  if [ ! -f "$FONTS_DIR/$fname" ]; then
    echo "  ↓ $fname"
    curl -sL "$url" -o "$FONTS_DIR/$fname"
  fi
done

# Build local CSS by replacing gstatic URLs with local paths
echo "$ALL_CSS" | sed -E "s|url\(https://fonts\.gstatic\.com/([^/]+/){1,10}([^)]+\.woff2)\)|url('/fonts/\2')|g" > "$FONTS_DIR/google-fonts-local.css"

# Since the filenames in the CSS don't match our md5-named files, redo it properly
python3 - << 'PYEOF'
import re, hashlib, os

FONTS_DIR = "public/fonts"
css_file = os.path.join(FONTS_DIR, "google-fonts-local.css")
with open(css_file) as f:
    css = f.read()

# Fix: re-map each gstatic url that appears in the original CSS to local md5-named file
import subprocess
mont_css = subprocess.check_output(['curl', '-sL', '-A', 'Mozilla/5.0 Chrome/120',
  'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap']).decode()
corm_css = subprocess.check_output(['curl', '-sL', '-A', 'Mozilla/5.0 Chrome/120',
  'https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,600;1,300&display=swap']).decode()
all_css = mont_css + "\n" + corm_css

urls = re.findall(r'(https://fonts\.gstatic\.com/[^)]+\.woff2)', all_css)
url_map = {}
for url in set(urls):
    fname = hashlib.md5(url.encode()).hexdigest()[:8] + ".woff2"
    url_map[url] = fname

def replace_url(m):
    url = m.group(1)
    fname = url_map.get(url, "")
    return f"url('/fonts/{fname}')"

new_css = re.sub(r'url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)', replace_url, all_css)
with open(css_file, "w") as f:
    f.write(new_css)

# Download any missing files
for url, fname in url_map.items():
    path = os.path.join(FONTS_DIR, fname)
    if not os.path.exists(path) or os.path.getsize(path) < 100:
        result = subprocess.run(['curl', '-sL', url, '-o', path])
        print(f"  Downloaded {fname}")

print(f"✅ {len(url_map)} font files ready")
PYEOF

echo "✅ Fonts self-hosted!"
ls -la "$FONTS_DIR"/*.woff2 | wc -l
