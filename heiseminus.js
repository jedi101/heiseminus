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
                const parentNode = this.#findEndNodeOf(selectedElement, search.endIdentifier)

                if (parentNode) {
                    if (search.action === "hide") {
                        console.log("Config: " + search.startIdentifier
                            + " -> " + search.endIdentifier
                            + " -> " + search.action + " -> ", parentNode)

                        this.#hideElement(parentNode);
                    } else if (search.action === "replaceImg") {
                        console.log("Config: " + search.startIdentifier
                            + " -> " + search.endIdentifier
                            + " -> " + search.action + " -> ", parentNode)

                        this.#replaceElement(parentNode);
                    } else {
                        console.log("No search action specified.");
                    }
                } else {
                    console.log("No ParentNode found for search: "
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