function setLocalStorageValue(headerName, headerValue){
    chrome.storage.local.set({[headerName]: headerValue}, function() {
    });
  }