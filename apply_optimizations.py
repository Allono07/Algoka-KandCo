import os
import re

PROJECT_DIR = "/Users/allenthomson/Desktop/applications/algoka/knc/Algoka-KandCo"

def read_file(path):
    with open(os.path.join(PROJECT_DIR, path), 'r') as f:
        return f.read()

def write_file(path, content):
    with open(os.path.join(PROJECT_DIR, path), 'w') as f:
        f.write(content)

# Fix 2: Hero.jsx
hero_path = 'src/components/sections/Hero.jsx'
hero = read_file(hero_path)
if 'preload="none"' not in hero:
    hero = re.sub(
        r'(<video[^>]*)', 
        r'\1\n  preload="none"\n  poster="/hero-poster.jpg"', 
        hero, 
        count=1
    )
    write_file(hero_path, hero)

# Fix 4: Lazy images
img_files = [
    'src/components/sections/Portfolio.jsx',
    'src/components/sections/About.jsx',
    'src/components/sections/Blog.jsx',
    'src/components/sections/Team.jsx',
    'src/components/sections/ClientLogos.jsx',
    'src/components/sections/Services.jsx'
]
for f in img_files:
    if os.path.exists(os.path.join(PROJECT_DIR, f)):
        content = read_file(f)
        new_content = re.sub(
            r'(<(?:motion\.)?img\b)(?![^>]*loading="lazy")',
            r'\1 loading="lazy" decoding="async"',
            content
        )
        if new_content != content:
            write_file(f, new_content)

# Fix 6: vite.config.js
vite_path = 'vite.config.js'
vite = read_file(vite_path)
if "manualChunks" not in vite:
    new_vite = vite.replace(
        "build: {",
        "build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          'vendor-react': ['react', 'react-dom'],\n          'vendor-motion': ['framer-motion'],\n          'vendor-lenis': ['lenis'],\n          'vendor-swiper': ['swiper']\n        }\n      }\n    },\n    chunkSizeWarningLimit: 600,"
    )
    write_file(vite_path, new_vite)

# Fix 8, 9: index.html
html_path = 'index.html'
html = read_file(html_path)

if "display=swap\" rel=\"stylesheet\" />" in html:
    html = re.sub(
        r'<link href="https://fonts.googleapis.com/css2\?family=[^>]+rel="stylesheet" />',
        '',
        html
    )
    html = html.replace('<link rel="preconnect" href="https://fonts.googleapis.com" />\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n\n\n', '')
    
    font_block = """
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Cormorant:ital,wght@0,300;0,600;1,300&display=swap" onload="this.onload=null;this.rel='stylesheet'">
    <noscript>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Cormorant:ital,wght@0,300;0,600;1,300&display=swap" rel="stylesheet">
    </noscript>
"""
    if "preload" not in html:
        html = html.replace('</head>', font_block + '</head>')

webgl_loop = """(function loop() {
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(loop);
    })();"""

throttled_loop = """let lastFrame = 0;
    const FPS_INTERVAL = 1000 / 30; // 30fps

    function loop(now) {
      requestAnimationFrame(loop);
      if (document.hidden) return; // pause when tab not visible
      if (now - lastFrame < FPS_INTERVAL) return;
      lastFrame = now;
      const t = (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    requestAnimationFrame(loop);"""

if webgl_loop in html:
    html = html.replace(webgl_loop, throttled_loop)

# Add font preload
if "artegra-sans-extra-bold.woff2" not in html:
    html = html.replace('<head>', '<head>\n    <link rel="preload" href="/fonts/artegra-sans-extra-bold.woff2" as="font" type="font/woff2" crossorigin>')

write_file(html_path, html)

# Fix 11: index.css
css_path = 'src/index.css'
css = read_file(css_path)
if "@media (prefers-reduced-motion: reduce)" not in css:
    css += """

@media (prefers-reduced-motion: reduce) {
  /* Pause WebGL canvas */
  #fluid-bg { display: none; }

  /* Kill CSS animations */
  .marquee-left,
  .marquee-right,
  .marquee-track {
    animation: none !important;
  }
}
"""

if "artegra-sans-extra-bold.ttf" in css:
    css = css.replace("src: url('/fonts/artegra-sans-extra-bold.ttf') format('truetype');", "src: url('/fonts/artegra-sans-extra-bold.woff2') format('woff2'),\n       url('/fonts/artegra-sans-extra-bold.ttf') format('truetype');")

write_file(css_path, css)

# Fix 10: LazyMotion
heavy_sections = [
    'src/components/sections/Services.jsx',
    'src/components/sections/Portfolio.jsx',
    'src/components/sections/About.jsx',
    'src/components/sections/Process.jsx',
    'src/components/sections/Team.jsx',
    'src/components/sections/Blog.jsx',
    'src/components/sections/WhyChoose.jsx'
]
for sect in heavy_sections:
    if os.path.exists(os.path.join(PROJECT_DIR, sect)):
        content = read_file(sect)
        if "import { motion" in content and "LazyMotion" not in content:
            content = content.replace("import { motion", "import { LazyMotion, domAnimation, m")
            content = content.replace("import { motion,", "import { LazyMotion, domAnimation, m,")
            content = content.replace("<motion.", "<m.")
            content = content.replace("</motion.", "</m.")
            
            if "<section" in content and "</section>" in content:
                content = content.replace('<section', '<LazyMotion features={domAnimation} strict>\n    <section', 1)
                content = content[::-1].replace('</section>'[::-1], '</section>\n    </LazyMotion>'[::-1], 1)[::-1]
            elif "<div" in content and "</div>" in content:
                content = content.replace('<div', '<LazyMotion features={domAnimation} strict>\n    <div', 1)
                content = content[::-1].replace('</div>'[::-1], '</div>\n    </LazyMotion>'[::-1], 1)[::-1]
                
            write_file(sect, content)

print("Optimizations applied successfully!")
