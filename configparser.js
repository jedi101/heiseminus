class ConfigParser {
    constructor(url) {
        this.url = url
    }

    /**
     * fetch local config.json file from url and extract
     * the json object from response
     * @return {Object} json object containing our configuration 
     */
    async readConfigFromFile() {
        return await (await fetch(this.url)).json()
    }
}