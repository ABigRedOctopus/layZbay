# Submission Checklist

## Shared checks

- Confirm manifest version and extension name are final.
- Verify no remote code, eval, or dynamic script loading is used.
- Confirm permissions are limited to `contextMenus`, `storage`, and `tabs`.
- Prepare screenshots, store listing copy, support URL, and privacy policy URL.
- Confirm the privacy policy states data stays local.

## Firefox

- Upload `dist/firefox/layZbay-firefox.xpi`.
- Confirm `browser_specific_settings.gecko.id` is present.
- Test install/update in Firefox.

## Chrome Web Store

- Upload `dist/chromium/chrome/layZbay-chrome.zip`.
- Test install/update in Chrome.

## Edge Add-ons

- Upload `dist/chromium/edge/layZbay-edge.zip`.
- Test install/update in Edge.

## Opera Add-ons

- Upload `dist/chromium/opera/layZbay-opera.zip`.
- Test install/update in Opera.

## Brave

- Use `dist/chromium/brave/layZbay-brave.zip` for sideloading/testing.
- Brave users can also install the Chrome package if distributed that way.
