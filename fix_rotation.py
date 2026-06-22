from PIL import Image
import os

img_path = '/Users/allenthomson/Desktop/applications/algoka/knc/Algoka-KandCo/src/assets/team/founderb.webp'
if os.path.exists(img_path):
    img = Image.open(img_path)
    rotated = img.rotate(-90, expand=True) # Rotate right
    rotated.save(img_path)
    print("Image rotated successfully.")
else:
    print("Image not found.")
