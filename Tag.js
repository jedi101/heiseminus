class Tag {
    // consturctor
    constructor(config) {
        this.setAttributes(config);
        this.#createLocalFileURL();
        this.#createNewRawElement();
        this.#addAttributesToRawElement();
    }

    setAttributes(attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            this[key] = value;
        }
    }

    #createLocalFileURL() {
        this.src = chrome.extension.getURL(this.localFilePath);
    }

    #createNewRawElement() {
        this.rawElement = document.createElement(this.tagName);
    }

    #addAttributesToRawElement() {
        for (const [key, value] of Object.entries(this)) {
            if (key !== "rawElement" && key !== "tagName" && key !== "localFilePath") {
                this.rawElement.setAttribute(key, value);
            }
        };
        this.tag = this.rawElement;
    }
}