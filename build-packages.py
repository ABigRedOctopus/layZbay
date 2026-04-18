from __future__ import annotations

import json
import shutil
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parent
OUT = ROOT / "dist"
SOURCE_FILES = [
    "manifest.json",
    "background.js",
    "README.md",
    "PRIVACY_POLICY.md",
    "icons",
]


def remove_path(path: Path) -> None:
    if path.is_dir():
        shutil.rmtree(path)
    elif path.exists():
        path.unlink()


def copy_source(dst: Path) -> None:
    remove_path(dst)
    dst.mkdir(parents=True, exist_ok=True)

    for name in SOURCE_FILES:
        src = ROOT / name
        target = dst / name
        if src.is_dir():
            shutil.copytree(src, target)
        else:
            shutil.copy2(src, target)


def write_manifest(path: Path, manifest: dict) -> None:
    path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def zip_dir(source_dir: Path, archive_path: Path) -> None:
    archive_path.parent.mkdir(parents=True, exist_ok=True)
    remove_path(archive_path)

    with ZipFile(archive_path, "w", compression=ZIP_DEFLATED) as zf:
        for file_path in sorted(source_dir.rglob("*")):
            if file_path.is_file():
                zf.write(file_path, file_path.relative_to(source_dir))


def build_chromium() -> None:
    source = OUT / "chromium" / "source" / "layZbay"
    copy_source(source)

    for browser, archive_name in [
        ("chrome", "layZbay-chrome.zip"),
        ("edge", "layZbay-edge.zip"),
        ("opera", "layZbay-opera.zip"),
        ("brave", "layZbay-brave.zip"),
    ]:
        zip_dir(source, OUT / "chromium" / browser / archive_name)


def build_firefox() -> None:
    source = OUT / "firefox" / "source" / "layZbay"
    copy_source(source)

    manifest_path = source / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest["browser_specific_settings"] = {
        "gecko": {
            "id": "layzbay@chief.local",
            "strict_min_version": "128.0",
        }
    }
    write_manifest(manifest_path, manifest)

    zip_dir(source, OUT / "firefox" / "layZbay-firefox.xpi")


def clean_output() -> None:
    remove_path(OUT)


def main() -> None:
    clean_output()
    build_chromium()
    build_firefox()


if __name__ == "__main__":
    main()
