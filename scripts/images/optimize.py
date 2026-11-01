"""Convert site images to WebP and shrink them to the size they are shown at.

Usage:  python3 scripts/images/optimize.py
Replaces every .jpg/.jpeg/.png under assets/img with a .webp of the same name (originals are deleted;
they stay in git history). Update the imports in lib/images.ts and components if you add new files.

The browser icons in app/ (icon.png, apple-icon.png) must stay PNG; compress those with
    oxipng -o max --strip safe app/icon.png app/apple-icon.png
The field video gets a WebM copy next to the MP4 (the MP4 stays as the fallback):
    ffmpeg -i public/video/food-bags.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 public/video/food-bags.webm
"""

from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2] / "assets" / "img"

# Longest side allowed per file or folder, about 2x the largest size each image is displayed at.
MAX_SIDE = {
    "hero.jpg": 1920,  # full-width hero
    "work.jpg": 1920,  # full-width banner
    "donate.jpg": 1920,  # full-width background
    "about.jpg": 1400,
    "logo.png": 720,  # hero emblem is shown at 360px
    "campaign": 1080,  # posters with text: keep full size, higher quality
    "field": 1110,  # slider is 416px tall, so 832px tall at 2x (landscape is 1110 wide)
}
QUALITY = {"campaign": 88, "logo.png": 90, "hero.jpg": 72, "work.jpg": 70, "donate.jpg": 68}  # everything else uses 80


def setting(path: Path, table: dict, default):
    return table.get(path.name, table.get(path.parent.name, default))


def main():
    total_before = total_after = 0
    for src in sorted(p for p in ROOT.rglob("*") if p.suffix.lower() in {".jpg", ".jpeg", ".png"}):
        im = ImageOps.exif_transpose(Image.open(src))
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
        limit = setting(src, MAX_SIDE, 1600)
        if max(im.size) > limit:
            im.thumbnail((limit, limit), Image.LANCZOS)
        out = src.with_suffix(".webp")
        im.save(out, "WEBP", quality=setting(src, QUALITY, 80), method=6)
        before, after = src.stat().st_size, out.stat().st_size
        total_before += before
        total_after += after
        print(f"{src.relative_to(ROOT)}: {before // 1024} KB -> {after // 1024} KB {im.size}")
        src.unlink()
    print(f"TOTAL {total_before // 1024} KB -> {total_after // 1024} KB")


if __name__ == "__main__":
    main()
