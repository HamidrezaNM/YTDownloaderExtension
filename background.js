let activeTabId, lastUrl, lastTitle;

function getTabInfo(tabId) {
  browser.tabs.get(tabId, function (tab) {
    if (lastUrl != tab.url || lastTitle != tab.title) {
      if (tab.url.match(/youtube.com\/watch\?v=([^&]+)/)) {
        browser.tabs.sendMessage(tabId, {
          message: 'youtube_url',
          url: tab.url.match(/youtube.com\/watch\?v=([^&]+)/)[1]
        }).catch((error) => console.error(error));
      }
    }
  });
}

browser.tabs.onActivated.addListener(function (activeInfo) {
  getTabInfo(activeTabId = activeInfo.tabId);
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (activeTabId == tabId) {
    getTabInfo(tabId);
  }
});