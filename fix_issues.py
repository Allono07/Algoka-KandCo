import os
from PIL import Image

# 1. Rotate the image
img_path = '/Users/allenthomson/Desktop/applications/algoka/knc/Algoka-KandCo/src/assets/team/founderb.webp'
if os.path.exists(img_path):
    img = Image.open(img_path)
    # The image is rotated left, so we rotate it right (-90 or 270)
    rotated = img.rotate(-90, expand=True)
    rotated.save(img_path)
    print("Image rotated successfully.")
else:
    print("Image not found.")

# 2. Fix the Hero video height glitch
hero_path = '/Users/allenthomson/Desktop/applications/algoka/knc/Algoka-KandCo/src/components/sections/Hero.jsx'
if os.path.exists(hero_path):
    with open(hero_path, 'r') as f:
        content = f.read()
    
    # Remove the preload and poster attributes that are causing the glitch since ffmpeg failed
    content = content.replace('\n  preload="none"\n  poster="/hero-poster.jpg"', '')
    
    # Just in case, ensure the hero section has 100svh
    content = content.replace("height: '100vh',", "height: '100svh',")
    content = content.replace("minHeight: 'min(680px, 100svh)',", "minHeight: '100svh',")
    
    with open(hero_path, 'w') as f:
        f.write(content)
    print("Hero.jsx updated successfully.")
else:
    print("Hero.jsx not found.")
