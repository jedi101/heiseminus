const config = {
    "searches": [
        {
            "startNode": ".heiseplus-logo-small",
            "parentElement": "article",
            "action": "hide"
        },
        {
            "startNode": ".heiseplus-logo",
            "parentElement": "article",
            "action": "replaceImg"
        }
    ],
    "tag": {
        "tagName": "img",
        "src": "",
        "localFilePath": "images/heiseminus-logo.svg",
        "width": 80,
        "height": 24
    }
}

function main(config) {
    const imageTagInstance = new Tag(config.tag)
    const heiseMinusInstance = new HeiseMinus(config, imageTagInstance.tag)
}

class HeiseMinus {
    constructor(config, imageTag) {
        this.newLogo = imageTag
        this.searches = config.searches
        this.#hideHeisePlusPlus()
    }

    #hideHeisePlusPlus() {
        Object.values(this.searches).forEach(search => {
            const selection = this.#selectElements(search.startNode)

            selection.forEach(selectedElement => {
                const parentNode = this.#findParentNodeOf(selectedElement, search.parentElement)

                if (parentNode !== "undefined") {
                    if (search.action === "hide") {
                        this.#hideElement(selectedElement)
                    } else if (search.action === "replaceImg") {
                        this.#replaceElement(selectedElement)
                    } else {
                        console.log("No search action specified.")
                    }
                }
            })
        });
    }

    #hideHeisePlus() {
        for (const [searchstring, action] of Object.entries(this.searches)) {

            const selection = this.#selectElements(searchstring)

            selection.forEach(selectedElement => {
                if (action === "hide") {
                    this.#hideElement(selectedElement)
                } else if (action === "replaceImg") {
                    this.#replaceElement(selectedElement)
                }
            })
        }
    }

    #selectElements(identifier) {
        return document.querySelectorAll(identifier)
    }
    
    /**
     * Find the parent of a the specified tag and work the way up to select
     * his parent node and return it.
     * @param {Node} startNodede starting node for reverse parent look up operation
     * @param {String} endNodeTagName specifier of the end nodes node name
     * @return {Node} return parent node
     */
    #findParentNodeOf(selectedElement, parentElement) {
        // escape recursion if we found our parent node
        if (selectedElement.tagName === parentElement) {
            return selectedElement
        }
        // recursive call as long as we haven't found the parent yet
        return recursiveBacktraceToParentNode(selectedElement.parentNode, parentElement)
    }

    #hideElement(selectionToHide) {
        selectionToHide.style.display = "none"
    }

    #replaceElement(nodeToReplace) {
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