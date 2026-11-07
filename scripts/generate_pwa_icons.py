import os
from PIL import Image, ImageOps

def generate_icons():
    logo_path = 'public/art/logo.webp'
    if not os.path.exists(logo_path):
        print(f"Error: {logo_path} not found")
        return

    # Load high-res logo
    img = Image.open(logo_path).convert('RGBA')

    # 1. 192x192 Standard Icon
    icon_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    icon_192.save('public/pwa-192x192.png', 'PNG', optimize=True)
    print("Created public/pwa-192x192.png")

    # 2. 512x512 Standard Icon
    icon_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save('public/pwa-512x512.png', 'PNG', optimize=True)
    print("Created public/pwa-512x512.png")

    # 3. 180x180 Apple Touch Icon with solid background
    apple_icon = Image.new('RGBA', (180, 180), (9, 9, 15, 255))
    resized_apple = img.resize((160, 160), Image.Resampling.LANCZOS)
    apple_icon.paste(resized_apple, (10, 10), resized_apple)
    apple_icon.convert('RGB').save('public/apple-touch-icon.png', 'PNG', optimize=True)
    print("Created public/apple-touch-icon.png")

    # 4. Maskable 512x512 (Android requires 10-15% safe area on all sides)
    maskable = Image.new('RGBA', (512, 512), (9, 9, 15, 255))
    safe_size = 400
    resized_maskable = img.resize((safe_size, safe_size), Image.Resampling.LANCZOS)
    offset = (512 - safe_size) // 2
    maskable.paste(resized_maskable, (offset, offset), resized_maskable)
    maskable.save('public/pwa-maskable-512x512.png', 'PNG', optimize=True)
    print("Created public/pwa-maskable-512x512.png")

    # 5. Favicon 32x32 and 16x16
    img.resize((32, 32), Image.Resampling.LANCZOS).save('public/favicon-32x32.png', 'PNG')
    img.resize((16, 16), Image.Resampling.LANCZOS).save('public/favicon-16x16.png', 'PNG')
    print("Created favicons")

if __name__ == '__main__':
    generate_icons()
