let activeTabId, lastUrl, lastTitle;

function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function (tab) {
    if (lastUrl != tab.url || lastTitle != tab.title) {
      console.log(lastUrl = tab.url, lastTitle = tab.title);

      if (tab.url.match(/youtube.com\/watch\?v=(\w+)/)) {
        chrome.tabs.sendMessage(tabId, {
          message: 'youtube_url',
          url: tab.url.match(/youtube.com\/watch\?v=(\w+)/)[1]
        })
      }
    }
  });
}

chrome.tabs.onActivated.addListener(function (activeInfo) {
  getTabInfo(activeTabId = activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (activeTabId == tabId) {
    getTabInfo(tabId);
  }
});