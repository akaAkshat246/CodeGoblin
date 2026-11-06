import os
import math
import shutil
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw, ImageOps

MAPPING = [
    "01_Community_Megaphone.png",
    "02_Technical_Coder.png",
    "03_Creative_Designer.png",
    "04_Hackathon_Events.png",
    "05_Business_Outreach.png",
    "06_Finance_Admin.png",
    "07_Innovation_Ideas.png",
    "08_Learning_Mentorship.png",
    "09_Marketing_Social.png"
]

GOBLIN_PALETTES = {
    1: {"primary": (168, 85, 247), "secondary": (6, 182, 212), "name": "Community & Operations"},
    2: {"primary": (163, 230, 53), "secondary": (34, 197, 94), "name": "Technical Lead"},
    3: {"primary": (236, 72, 153), "secondary": (139, 92, 246), "name": "Design & Creative"},
    4: {"primary": (245, 158, 11), "secondary": (234, 88, 12), "name": "Hackathon & Events"},
    5: {"primary": (6, 182, 212), "secondary": (16, 185, 129), "name": "Business & Services"},
    6: {"primary": (234, 179, 8), "secondary": (217, 119, 6), "name": "Finance & Administration"},
    7: {"primary": (99, 102, 241), "secondary": (139, 92, 246), "name": "Innovation & Projects"},
    8: {"primary": (16, 185, 129), "secondary": (132, 204, 22), "name": "Engagement & Mentorship"},
    9: {"primary": (244, 63, 94), "secondary": (251, 146, 60), "name": "Marketing & Outreach"},
}

CANVAS_SIZE = 720

def draw_3d_stage(draw, center_x, floor_y, primary, secondary):
    vanishing_y = floor_y - 160
    grid_color = (255, 255, 255, 14)

    # Radiating perspective lines
    for angle in range(-70, 75, 12):
        rad = math.radians(angle)
        x_end = center_x + int(math.tan(rad) * 360)
        draw.line([(center_x, vanishing_y), (x_end, CANVAS_SIZE)], fill=grid_color, width=1)

    # Concentric ground ellipses (perspective squished rings)
    for r in [260, 200, 150, 90, 45]:
        h = int(r * 0.30)
        bbox = [center_x - r, floor_y - h, center_x + r, floor_y + h]
        alpha = int(90 * (1 - r / 300))
        draw.ellipse(bbox, outline=(*primary, alpha), width=2)

def process_goblin(goblin_num, filename):
    palette = GOBLIN_PALETTES[goblin_num]
    prim = palette["primary"]
    sec = palette["secondary"]

    # 1. Load uploaded 1024x1024 transparent PNG
    raw_img = Image.open(filename).convert("RGBA")
    
    # Save a copy in public/art/characters/
    os.makedirs("public/art/characters", exist_ok=True)
    raw_dest = f"public/art/characters/goblin-{goblin_num}-raw.png"
    shutil.copy2(filename, raw_dest)

    # Trim excess transparent padding around character
    bbox = raw_img.getbbox()
    char_crop = raw_img.crop(bbox)

    # ============================================================
    # 2. CREATE 3D CUTOUT (Transparent PNG with enhanced 3D lighting)
    # ============================================================
    # Enhance contrast, vibrancy, and micro-details
    rgb = char_crop.convert("RGB")
    alpha = char_crop.split()[3]
    rgb = ImageEnhance.Contrast(rgb).enhance(1.15)
    rgb = ImageEnhance.Color(rgb).enhance(1.20)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.25)
    char_enhanced = rgb.convert("RGBA")
    char_enhanced.putalpha(alpha)

    # 3D Rim Lighting on cutout
    rim_mask = alpha.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(2))
    rim_colored = Image.new("RGBA", char_enhanced.size, (*prim, 0))
    rim_colored.putalpha(rim_mask)

    cutout = Image.alpha_composite(char_enhanced, rim_colored)
    cutout.save(f"public/art/goblin-{goblin_num}-cutout.webp", format="WEBP", quality=95)

    # ============================================================
    # 3. CREATE FULL 3D STAGE CARD (720x720)
    # ============================================================
    stage_canvas = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (10, 10, 18, 255))
    center_x = CANVAS_SIZE // 2
    center_y = int(CANVAS_SIZE * 0.44)
    floor_y = int(CANVAS_SIZE * 0.76)

    # A. Volumetric Ambient Glow
    glow_layer = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    for radius in range(320, 15, -20):
        intensity = 1.0 - (radius / 320.0) ** 1.6
        alpha_val = int(45 * intensity)
        glow_col = (
            int(prim[0] * 0.65 + sec[0] * 0.35),
            int(prim[1] * 0.65 + sec[1] * 0.35),
            int(prim[2] * 0.65 + sec[2] * 0.35),
            alpha_val,
        )
        glow_draw.ellipse(
            [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
            fill=glow_col,
        )
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(38))
    stage_canvas = Image.alpha_composite(stage_canvas, glow_layer)

    # B. 3D Ground Perspective Lines & Rings
    grid_layer = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_layer)
    draw_3d_stage(grid_draw, center_x, floor_y, prim, sec)
    stage_canvas = Image.alpha_composite(stage_canvas, grid_layer)

    # C. Dynamic 3D Contact Shadow on Floor
    shadow_layer = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    shadow_rx = int(CANVAS_SIZE * 0.32)
    shadow_ry = int(shadow_rx * 0.28)
    shadow_draw.ellipse(
        [center_x - shadow_rx, floor_y - shadow_ry, center_x + shadow_rx, floor_y + shadow_ry],
        fill=(0, 0, 0, 220),
    )
    # Softer outer shadow
    shadow_draw.ellipse(
        [center_x - int(shadow_rx * 1.35), floor_y - int(shadow_ry * 1.35),
         center_x + int(shadow_rx * 1.35), floor_y + int(shadow_ry * 1.35)],
        fill=(0, 0, 0, 90),
    )
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(22))
    stage_canvas = Image.alpha_composite(stage_canvas, shadow_layer)

    # D. Scale & Position the 3D Character
    target_h = int(CANVAS_SIZE * 0.68)
    scale = target_h / char_crop.height
    target_w = int(char_crop.width * scale)
    char_placed = char_enhanced.resize((target_w, target_h), Image.Resampling.LANCZOS)

    char_x = center_x - target_w // 2
    char_y = floor_y - target_h + int(target_h * 0.08)

    # Atmospheric Rim Light behind the character
    back_halo = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    back_halo.paste(char_placed, (char_x, char_y), char_placed)
    halo_colored = ImageOps.colorize(back_halo.convert("L"), black=(0, 0, 0), white=prim).convert("RGBA")
    halo_colored.putalpha(back_halo.split()[3])
    halo_colored = halo_colored.filter(ImageFilter.GaussianBlur(24))
    stage_canvas = Image.alpha_composite(stage_canvas, halo_colored)

    # Paste actual sharp character
    stage_canvas.paste(char_placed, (char_x, char_y), char_placed)

    # E. Holographic Particles & Sparks
    spark_layer = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(spark_layer)
    np.random.seed(goblin_num * 1337)
    for _ in range(30):
        px = np.random.randint(int(CANVAS_SIZE * 0.12), int(CANVAS_SIZE * 0.88))
        py = np.random.randint(int(CANVAS_SIZE * 0.15), int(CANVAS_SIZE * 0.85))
        s = np.random.randint(2, 6)
        alpha_p = np.random.randint(140, 255)
        color = (*prim, alpha_p) if np.random.rand() > 0.4 else (*sec, alpha_p)
        s_draw.ellipse([px, py, px + s, py + s], fill=color)

    # Laser rim highlight on stage
    s_draw.line([(center_x - 180, floor_y), (center_x + 180, floor_y)], fill=(*prim, 110), width=2)
    spark_layer = Image.alpha_composite(spark_layer, spark_layer.filter(ImageFilter.GaussianBlur(3)))
    stage_canvas = Image.alpha_composite(stage_canvas, spark_layer)

    # F. High-Gloss Metallic 3D Border Bevel
    border_layer = Image.new("RGBA", (CANVAS_SIZE, CANVAS_SIZE), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(border_layer)
    b_draw.rectangle([0, 0, CANVAS_SIZE - 1, CANVAS_SIZE - 1], outline=(255, 255, 255, 30), width=1)
    b_draw.line([(0, 0), (CANVAS_SIZE, 0)], fill=(*prim, 220), width=3)
    b_draw.line([(0, 0), (0, CANVAS_SIZE)], fill=(*prim, 120), width=2)
    stage_canvas = Image.alpha_composite(stage_canvas, border_layer)

    # G. Save high quality assets
    out_3d = f"public/art/goblin-{goblin_num}-3d.webp"
    out_std = f"public/art/goblin-{goblin_num}.webp"
    stage_canvas.save(out_3d, format="WEBP", quality=94)
    stage_canvas.save(out_std, format="WEBP", quality=94)

    # H. Update avatar & role card assets in public/assets/goblins/
    os.makedirs("public/assets/goblins", exist_ok=True)
    avatar = stage_canvas.resize((240, 240), Image.Resampling.LANCZOS).convert("RGB")
    avatar.save(f"public/assets/goblins/goblin_{goblin_num}_avatar.jpg", format="JPEG", quality=92)

    card = stage_canvas.resize((480, 260), Image.Resampling.LANCZOS).convert("RGB")
    card.save(f"public/assets/goblins/role_{goblin_num}_card.jpg", format="JPEG", quality=92)

    print(f"✓ Processed Goblin #{goblin_num}: {palette['name']} from {filename}")

if __name__ == "__main__":
    for i, fname in enumerate(MAPPING, start=1):
        if os.path.exists(fname):
            process_goblin(i, fname)
        else:
            print(f"Warning: {fname} not found!")
    print("All 9 uploaded goblins transformed with 3D sense and saved!")
