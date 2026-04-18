# Packaging

Generated browser packages are written to the single `dist/` tree.

## Outputs

- Chromium source: `dist/chromium/source/layZbay/`
- Chrome: `dist/chromium/chrome/layZbay-chrome.zip`
- Edge: `dist/chromium/edge/layZbay-edge.zip`
- Opera: `dist/chromium/opera/layZbay-opera.zip`
- Brave: `dist/chromium/brave/layZbay-brave.zip`
- Firefox source: `dist/firefox/source/layZbay/`
- Firefox: `dist/firefox/layZbay-firefox.xpi`

## Notes

- Firefox package adds `browser_specific_settings.gecko.id` for installability.
- Chromium-family browsers share the `dist/chromium/source/layZbay/` tree.
