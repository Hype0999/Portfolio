import os
from PIL import Image, ImageDraw

def round_corners(im, rad):
    circle = Image.new('L', (rad * 2, rad * 2), 0)
    draw = ImageDraw.Draw(circle)
    draw.ellipse((0, 0, rad * 2 - 1, rad * 2 - 1), fill=255)
    alpha = Image.new('L', im.size, 255)
    w, h = im.size
    alpha.paste(circle.crop((0, 0, rad, rad)), (0, 0))
    alpha.paste(circle.crop((0, rad, rad, rad * 2)), (0, h - rad))
    alpha.paste(circle.crop((rad, 0, rad * 2, rad)), (w - rad, 0))
    alpha.paste(circle.crop((rad, rad, rad * 2, rad * 2)), (w - rad, h - rad))
    im.putalpha(alpha)
    return im

def main():
    img_path = r"c:\Users\Asus\.gemini\antigravity-ide\scratch\portfolio\public\assets\logo.png"
    if not os.path.exists(img_path):
        print("Logo not found")
        return
    
    img = Image.open(img_path).convert("RGBA")
    
    # The user said: "you have croped from bottom i want it equaly from both top and bottom equaly and make it rounded corner"
    # To crop equally from top and bottom, we make it square by cropping the longer side based on the center.
    w, h = img.size
    
    # We want a perfect square
    size = min(w, h)
    
    # Calculate box to crop from center
    left = (w - size) // 2
    top = (h - size) // 2
    right = (w + size) // 2
    bottom = (h + size) // 2
    
    img_cropped = img.crop((left, top, right, bottom))
    
    # Apply rounded corners - professional squircle look (about 20% of the size)
    radius = int(size * 0.22)
    img_rounded = round_corners(img_cropped, radius)
    
    # Save as png in public root
    out_path = r"c:\Users\Asus\.gemini\antigravity-ide\scratch\portfolio\public\favicon-rounded.png"
    img_rounded.save(out_path, "PNG")
    print(f"Saved to {out_path}")

if __name__ == '__main__':
    main()
