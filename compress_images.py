"""
Re-compress all portfolio + team + about images.
Target: max 1200px wide, quality 70 for portfolio, 80 for others.
"""
import os
import subprocess

PROJECT = "/Users/allenthomson/Desktop/applications/algoka/knc/Algoka-KandCo/src/assets"

RULES = [
    # (folder, max_width, quality)
    ("portfolio", 1200, 70),
    ("team",      1400, 80),
    ("about",     1400, 80),
    ("services",  1000, 80),
    ("studio",    1000, 80),
    ("contact",   1000, 80),
    ("client_logos", 400, 85),
]

def compress(path, max_w, quality):
    from PIL import Image
    img = Image.open(path)
    w, h = img.size
    if w > max_w:
        ratio = max_w / w
        new_h = int(h * ratio)
        img = img.resize((max_w, new_h), Image.LANCZOS)
    before = os.path.getsize(path)
    img.save(path, "WEBP", quality=quality, method=6)
    after = os.path.getsize(path)
    print(f"  {os.path.basename(path)}: {before//1024}KB → {after//1024}KB")

for folder, max_w, quality in RULES:
    folder_path = os.path.join(PROJECT, folder)
    if not os.path.exists(folder_path):
        continue
    print(f"\n📁 {folder}/")
    for root, dirs, files in os.walk(folder_path):
        for fname in files:
            if fname.lower().endswith(".webp"):
                compress(os.path.join(root, fname), max_w, quality)

print("\n✅ Done!")
