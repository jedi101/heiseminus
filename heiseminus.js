const config = {
    "tag": {
        "tagName": "img",
        "src": "",
        "localFilePath": "images/heiseminus-logo.svg",
        "width": 80,
        "height": 24
    },

    "searches": {
        ".heiseplus-logo-small": "hide",
        ".stage--heiseplus": "hide",
        ".heiseplus-lnk": "hide",
        ".sitemap-group__link--heiseplus": "hide",
        ".cms-block-abo-row": "hide",
        "a-collapse-group > a-collapse:nth-child(2)": "hide",
        ".heiseplus-logo": "replaceImg"
    }
}

function main(config) {
    const heiseminus = new HeiseMinus(config)
}

class HeiseMinus {
    constructor(config) {
        const tagObject = new Tag(config.tag)
        this.newLogo = tagObject.tag
        this.searches = config.searches
        this.hideHeisePlus()
    }

    hideHeisePlus() {
        for (const [searchstring, action] of Object.entries(this.searches)) {

            const selection = this.selectElements(searchstring)

            selection.forEach(selectedElement => {
                if (action === "hide") {
                    this.hideElement(selectedElement)
                } else if (action === "replaceImg") {
                    this.replaceElement(selectedElement)
                }
            })
        }
    }

    selectElements(identifier) {
        return document.querySelectorAll(identifier)
    }

    hideElement(selectionToHide) {
        selectionToHide.style.display = "none"
    }

    replaceElement(nodeToReplace) {
        nodeToReplace.parentElement.replaceChild(this.newLogo, nodeToReplace)
    }

}

class Tag {
    constructor(config) {
        this.setAttributes(config)
        this.#createLocalFileURL()
        this.#createNewRawElement()
        this.#addAttributesToRawElement()
    }

    setAttributes(attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            this[key] = value
        }
    }

    #createLocalFileURL() {
        // this.src = this.localFilePath
        this.src = chrome.extension.getURL(this.localFilePath)
    }

    #createNewRawElement() {
        this.rawElement = document.createElement(this.tagName)
    }

    #addAttributesToRawElement() {
        for (const [key, value] of Object.entries(this)) {
            if (key !== "rawElement" && key !== "tagName" && key !== "localFilePath") {
                this.rawElement.setAttribute(key, value)
            }
        };
        this.tag = this.rawElement
    }
}

main(config)