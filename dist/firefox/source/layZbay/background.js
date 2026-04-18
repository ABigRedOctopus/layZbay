const MENU_ID = 'search-ebay-selection';
const BASIC_ID = 'search-ebay-basic';
const SOLD_ID = 'search-ebay-sold';
const ADD_BULK_ID = 'search-ebay-add-bulk';
const BULK_ROOT_ID = 'search-ebay-bulk-root';
const MAIN_SEPARATOR_ID = 'search-ebay-main-separator';
const BULK_SEPARATOR_ID = 'search-ebay-bulk-separator';
const CLEAR_BULK_ID = 'search-ebay-clear-bulk';
const SUBMIT_BASIC_BULK_ID = 'search-ebay-submit-basic-bulk';
const SUBMIT_SOLD_BULK_ID = 'search-ebay-submit-sold-bulk';
const STORAGE_KEY = 'bulkSearchItems';

function storageGet(key, fallbackValue) {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [key]: fallbackValue }, (result) => {
      resolve(result[key]);
    });
  });
}

function storageSet(key, value) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve);
  });
}

function removeAllMenus() {
  return new Promise((resolve) => {
    chrome.contextMenus.removeAll(resolve);
  });
}

function createMenuItem(options) {
  chrome.contextMenus.create(options);
}

function buildSearchUrl(query, sold) {
  const encoded = encodeURIComponent(query.trim());
  const soldParams = sold ? '&LH_Sold=1&LH_Complete=1' : '';
  return `https://www.ebay.com/sch/i.html?_nkw=${encoded}${soldParams}`;
}

function openSearchTabs(items, sold) {
  for (const item of items) {
    chrome.tabs.create({ url: buildSearchUrl(item, sold) });
  }
}

async function renderMenus() {
  const bulkItems = await storageGet(STORAGE_KEY, []);

  await removeAllMenus();

  createMenuItem({
    id: MENU_ID,
    title: 'Search on eBay',
    contexts: ['selection', 'page'],
  });

  createMenuItem({
    id: BASIC_ID,
    parentId: MENU_ID,
    title: 'Basic Search',
    contexts: ['selection'],
  });

  createMenuItem({
    id: SOLD_ID,
    parentId: MENU_ID,
    title: 'Sold Search',
    contexts: ['selection'],
  });

  createMenuItem({
    id: MAIN_SEPARATOR_ID,
    type: 'separator',
    parentId: MENU_ID,
    contexts: ['selection'],
  });

  createMenuItem({
    id: ADD_BULK_ID,
    parentId: MENU_ID,
    title: 'Add to Bulk Search',
    contexts: ['selection'],
  });

  createMenuItem({
    id: BULK_ROOT_ID,
    parentId: MENU_ID,
    title: 'Bulk Search',
    contexts: ['selection', 'page'],
  });

  bulkItems.forEach((item, index) => {
    createMenuItem({
      id: `search-ebay-bulk-item-${index}`,
      parentId: BULK_ROOT_ID,
      title: item,
      contexts: ['selection', 'page'],
    });
  });

  if (bulkItems.length > 0) {
    createMenuItem({
      id: BULK_SEPARATOR_ID,
      type: 'separator',
      parentId: BULK_ROOT_ID,
      contexts: ['selection', 'page'],
    });
  }

  createMenuItem({
    id: SUBMIT_BASIC_BULK_ID,
    parentId: BULK_ROOT_ID,
    title: 'Submit Basic Bulk Search',
    contexts: ['selection', 'page'],
  });

  createMenuItem({
    id: SUBMIT_SOLD_BULK_ID,
    parentId: BULK_ROOT_ID,
    title: 'Submit Sold Bulk Search',
    contexts: ['selection', 'page'],
  });

  createMenuItem({
    id: CLEAR_BULK_ID,
    parentId: BULK_ROOT_ID,
    title: 'Clear Bulk Search',
    contexts: ['selection', 'page'],
  });
}

async function addToBulkSearch(selectionText) {
  const text = selectionText.trim();

  if (!text) {
    return;
  }

  const current = await storageGet(STORAGE_KEY, []);
  const next = current.filter((item) => item !== text);
  next.push(text);

  while (next.length > 5) {
    next.shift();
  }

  await storageSet(STORAGE_KEY, next);
  await renderMenus();
}

function createMenu() {
  renderMenus();
}

chrome.runtime.onInstalled.addListener(createMenu);
chrome.runtime.onStartup.addListener(createMenu);

chrome.contextMenus.onClicked.addListener((info) => {
  const hasSelection = Boolean(info.selectionText && info.selectionText.trim());

  if (!hasSelection && ![SUBMIT_BASIC_BULK_ID, SUBMIT_SOLD_BULK_ID, CLEAR_BULK_ID].includes(info.menuItemId)) {
    return;
  }

  if (info.menuItemId === BASIC_ID && hasSelection) {
    chrome.tabs.create({ url: buildSearchUrl(info.selectionText, false) });
  } else if (info.menuItemId === SOLD_ID && hasSelection) {
    chrome.tabs.create({ url: buildSearchUrl(info.selectionText, true) });
  } else if (info.menuItemId === ADD_BULK_ID && hasSelection) {
    addToBulkSearch(info.selectionText);
  } else if (info.menuItemId === SUBMIT_BASIC_BULK_ID) {
    storageGet(STORAGE_KEY, []).then((items) => openSearchTabs(items, false));
  } else if (info.menuItemId === SUBMIT_SOLD_BULK_ID) {
    storageGet(STORAGE_KEY, []).then((items) => openSearchTabs(items, true));
  } else if (info.menuItemId === CLEAR_BULK_ID) {
    storageSet(STORAGE_KEY, []).then(renderMenus);
  } else {
    return;
  }
});
