# Frames a phone screenshot of a tool's site for public/images/tools/.
#
#   python3 scripts/frame-phone.py <top.png> public/images/tools <tool> [<full.png>]
#
# <top.png>: the site on a phone, 800 x 1636 px (a 400 x 818 viewport at 2x).
# <full.png>: optional, the same page at the same width, full length (used for
# the taller phone of the tool page). Needs Python 3 and Pillow.
# Writes <tool>-phone-{300,450,600}.webp (transparent, the dark bezel with round
# top corners, cut straight at the bottom) and <tool>.webp (990 x 1830, the
# phone on the deep-blue panel of the tool page).
import sys
from PIL import Image, ImageDraw, ImageFilter
src, outdir, name = sys.argv[1], sys.argv[2], sys.argv[3]
tall_src = sys.argv[4] if len(sys.argv) > 4 else None
S = 2                       # supersampling
W, H = 864, 1668            # master size
BEZEL, R_OUT, R_IN = 32, 137, 108
shot = Image.open(src).convert('RGB')
if shot.size != (800, 1636):
    shot = shot.resize((800, int(shot.size[1] * 800 / shot.size[0])), Image.LANCZOS).crop((0, 0, 800, 1636))
def build(shot, H):
    sw, sh_ = 800, H - BEZEL
    big = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(big)
    # bezel: a rounded rectangle taller than the canvas, so the bottom is cut straight
    d.rounded_rectangle((0, 0, W * S - 1, (H + R_OUT) * S), radius=R_OUT * S, fill=(11, 18, 32, 255))
    # thin dark line inside the bezel
    d.rounded_rectangle(((BEZEL - 2) * S, (BEZEL - 2) * S, (W - BEZEL + 2) * S - 1, (H + R_IN + 4) * S), radius=(R_IN + 2) * S, fill=(4, 5, 12, 255))
    # screen
    mask = Image.new('L', (W * S, H * S), 0)
    ImageDraw.Draw(mask).rounded_rectangle((BEZEL * S, BEZEL * S, (W - BEZEL) * S - 1, (H + R_IN) * S), radius=R_IN * S, fill=255)
    screen = Image.new('RGBA', (W * S, H * S), (0, 0, 0, 0))
    screen.paste(shot.crop((0, 0, 800, sh_)).resize((800 * S, sh_ * S), Image.LANCZOS), (BEZEL * S, BEZEL * S))
    big = Image.composite(screen, big, mask)
    return big.resize((W, H), Image.LANCZOS)
phone = build(shot, H)
for w in (300, 450, 600):
    phone.resize((w, round(H * w / W)), Image.LANCZOS).save(f'{outdir}/{name}-phone-{w}.webp', quality=88, method=6)
# tool-page panel: 990 x 1830, deep-blue gradient, the phone at (63, 62) with a soft shadow
panel = Image.new('RGB', (990, 1830), (25, 58, 95))
grad = Image.new('L', (1, 1830))
for y in range(1830): grad.putpixel((0, y), int(255 * y / 1829))
dark = Image.new('RGB', (990, 1830), (22, 53, 88))
panel = Image.composite(dark, panel, grad.resize((990, 1830)))
shadow = Image.new('RGBA', (990, 1830), (0, 0, 0, 0))
tall = build(Image.open(tall_src).convert('RGB'), 1768) if tall_src else phone
alpha = tall.split()[3].point(lambda a: int(a * .55))
sh = Image.new('RGBA', tall.size, (4, 12, 26, 0)); sh.putalpha(alpha)
shadow.paste(sh, (63, 62 + 28), sh)
shadow = shadow.filter(ImageFilter.GaussianBlur(28))
panel = Image.alpha_composite(panel.convert('RGBA'), shadow)
panel.alpha_composite(tall, (63, 62))
panel.convert('RGB').save(f'{outdir}/{name}.webp', quality=86, method=6)
print('ok', name)
