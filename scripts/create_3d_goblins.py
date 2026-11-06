import os
import math
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw, ImageOps

GOBLIN_PALETTES = {
    1: {"primary": (168, 85, 247), "secondary": (6, 182, 212), "name": "Community & Operations"},
    2: {"primary": (163, 230, 53), "secondary": (34, 197, 94), "name": "Technical"},
    3: {"primary": (236, 72, 153), "secondary": (139, 92, 246), "name": "Design & Creative"},
    4: {"primary": (245, 158, 11), "secondary": (234, 88, 12), "name": "Hackathon & Events"},
    5: {"primary": (6, 182, 212), "secondary": (16, 185, 129), "name": "Business & Services"},
    6: {"primary": (234, 179, 8), "secondary": (217, 119, 6), "name": "Finance & Administration"},
    7: {"primary": (99, 102, 241), "secondary": (139, 92, 246), "name": "Innovation & Projects"},
    8: {"primary": (16, 185, 129), "secondary": (132, 204, 22), "name": "Engagement & Mentorship"},
    9: {"primary": (244, 63, 94), "secondary": (251, 146, 60), "name": "Marketing & Outreach"},
}

CANVAS_WIDTH = 560
CANVAS_HEIGHT = 560

def draw_3d_stage(draw, center_x, floor_y, primary, secondary):
    # Draw 3D perspective grid lines
    grid_color = (255, 255, 255, 12)
    vanishing_y = floor_y - 120
    
    # Radiating perspective lines
    for angle in range(-60, 65, 15):
        rad = math.radians(angle)
        x_end = center_x + int(math.tan(rad) * 300)
        draw.line([(center_x, vanishing_y), (x_end, CANVAS_HEIGHT)], fill=grid_color, width=1)
        
    # Concentric ground ellipses (stage rings)
    for r in [180, 140, 100, 60]:
        h = int(r * 0.32) # perspective squish
        bbox = [center_x - r, floor_y - h, center_x + r, floor_y + h]
        draw.ellipse(bbox, outline=(*primary, int(60 * (1 - r/220))), width=2)

def generate_3d_goblin(goblin_num):
    src_path = f"public/art/original_backup/goblin-{goblin_num}.webp"
    if not os.path.exists(src_path):
        src_path = f"public/art/goblin-{goblin_num}.webp"
        
    orig = Image.open(src_path).convert("RGB")
    palette = GOBLIN_PALETTES.get(goblin_num, {"primary": (163, 230, 53), "secondary": (139, 92, 246)})
    prim = palette["primary"]
    sec = palette["secondary"]

    # 1. Base Dark 3D Background with Radial Depth
    canvas = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (9, 9, 15, 255))
    
    # Create radial volumetric glow
    glow_layer = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    center_x = CANVAS_WIDTH // 2
    center_y = int(CANVAS_HEIGHT * 0.45)
    floor_y = int(CANVAS_HEIGHT * 0.78)
    
    # Outer ambient colored orb
    for radius in range(240, 10, -15):
        alpha = int(35 * (1 - (radius / 240) ** 1.5))
        interp_color = (
            int(prim[0] * 0.7 + sec[0] * 0.3),
            int(prim[1] * 0.7 + sec[1] * 0.3),
            int(prim[2] * 0.7 + sec[2] * 0.3),
            alpha
        )
        glow_draw.ellipse(
            [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
            fill=interp_color
        )
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(30))
    canvas = Image.alpha_composite(canvas, glow_layer)

    # 2. Draw 3D Isometric Ground Stage
    stage_layer = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    stage_draw = ImageDraw.Draw(stage_layer)
    draw_3d_stage(stage_draw, center_x, floor_y, prim, sec)
    canvas = Image.alpha_composite(canvas, stage_layer)

    # 3. Process Character Foreground
    # Convert orig to RGBA and perform smooth alpha mask to remove beige paper edges
    orig_np = np.array(orig).astype(float)
    # Distance from typical parchment beige (230, 220, 200)
    bg_color = np.array([235.0, 225.0, 205.0])
    color_diff = np.linalg.norm(orig_np - bg_color, axis=2)
    
    # Create smooth vignette mask from edges inwards
    h, w, _ = orig_np.shape
    y_coords, x_coords = np.ogrid[:h, :w]
    norm_x = (x_coords - w / 2) / (w / 2)
    norm_y = (y_coords - h / 2) / (h / 2)
    dist_from_center = np.sqrt(norm_x**2 + norm_y**2)
    vignette = np.clip(1.4 - dist_from_center * 1.1, 0, 1)

    alpha_channel = (vignette * 255).astype(np.uint8)
    orig_rgba = orig.copy().convert("RGBA")
    orig_rgba.putalpha(Image.fromarray(alpha_channel))

    # Scale character up with high quality Lanczos
    target_char_w = int(CANVAS_WIDTH * 0.72)
    scale_factor = target_char_w / orig.width
    target_char_h = int(orig.height * scale_factor)
    char_scaled = orig_rgba.resize((target_char_w, target_char_h), Image.Resampling.LANCZOS)

    # Enhance contrast and vibrance for 3D pop
    char_rgb = char_scaled.convert("RGB")
    enh_c = ImageEnhance.Contrast(char_rgb).enhance(1.22)
    enh_s = ImageEnhance.Color(enh_c).enhance(1.28)
    enh_b = ImageEnhance.Brightness(enh_s).enhance(1.05)
    char_enhanced = enh_b.convert("RGBA")
    char_enhanced.putalpha(char_scaled.split()[3])

    # 4. Realistic 3D Elliptical Contact Shadow on the Floor
    shadow_layer = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    shadow_rx = int(target_char_w * 0.44)
    shadow_ry = int(shadow_rx * 0.28)
    shadow_box = [center_x - shadow_rx, floor_y - shadow_ry, center_x + shadow_rx, floor_y + shadow_ry]
    shadow_draw.ellipse(shadow_box, fill=(0, 0, 0, 200))
    # Soft secondary shadow
    shadow_draw.ellipse([center_x - int(shadow_rx * 1.3), floor_y - int(shadow_ry * 1.3),
                         center_x + int(shadow_rx * 1.3), floor_y + int(shadow_ry * 1.3)],
                        fill=(0, 0, 0, 80))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(16))
    canvas = Image.alpha_composite(canvas, shadow_layer)

    # 5. Composite Floating 3D Character
    char_pos_x = center_x - target_char_w // 2
    char_pos_y = floor_y - target_char_h + int(target_char_h * 0.12) # seated slightly above floor
    
    # 3D Rim glow layer behind character
    rim_glow = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    rim_glow.paste(char_enhanced, (char_pos_x, char_pos_y), char_enhanced)
    # Tint rim glow
    rim_colored = ImageOps.colorize(rim_glow.convert("L"), black=(0, 0, 0), white=prim).convert("RGBA")
    rim_colored.putalpha(rim_glow.split()[3])
    rim_colored = rim_colored.filter(ImageFilter.GaussianBlur(18))
    canvas = Image.alpha_composite(canvas, rim_colored)

    # Paste actual sharp character
    canvas.paste(char_enhanced, (char_pos_x, char_pos_y), char_enhanced)

    # 6. Futuristic Holographic Particles & 3D Sparkles
    particles_layer = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(particles_layer)
    
    np.random.seed(goblin_num * 42)
    for _ in range(24):
        px = np.random.randint(int(CANVAS_WIDTH * 0.15), int(CANVAS_WIDTH * 0.85))
        py = np.random.randint(int(CANVAS_HEIGHT * 0.18), int(CANVAS_HEIGHT * 0.85))
        size = np.random.randint(2, 5)
        p_alpha = np.random.randint(120, 240)
        p_color = (*prim, p_alpha) if np.random.rand() > 0.5 else (*sec, p_alpha)
        p_draw.ellipse([px, py, px + size, py + size], fill=p_color)

    # Ambient lens flair line across stage
    lens_layer = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    l_draw = ImageDraw.Draw(lens_layer)
    l_draw.line([(center_x - 140, floor_y), (center_x + 140, floor_y)], fill=(*prim, 90), width=2)
    lens_layer = lens_layer.filter(ImageFilter.GaussianBlur(4))
    canvas = Image.alpha_composite(canvas, lens_layer)
    canvas = Image.alpha_composite(canvas, particles_layer)

    # 7. 3D Card Edge Specular Highlight (Subtle top border glow)
    edge_layer = Image.new("RGBA", (CANVAS_WIDTH, CANVAS_HEIGHT), (0, 0, 0, 0))
    e_draw = ImageDraw.Draw(edge_layer)
    e_draw.rectangle([0, 0, CANVAS_WIDTH - 1, CANVAS_HEIGHT - 1], outline=(255, 255, 255, 30), width=1)
    e_draw.line([(0, 0), (CANVAS_WIDTH, 0)], fill=(*prim, 160), width=2)
    canvas = Image.alpha_composite(canvas, edge_layer)

    # 8. Save updated high-res webp
    out_path_3d = f"public/art/goblin-{goblin_num}-3d.webp"
    out_path_std = f"public/art/goblin-{goblin_num}.webp"
    
    canvas.save(out_path_3d, format="WEBP", quality=92, method=6)
    canvas.save(out_path_std, format="WEBP", quality=92, method=6)
    print(f"Generated 3D Goblin #{goblin_num} ({palette['name']}) -> {out_path_std}")

if __name__ == "__main__":
    for i in range(1, 10):
        generate_3d_goblin(i)
    print("All 9 3D Goblins successfully generated!")
