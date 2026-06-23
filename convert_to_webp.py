import os
import subprocess

PROJECT_DIR = "/Users/allenthomson/Desktop/applications/algoka/knc/Algoka-KandCo"

EXTENSIONS = {'.jpg', '.jpeg', '.png', '.JPG', '.PNG', '.JPEG'}
TEXT_EXTENSIONS = {'.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.md'}
EXCLUDE_DIRS = {'node_modules', '.git', '.next', '.github'}
EXCLUDE_FILES = {'package-lock.json', 'package.json'}

print("Converting source images...")
for root, dirs, files in os.walk(PROJECT_DIR):
    dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
    for file in files:
        if file in EXCLUDE_FILES: continue
        ext = os.path.splitext(file)[1]
        if ext in EXTENSIONS:
            filepath = os.path.join(root, file)
            webp_path = os.path.splitext(filepath)[0] + '.webp'
            print(f"Converting {filepath}")
            subprocess.run(["cwebp", "-q", "80", filepath, "-o", webp_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            os.remove(filepath)

print("Updating references in code...")
for root, dirs, files in os.walk(PROJECT_DIR):
    dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
    for file in files:
        if file in EXCLUDE_FILES: continue
        ext = os.path.splitext(file)[1]
        if ext in TEXT_EXTENSIONS:
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                for e in EXTENSIONS:
                    new_content = new_content.replace(e, '.webp')
                
                if new_content != content:
                    print(f"Updated {filepath}")
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
            except Exception as e:
                pass

print("Done.")
