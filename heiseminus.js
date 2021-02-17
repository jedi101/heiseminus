console.log("HeiseMinus: is loaded.");

/*
* Search Definitions
*/
const searches = [
    { "childElement": ".heiseplus-logo-small", "parentElement": "ARTICLE", "action": "hide" },
    { "childElement": ".stage--heiseplus", "parentElement": "ASIDE", "action": "hide" },
    { "childElement": ".heiseplus-logo", "parentElement": "svg", "action": "replaceImg" },
    { "childElement": ".a-box__target", "parentElement": "DIV", "action": "hide" }
];

/**
 * Function calls
 */

hideHeisePlus(searches)

/**
* Function definitions
*/

/**
 * Find the nasty HeisePlus Articles
 * @param {Object} searches specifies whats gonna be searched
 * 
 */
function hideHeisePlus(searches) {
    console.log("HeiseMinus: searching HeisePlus Articles.");

    // Iterate over the searches Object
    searches.forEach(search => {
        let stats = 0;

        // search the childElements
        const selection = document.querySelectorAll(search.childElement);

        // Iterate over all found childElements
        selection.forEach(child => {

            // search the parentElement
            // parent = findParent(child, search.parentElement);
            parent = recursiveBacktraceToParentNode(child, search.parentElement);

            if (parent !== null) {
                // if parentElement is found then do the magic
                stats++; // increase the stats
                if (search.action == "hide") {
                    parent.style.display = "none";
                } else if (search.action == "replaceImg") {
                    console.log(child)
                    let new_logo = document.createElement("img")
                    let file = 'images/heiseminus-logo.svg';
                    let url = chrome.extension.getURL(file);
                    new_logo.src = url
                    new_logo.width = 80;
                    new_logo.height = 24;
                    parent.parentElement.replaceChild(new_logo, parent)
                }
            }
        });

        // just some silly stats
        console.log("HeiseMinus: hid " + stats + " HeisePlus " + search.parentElement.toLowerCase() + "s")
    })
}

// /* *
//  * Find the parent of a the specified tag and work the way up to selct
//  * his parent node and return it.
//  * based on https://stackoverflow.com/a/7333885
//  * @param {Node} startNodede starting node for reverse parent look up operation
//  * @param {String} IdentifierTagName specifier of the end nodes node name
//  * 
//  * @return {Node} return parent node or null if no parent node found
//  */
// function findParent(startNode, IdentifierTagName) {
//     if (startNode.tagName === IdentifierTagName) {
//         return startNode;
//     }
//     while (startNode.parentNode) {
//         startNode = startNode.parentNode;
//         if (startNode.tagName === IdentifierTagName)
//             return startNode;
//     }
//     return null;
// }

function recursiveBacktraceToParentNode(startNode, endNodeTagName) {
    let currentNode = startNode

    if (currentNode.tagName === endNodeTagName) {
        return currentNode
    }
    
    currentNode = currentNode.parentNode
    recursiveBacktraceToParentNode(currentNode, endNodeTagName)
}