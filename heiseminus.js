class HeiseMinus {
    constructor(config, imageTag) {
        this.newLogo = imageTag;
        this.searches = config.searches;
        this.#hideHeisePlus();
    }

    #hideHeisePlus() {
        Object.values(this.searches).forEach(search => {
            const selection = this.#selectElements(search.startIdentifier);

            selection.forEach(selectedElement => {
                const endNode = this.#findEndNodeOf(selectedElement, search.endIdentifier)

                if (endNode) {
                    if (search.action === "hide") {
                        console.log("Config: " + search.startIdentifier
                            + " -> " + search.endIdentifier
                            + " -> " + search.action + " -> ", endNode)

                        this.#hideElement(endNode);
                    } else if (search.action === "replaceImg") {
                        console.log("Config: " + search.startIdentifier
                            + " -> " + search.endIdentifier
                            + " -> " + search.action + " -> ", endNode)

                        this.#replaceElement(endNode);
                    } else {
                        console.log("No search action specified.");
                    }
                } else {
                    console.log("No endNode found for search: "
                        + search.startIdentifier + " with endIdentifier: "
                        + search.endIdentifier);
                }
            });
        });
    }

    #selectElements(identifier) {
        return document.querySelectorAll(identifier);
    }

    #findEndNodeOf(selectedElement, endIdentifier) {
        if (selectedElement == null) {
            return null;
        }
        if (selectedElement.tagName === endIdentifier) {
            return selectedElement;
        }
        return this.#findEndNodeOf(selectedElement.parentNode, endIdentifier);
    }

    #hideElement(elementToHide) {
        elementToHide.style.display = "none";
    }

    #replaceElement(elementToReplace) {
        elementToReplace.parentNode.replaceChild(this.newLogo, elementToReplace);
    }
}