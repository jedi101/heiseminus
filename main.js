async function main() {
    // create local file url to access config.json of the extension
    // const url = chrome.extension.getURL("config.json")
    // const url = chrome.extension.getURL("https://codeberg.org/dasistdaniel/PayWallBlocker/raw/branch/onlineblocklist/PWB_BLOCKLIST.json")
    
    const url = chrome.extension.getURL("https://codeberg.org/jedi/heiseminus/src/commit/72585cf6fa2c5b7a1230abfbef91aefcd03d134a/config.json")
    // create a config parser to access content from config.json
    const configParser = new ConfigParser(url)

    // wait until config.json is complitly read
    const config = await configParser.readConfigFromFile(url)

    // create a new tag out of config containing the heise minus logo
    const imageTagInstance = new Tag(config.tag)

    // create a new heise minus instance with the configuration and logo
    const heiseMinusInstance = new HeiseMinus(config, imageTagInstance.tag)
}

// run heiseminus
main()