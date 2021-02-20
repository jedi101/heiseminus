class HeiseMinus {
    constructor(config, imageTag) {
        this.newLogo = imageTag;
        this.searches = config.searches;
        this.#hideHeisePlus();
    }

    #hideHeisePlus() {
        Object.values(this.searches).forEach(search => {
            const selection = this.#selectElements(search.startNode);

            selection.forEach(selectedElement => {
                const parentNode = this.#findParentNodeOf(selectedElement, search.parentElement)

                if (parentNode !== "undefined" && parentNode !== null) {
                    if (search.action === "hide") {
                        console.log("Config: " + search.startNode
                        + " -> " + search.parentElement
                        + " -> " + search.action + " -> ", parentNode)

                        this.#hideElement(parentNode);
                    } else if (search.action === "replaceImg") {
                        console.log("Config: " + search.startNode
                        + " -> " + search.parentElement
                        + " -> " + search.action + " -> ", parentNode)
                        
                        this.#replaceElement(parentNode);
                    } else {
                        console.log("No search action specified.");
                    }
                } else {
                    console.log("No ParentNode found for search: "
                        + search.startNode + " with parentElement: "
                        + search.parentElement);
                }
            });
        });
    }

    #selectElements(identifier) {
        return document.querySelectorAll(identifier);
    }

    /**
     * Find the parent of a the specified tag and work the way up to select
     * his parent node and return it.
     * @param {Node} startNodede starting node for reverse parent look up operation
     * @param {String} endNodeTagName specifier of the end nodes node name
     * @return {Node} return parent node
     */
    #findParentNodeOf(selectedElement, parentElement) {
        if (selectedElement == null) {
            return null;
        } else if (selectedElement.tagName === parentElement) {
            return selectedElement;
        } else {
            // recursive call as long as we haven't found the parent yet
            return this.#findParentNodeOf(selectedElement.parentNode, parentElement);
        }
    }

    #hideElement(selectionToHide) {
        selectionToHide.style.display = "none";
        // selectionToHide.style.visibility = "hidden"
    }

    #replaceElement(nodeToReplace) {
        nodeToReplace.parentElement.replaceChild(this.newLogo, nodeToReplace);
    }
}
