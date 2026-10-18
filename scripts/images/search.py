"""Search Pexels (free license) with Playwright; save candidate thumbnails + metadata for review."""
import json, re, sys, urllib.parse
from pathlib import Path
from playwright.sync_api import sync_playwright

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
QUERIES = sys.argv[1:]
out = Path(__import__("os").environ.get("THUMBS", "thumbs")); out.mkdir(exist_ok=True)
meta_path = Path(__import__("os").environ.get("META", "meta.json"))
meta = json.loads(meta_path.read_text()) if meta_path.exists() else {}

with sync_playwright() as p:
    b = p.chromium.launch(args=["--disable-blink-features=AutomationControlled"])
    for q in QUERIES:
        ctx = b.new_context(user_agent=UA, viewport={"width": 1400, "height": 1000})
        page = ctx.new_page()
        page.goto(f"https://www.pexels.com/search/{urllib.parse.quote(q)}/?orientation=landscape",
                  wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(4000)
        for _ in range(3):
            page.mouse.wheel(0, 1800); page.wait_for_timeout(900)
        items = page.evaluate("""() => [...document.querySelectorAll('article')].map(a => {
            const img = a.querySelector('img[src*="images.pexels.com/photos/"]');
            const link = a.querySelector('a[href*="/photo/"]');
            const by = a.querySelector('a[href*="/@"]');
            if (!img || !link) return null;
            return {src: img.src, alt: img.alt || '', href: link.href, by: by ? by.textContent.trim() : ''};
        }).filter(Boolean)""")
        n = 0
        for it in items:
            m = re.search(r"images\.pexels\.com/photos/(\d+)/", it["src"])
            if not m or m.group(1) in meta: continue
            pid = m.group(1)
            base = f"https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg"
            r = ctx.request.get(base + "?auto=compress&cs=tinysrgb&w=400&h=260&fit=crop")
            if not r.ok: continue
            key = f"{len(meta):03d}"
            (out / f"{key}.jpg").write_bytes(r.body())
            meta[pid] = {"key": key, "q": q, "page": it["href"], "alt": it["alt"], "by": it["by"], "base": base}
            n += 1
            if n >= 12: break
        if n == 0: print("  title:", page.title(), flush=True)
        print(q, "->", n, flush=True)
        ctx.close()
        meta_path.write_text(json.dumps(meta, indent=1))
    b.close()
meta_path.write_text(json.dumps(meta, indent=1))
print("total", len(meta))
