import cv2
import numpy as np
from PIL import Image
import io
import sys

try:
    from rembg import remove, new_session
except ImportError:
    import subprocess
    print("Installing rembg...")
    subprocess.run([sys.executable, "-m", "pip", "install", "rembg", "onnxruntime"])
    from rembg import remove, new_session

print("Loading images...")
orig_path = r"C:\Users\PC\Documents\iroooooooonman\nmc\services\freezing_unit.jpg"
with open(orig_path, 'rb') as f:
    orig_bytes = f.read()

print("Removing background from original freezing unit...")
session = new_session('isnet-general-use')
cutout_bytes = remove(orig_bytes, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10, alpha_matting_erode_size=10)
cutout_img = Image.open(io.BytesIO(cutout_bytes)).convert("RGBA")

vibe_path = r"C:\Users\PC\.gemini\antigravity-ide\brain\ca7b5811-4e14-457f-a0b1-f1cb007dc0a9\freezing_unit_v3_1781634976049.png"
vibe_img = Image.open(vibe_path).convert("RGBA")

# Ensure cutout matches vibe size
if cutout_img.size != vibe_img.size:
    cutout_img = cutout_img.resize(vibe_img.size, Image.Resampling.LANCZOS)

# Darken the hallucinated machine in the vibe image so it doesn't peek through
print("Preparing background...")
vibe_np = np.array(vibe_img)
h, w = vibe_np.shape[:2]
Y, X = np.ogrid[:h, :w]
# The machine is usually in the center/bottom
center_y, center_x = int(h * 0.6), int(w * 0.5)
dist_from_center = np.sqrt((X - center_x)**2 + (Y - center_y)**2)

# Create a smooth radial gradient mask for darkening
mask_img = np.zeros((h, w), dtype=np.float32)
mask_img[dist_from_center < 400] = 1.0
mask_img = cv2.GaussianBlur(mask_img, (201, 201), 0)

# Apply darkening to RGB channels
for c in range(3):
    vibe_np[:,:,c] = np.clip(vibe_np[:,:,c] * (1 - mask_img * 0.95), 0, 255).astype(np.uint8)

vibe_darkened = Image.fromarray(vibe_np, 'RGBA')

print("Compositing...")
# Paste the exact original freezing unit
vibe_darkened.alpha_composite(cutout_img)

output_path = r"C:\Users\PC\.gemini\antigravity-ide\brain\ca7b5811-4e14-457f-a0b1-f1cb007dc0a9\freezing_unit_exact_composite.png"
vibe_darkened.convert("RGB").save(output_path)
print(f"Done! Saved to {output_path}")
