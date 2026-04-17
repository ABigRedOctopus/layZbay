# layZbay

Chrome Extension Manifest V3 addon for searching highlighted text on eBay.

## Features

- `Search on eBay` context menu for highlighted text
- `Basic Search` and `Sold Search`
- Bulk search queue with up to 5 saved entries
- `Submit Basic Bulk Search`, `Submit Sold Bulk Search`, and `Clear Bulk Search`

## Install

1. Open `chrome://extensions`
2. Enable Developer mode
3. Click `Load unpacked`
4. Select this folder

## Files

- `manifest.json` - extension manifest
- `background.js` - context menu and bulk search logic
- `icons/` - extension icons

## Notes

- Bulk items are stored in `chrome.storage.local`
- Submitted bulk searches open one tab per saved item
