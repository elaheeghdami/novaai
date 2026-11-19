#!/usr/bin/env python3
"""Render cohesive glossy 3D-style stills for portfolio capability cards."""

from __future__ import annotations

import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from PIL import Image

ROOT = Path("/workspace/novaai")
ICON_DIR = ROOT / "node_modules/lucide-react/dist/esm/icons"
OUT_DIR = ROOT / "public/projects/capabilities"
TMP_DIR = Path("/tmp/cap-art")
CHROME = "google-chrome"

# id, lucide icon file (without .js), accent hex, variant
ITEMS = [
    ("caries-yolo", "focus", "5eead4", "orbs"),
    ("panoramic-seg", "scan", "67e8f9", "slab"),
    ("shade-matching", "palette", "fde68a", "orbs"),
    ("physio-coach", "dumbbell", "86efac", "cube"),
    ("drowsiness", "moon", "a5b4fc", "ring"),
    ("posture", "armchair", "7dd3fc", "slab"),
    ("pill-count", "tablets", "fda4af", "orbs"),
    ("pneumonia", "stethoscope", "38bdf8", "slab"),
    ("skin-lesion", "scan-search", "f0abfc", "orbs"),
    ("retinopathy", "scan-eye", "22d3ee", "ring"),
    ("rppg", "heart-pulse", "fb7185", "orbs"),
    ("brain-tumor", "brain", "c4b5fd", "cube"),
    ("wound-monitor", "bandage", "fdba74", "slab"),
    ("vision-assist", "glasses", "93c5fd", "ring"),
    ("gait-analysis", "footprints", "6ee7b7", "orbs"),
    ("fall-detect", "person-standing", "fca5a5", "slab"),
    ("food-calories", "apple", "fbbf24", "orbs"),
    ("hand-tremor", "activity", "f9a8d4", "ring"),
    ("sign-language", "languages", "a78bfa", "cube"),
    ("malaria-cells", "microscope", "2dd4bf", "slab"),
    ("med-adherence", "clipboard-check", "86efac", "orbs"),
    ("emotion-face", "smile", "fcd34d", "ring"),
    ("ppe-detect", "shield", "7dd3fc", "cube"),
    ("lane-detect", "waypoints", "38bdf8", "slab"),
    ("traffic-signs", "signpost", "fb923c", "orbs"),
    ("doc-scanner", "scan-line", "e2e8f0", "slab"),
    ("track-count", "users", "93c5fd", "orbs"),
    ("hand-gesture", "pointer", "f0abfc", "ring"),
    ("quality-control", "factory", "fbbf24", "cube"),
    ("anpr-fa", "car", "22d3ee", "slab"),
    ("face-attendance", "scan-face", "a5b4fc", "orbs"),
    ("object-measure", "ruler", "67e8f9", "slab"),
    ("hand-control", "mouse-pointer-click", "c4b5fd", "ring"),
    ("smart-parking", "square-parking", "7dd3fc", "cube"),
    ("plant-disease", "leaf", "4ade80", "orbs"),
    ("waste-sort", "recycle", "34d399", "slab"),
    ("bg-removal", "layers", "818cf8", "ring"),
    ("simple-ar", "view", "f472b6", "cube"),
    ("photogrammetry", "boxes", "38bdf8", "orbs"),
]


def parse_icon(name: str) -> str:
    text = (ICON_DIR / f"{name}.js").read_text()
    elems = re.findall(r'\[\s*"(\w+)"\s*,\s*\{([^}]*)\}', text)
    if not elems:
        raise RuntimeError(f"No paths in icon {name}")
    parts = []
    for tag, raw in elems:
        attrs = {}
        for key, val in re.findall(r'(\w+):\s*"([^"]*)"', raw):
            if key == "key":
                continue
            svg_key = re.sub(r"[A-Z]", lambda m: "-" + m.group().lower(), key)
            attrs[svg_key] = val
        attr_s = " ".join(f'{k}="{v}"' for k, v in attrs.items())
        parts.append(f"<{tag} {attr_s}/>")
    return "\n        ".join(parts)


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def html_for(item_id: str, icon: str, accent: str, variant: str) -> str:
    paths = parse_icon(icon)
    r, g, b = hex_to_rgb(accent)
    # secondary: shift hue-ish by mixing with cyan or violet
    r2, g2, b2 = min(255, r + 40), min(255, max(40, g - 20)), min(255, b + 60)
    extras = {
        "orbs": """
    <div class="ball b1"></div>
    <div class="ball b2"></div>
    <div class="ball b3"></div>
""",
        "cube": """
    <div class="cube">
      <span class="face ft"></span>
      <span class="face rt"></span>
      <span class="face tp"></span>
    </div>
    <div class="ball b2"></div>
""",
        "ring": """
    <div class="ring"></div>
    <div class="ball b1"></div>
    <div class="ball b3"></div>
""",
        "slab": """
    <div class="slab-back"></div>
    <div class="ball b2"></div>
    <div class="ball b3"></div>
""",
    }[variant]
    return f"""<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<style>
  html,body {{ margin:0; width:800px; height:500px; overflow:hidden; background:#070709; }}
  .stage {{
    width:800px; height:500px; position:relative;
    perspective: 1400px;
    background:
      radial-gradient(ellipse 80% 70% at 28% 18%, rgba({r},{g},{b},0.38), transparent 58%),
      radial-gradient(ellipse 70% 60% at 86% 86%, rgba({r2},{g2},{b2},0.22), transparent 55%),
      radial-gradient(ellipse 40% 30% at 60% 40%, rgba(255,255,255,0.05), transparent 70%),
      linear-gradient(165deg, #0b0b0f 0%, #10131a 46%, #08080c 100%);
  }}
  .vignette {{
    position:absolute; inset:0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%);
    pointer-events:none; z-index:8;
  }}
  .grid {{
    position:absolute; inset:0; opacity:0.14; z-index:0;
    background-image:
      linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse at 50% 45%, #000 20%, transparent 75%);
  }}
  .floor {{
    position:absolute; left:10%; right:10%; bottom:42px; height:70px;
    background: radial-gradient(ellipse at center, rgba({r},{g},{b},0.22), transparent 70%);
    filter: blur(16px); z-index:1;
  }}
  .ball {{
    position:absolute; border-radius:50%; z-index:3;
    box-shadow:
      inset -14px -18px 28px rgba(0,0,0,0.45),
      inset 10px 12px 20px rgba(255,255,255,0.55),
      0 20px 40px rgba(0,0,0,0.4);
  }}
  .b1 {{
    width:180px; height:180px; top:46px; left:68px;
    background:
      radial-gradient(circle at 32% 28%, #fff 0 8%, rgba({r},{g},{b},0.95) 28%, rgba({r},{g},{b},0.2) 62%, #0a0a0c 100%);
  }}
  .b2 {{
    width:92px; height:92px; top:86px; right:96px;
    background:
      radial-gradient(circle at 30% 26%, #fff 0 10%, rgba({r2},{g2},{b2},0.9) 32%, rgba(10,10,14,0.9) 100%);
  }}
  .b3 {{
    width:58px; height:58px; bottom:96px; left:150px;
    background:
      radial-gradient(circle at 32% 28%, #fff 0 12%, rgba(255,255,255,0.55) 26%, rgba({r},{g},{b},0.7) 60%, #111 100%);
  }}
  .ring {{
    position:absolute; width:300px; height:300px; left:50%; top:46%;
    transform: translate(-50%,-50%) rotateX(62deg) rotateZ(-18deg);
    border: 28px solid rgba({r},{g},{b},0.55);
    border-radius:50%;
    box-shadow:
      0 0 40px rgba({r},{g},{b},0.4),
      inset 0 0 30px rgba({r},{g},{b},0.35),
      0 30px 40px rgba(0,0,0,0.35);
    z-index:2;
  }}
  .cube {{
    position:absolute; width:140px; height:140px; right:110px; top:70px;
    transform-style: preserve-3d;
    transform: rotateX(-22deg) rotateY(-38deg);
    z-index:2;
  }}
  .face {{
    position:absolute; width:140px; height:140px;
    background: linear-gradient(135deg, rgba({r},{g},{b},0.55), rgba(255,255,255,0.12) 40%, rgba(8,8,10,0.7));
    border: 1px solid rgba(255,255,255,0.28);
    box-shadow: inset 0 0 30px rgba({r},{g},{b},0.25);
  }}
  .ft {{ transform: translateZ(70px); }}
  .rt {{ transform: rotateY(90deg) translateZ(70px); background: linear-gradient(135deg, rgba({r},{g},{b},0.25), rgba(8,8,10,0.85)); }}
  .tp {{ transform: rotateX(90deg) translateZ(70px); background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba({r},{g},{b},0.3)); }}
  .slab-back {{
    position:absolute; width:420px; height:240px; left:50%; top:48%;
    transform: translate(-50%,-50%) rotateX(14deg) rotateY(22deg) translateZ(-40px);
    border-radius: 28px;
    background: linear-gradient(145deg, rgba({r},{g},{b},0.18), rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.2));
    border: 1px solid rgba(255,255,255,0.16);
    box-shadow: 0 30px 60px rgba(0,0,0,0.35);
    z-index:2;
  }}
  .glass {{
    position:absolute; width:280px; height:280px; left:50%; top:48%;
    transform: translate(-50%,-50%) rotateX(10deg) rotateY(-16deg) translateZ(48px);
    border-radius: 36px;
    background:
      linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.07) 38%, rgba({r},{g},{b},0.10) 100%);
    border: 1px solid rgba(255,255,255,0.38);
    box-shadow:
      0 28px 60px rgba(0,0,0,0.45),
      0 0 80px rgba({r},{g},{b},0.22),
      inset 0 1px 0 rgba(255,255,255,0.55),
      inset 0 -20px 40px rgba(0,0,0,0.2);
    backdrop-filter: blur(18px);
    z-index:5;
    display:flex; align-items:center; justify-content:center;
  }}
  .glass .shine {{
    position:absolute; inset:0; border-radius: inherit; pointer-events:none;
    background: linear-gradient(115deg, rgba(255,255,255,0.45) 0 14%, transparent 38%),
                radial-gradient(circle at 78% 86%, rgba({r},{g},{b},0.28), transparent 42%);
  }}
  .icon {{
    width: 168px; height: 168px; position:relative; z-index:1;
    filter:
      drop-shadow(0 8px 16px rgba(0,0,0,0.45))
      drop-shadow(0 0 22px rgba({r},{g},{b},0.55));
  }}
  .icon svg {{ width:100%; height:100%; display:block; }}
</style>
</head>
<body>
  <div class="stage">
    <div class="grid"></div>
    <div class="floor"></div>
    {extras}
    <div class="glass">
      <div class="shine"></div>
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        {paths}
        </svg>
      </div>
    </div>
    <div class="vignette"></div>
  </div>
</body>
</html>
"""


def render_one(item_id: str, icon: str, accent: str, variant: str) -> Path:
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    html_path = TMP_DIR / f"{item_id}.html"
    png_path = TMP_DIR / f"{item_id}.png"
    webp_path = OUT_DIR / f"{item_id}.webp"
    html_path.write_text(html_for(item_id, icon, accent, variant), encoding="utf-8")
    cmd = [
        CHROME,
        "--headless=new",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=2",
        "--window-size=800,500",
        f"--screenshot={png_path}",
        html_path.as_uri(),
    ]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=40)
    if r.returncode != 0 or not png_path.exists():
        raise RuntimeError(f"{item_id} chrome failed: {r.stderr[-400:] if r.stderr else r.stdout}")
    im = Image.open(png_path).convert("RGB")
    # Exact 800x500 output (2x capture is 1600x1000)
    if im.size != (1600, 1000):
        im = im.resize((1600, 1000), Image.Resampling.LANCZOS)
    im = im.resize((800, 500), Image.Resampling.LANCZOS)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    im.save(webp_path, "WEBP", quality=90, method=6)
    return webp_path


def main() -> int:
    only = sys.argv[1:]
    items = [x for x in ITEMS if not only or x[0] in only]
    ok = 0
    # Sequential is more stable for chrome in a tight container; small pool if many
    workers = 2 if len(items) > 1 else 1
    errors = []
    if workers == 1:
        for rec in items:
            try:
                p = render_one(*rec)
                print(f"OK {rec[0]} -> {p} ({p.stat().st_size} bytes)")
                ok += 1
            except Exception as e:
                errors.append(f"{rec[0]}: {e}")
                print(f"FAIL {rec[0]}: {e}", file=sys.stderr)
    else:
        with ThreadPoolExecutor(max_workers=workers) as ex:
            futs = {ex.submit(render_one, *rec): rec[0] for rec in items}
            for fut in as_completed(futs):
                name = futs[fut]
                try:
                    p = fut.result()
                    print(f"OK {name} -> {p} ({p.stat().st_size} bytes)")
                    ok += 1
                except Exception as e:
                    errors.append(f"{name}: {e}")
                    print(f"FAIL {name}: {e}", file=sys.stderr)
    print(f"done {ok}/{len(items)}")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
