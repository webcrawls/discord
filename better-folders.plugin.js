
/**
 * @name BetterFolders
 * @author bluely_ (kaden.sh)
 * @description BetterFolders applies a folder's icon colour to it's background when expanded.
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
                    console.log("catuching click event on wrapper")
                    let wrapper = findAncestor(e.target, "." + FOLDER_WRAPPER)
                    console.log({wrapper})
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
    console.log("updating all folders");

    for (let wrapper of document.getElementsByClassName(FOLDER_WRAPPER)) {
        applyCssColoursToFolderWrapper(wrapper)
    }
}

function applyCssColoursToFolderWrapper(wrapper) {
    let expandedBackground = getExpandedBackground(wrapper)
    let iconWrapper = getIconWrapper(wrapper)
    if (iconWrapper == null) {
        console.log("iconWrapper null, returning")
        return
    }

    console.log(iconWrapper)

    let svg = iconWrapper.querySelector("svg")

    console.log({
        expandedBackground,
        iconWrapper,
    });

    let folderColor = svg.style.color;

    console.log("found color: " + folderColor)

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