"""
Download Google Fonts (Montserrat + Cormorant) locally.
Fetches woff2 URLs from Google Fonts API, downloads each file.
"""
import urllib.request
import re
import os

FONTS_DIR = "/Users/allenthomson/Desktop/applications/algoka/knc/Algoka-KandCo/public/fonts"
os.makedirs(FONTS_DIR, exist_ok=True)

# Google Fonts URLs to download (woff2 format, modern browsers)
FONT_REQUESTS = [
    ("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap", "montserrat"),
    ("https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,600;1,300&display=swap", "cormorant"),
]

# Use a modern browser UA to get woff2 format
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"}

all_face_rules = []

for css_url, family_name in FONT_REQUESTS:
    print(f"\n📥 Fetching {family_name} CSS...")
    req = urllib.request.Request(css_url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        css_text = resp.read().decode("utf-8")

    # Find all font-face blocks
    blocks = re.findall(r'/\*[^*]*\*/\s*@font-face\s*\{[^}]+\}|@font-face\s*\{[^}]+\}', css_text)
    
    for block in blocks:
        # Extract src URL
        url_match = re.search(r'url\((https://fonts\.gstatic\.com/[^)]+\.woff2)\)', block)
        if not url_match:
            continue
        font_url = url_match.group(1)
        
        # Build a local filename from font metadata
        style_match = re.search(r'font-style:\s*(\w+)', block)
        weight_match = re.search(r'font-weight:\s*(\w+)', block)
        unicode_match = re.search(r'unicode-range:\s*([^;]+);', block)
        
        style = style_match.group(1) if style_match else "normal"
        weight = weight_match.group(1) if weight_match else "400"
        
        # Use hash of URL for unique filenames per subset
        url_hash = abs(hash(font_url)) % 10000
        local_fname = f"{family_name}-{style}-{weight}-{url_hash}.woff2"
        local_path = os.path.join(FONTS_DIR, local_fname)
        
        if not os.path.exists(local_path):
            print(f"  ↓ {local_fname}")
            req2 = urllib.request.Request(font_url, headers=HEADERS)
            with urllib.request.urlopen(req2) as r:
                with open(local_path, "wb") as f:
                    f.write(r.read())
        
        # Build local @font-face rule
        local_url = f"/fonts/{local_fname}"
        new_block = block
        new_block = re.sub(r'url\(https://fonts\.gstatic\.com/[^)]+\.woff2\) format\([^)]+\)', 
                           f"url('{local_url}') format('woff2')", new_block)
        # Add font-display: swap if missing
        if 'font-display' not in new_block:
            new_block = new_block.replace('font-style:', 'font-display: swap;\n  font-style:')
        all_face_rules.append(new_block.strip())

# Write a single local-fonts.css
css_output = "\n\n".join(all_face_rules)
out_path = "/Users/allenthomson/Desktop/applications/algoka/knc/Algoka-KandCo/public/fonts/google-fonts-local.css"
with open(out_path, "w") as f:
    f.write(css_output)

print(f"\n✅ Downloaded {len(all_face_rules)} font faces.")
print(f"✅ CSS written to {out_path}")
print(f"✅ Font files in {FONTS_DIR}")
