from PIL import Image

def get_hex(path):
    img = Image.open(path).convert('RGB')
    return '#%02x%02x%02x' % img.getpixel((5, 5))

print('blue:', get_hex(r'C:\Users\PC\Documents\iroooooooonman\nmc\brand colors to learn from\blue.JPG'))
print('chartreuse:', get_hex(r'C:\Users\PC\Documents\iroooooooonman\nmc\brand colors to learn from\chartreuse.JPG'))
print('dark blue:', get_hex(r'C:\Users\PC\Documents\iroooooooonman\nmc\brand colors to learn from\dark blue.JPG'))
