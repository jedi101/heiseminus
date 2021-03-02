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
        return await (await fetch(this.url, {
            method: 'GET',
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json'
            },
        })).json()
    }

    chrome.storage.local.get(function (result) {
        var_registrationtoken = result.RegistrationToken;
        var_etag = result['X-ECS-Etag'];
        var_hostname = result.Hostname;
      });

}