/**
 * @name BetterFolders
 * @author bluely_ (kaden.sh)
 * @description BetterFolders applies a folder's icon colour to its background when expanded.
 * @version 1.0.0
 */
module.exports = class MyPlugin {
    constructor(meta) {
        // Do stuff in here before starting
    }

    start() {
        for (let wrapper of document.getElementsByClassName(FOLDER_WRAPPER)) {
            wrapper.addEventListener("click", (e) => {
                setTimeout(() => {
                    let wrapper = findAncestor(e.target, "." + FOLDER_WRAPPER)
                    applyCssColoursToFolderWrapper(wrapper)
                }, 50)
            })
        }

        updateAllFolders()
    }

    stop() {
        // Cleanup when disabled
    }
};

let FOLDER_WRAPPER = "wrapper-38slSD"
let FOLDER_COLLAPSED = "collapsed-uGXEbi"
let FOLDER_ICON_WRAPPER = "expandedFolderIconWrapper-3RwQpD"
let EXPANDED_FOLDER_BACKGROUND = "expandedFolderBackground-1kSAf6"

function updateAllFolders() {
    for (let wrapper of document.getElementsByClassName(FOLDER_WRAPPER)) {
        applyCssColoursToFolderWrapper(wrapper)
    }
}

function applyCssColoursToFolderWrapper(wrapper) {
    let expandedBackground = getExpandedBackground(wrapper)
    let iconWrapper = getIconWrapper(wrapper)
    if (iconWrapper == null) {
        return
    }

    let svg = iconWrapper.querySelector("svg")
    let folderColor = svg.style.color;

    if (!expandedBackground.classList.contains(FOLDER_COLLAPSED)) {
        expandedBackground.style.backgroundColor = folderColor;
        expandedBackground.style.opacity = 0.3;
    }
}

function getIconWrapper(wrapper) {
    return wrapper.getElementsByClassName(FOLDER_ICON_WRAPPER)[0]
}

function getExpandedBackground(wrapper) {
    return wrapper.getElementsByClassName(EXPANDED_FOLDER_BACKGROUND)[0]
}


function findAncestor(el, sel) {
    if (typeof el.closest === 'function') {
        return el.closest(sel) || null;
    }
    while (el) {
        if (el.matches(sel)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}