import cv2
import numpy as np
import sys

img_path = r"C:\Users\PC\.gemini\antigravity-ide\brain\ca7b5811-4e14-457f-a0b1-f1cb007dc0a9\freezing_unit_v2_1781634463701.png"
img = cv2.imread(img_path)

if img is None:
    print("Could not read image.")
    sys.exit(1)

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Define range for the chartreuse/yellow-green line
lower_bound = np.array([20, 80, 80])
upper_bound = np.array([45, 255, 255])
mask_full = cv2.inRange(hsv, lower_bound, upper_bound)

# Restrict the mask strictly to the center where the line is
h, w = mask_full.shape
mask = np.zeros((h, w), dtype=np.uint8)

# The line is approximately between y=350 to y=660, and x=300 to x=550
mask[350:660, 300:550] = mask_full[350:660, 300:550]

# Dilate mask to catch the glowing edges of the line
kernel = np.ones((7,7), np.uint8)
mask_dilated = cv2.dilate(mask, kernel, iterations=1)

# Apply inpainting
result = cv2.inpaint(img, mask_dilated, 5, cv2.INPAINT_TELEA)

output_path = r"C:\Users\PC\.gemini\antigravity-ide\brain\ca7b5811-4e14-457f-a0b1-f1cb007dc0a9\freezing_unit_fixed.png"
cv2.imwrite(output_path, result)
print(f"Saved fixed image to {output_path}")

# Also save the mask for debugging just in case
cv2.imwrite(r"C:\Users\PC\.gemini\antigravity-ide\brain\ca7b5811-4e14-457f-a0b1-f1cb007dc0a9\mask_debug.png", mask_dilated)
print("Saved mask.")
