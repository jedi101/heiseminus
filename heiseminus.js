class HeiseMinus {
    constructor(config, imageTag) {
        this.newLogo = imageTag;
        this.searches = config.searches;
        this.#hideHeisePlus();
    }

    #hideHeisePlus() {
        Object.values(this.searches).forEach(search => {
            const selection = this.#selectElements(search.startIdentifier)

            selection.forEach(selectedElement => {
                const endNode = this.#findEndNodeOf(selectedElement, search.endIdentifier)

                if (endNode) {
                    if (search.action === "hide") {
                        this.#hideElement(endNode)
                    }

                    if (search.action === "replaceImg") {
                        this.#replaceElement(endNode)
                    }
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
        return this.#findEndNodeOf(selectedElement.endNode, endIdentifier);
    }

    #hideElement(elementToHide) {
        elementToHide.style.display = "none";
    }

    #replaceElement(elementToReplace) {
        elementToReplace.parentNode.replaceChild(this.newLogo, elementToReplace);
    }
}