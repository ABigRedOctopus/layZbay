# layZbay

Manifest V3 browser extension for searching highlighted text on eBay.
Compatible packages are provided for Firefox, Chrome, Edge, Opera, and Brave.

## Features

- `Search on eBay` context menu for highlighted text
- `Basic Search` and `Sold Search`
- Bulk search queue with up to 5 saved entries
- `Submit Basic Bulk Search`, `Submit Sold Bulk Search`, and `Clear Bulk Search`

## Install

1. Pick the package for your browser from `dist/`
2. For Chromium browsers, load `dist/chromium/source/layZbay/` for unpacked install or use the matching archive in `dist/chromium/<browser>/`
3. For Firefox, load `dist/firefox/source/layZbay/` for unpacked install or use `dist/firefox/layZbay-firefox.xpi`

## Files

- `manifest.json` - extension manifest
- `background.js` - context menu and bulk search logic
- `icons/` - extension icons
- `build-packages.py` - browser package generator
- `dist/` - generated browser-specific outputs
- `SUBMISSION_CHECKLIST.md` - store submission checklist
- `PRIVACY_POLICY.md` - privacy policy text
- `STORE_LISTING_TEMPLATE.md` - listing metadata template

## Notes

- Bulk items are stored in `chrome.storage.local`
- Submitted bulk searches open one tab per saved item
