/**
 * @name BetterFolders
 * @author webcrawls
 * @description Applies a folder's icon colour to its background when expanded.
 * @version 1.1.0
 */
module.exports = class MyPlugin {
    start = () => Array.from(document.getElementsByClassName(FOLDER_WRAPPER)).forEach(updateFolder)
    stop = () => Array.from(document.getElementsByClassName(FOLDER_WRAPPER)).forEach(resetFolder)
};

// Discord HTML classname constants
const FOLDER_WRAPPER = "wrapper-38slSD"
const FOLDER_COLLAPSED = "collapsed-uGXEbi"
const FOLDER_ICON_WRAPPER = "expandedFolderIconWrapper-3RwQpD"
const EXPANDED_FOLDER_BACKGROUND = "expandedFolderBackground-1kSAf6"

// Utility methods to get key elements
const folderIcon = (el) => el.getElementsByClassName(FOLDER_ICON_WRAPPER)[0];
const folderBackground = (el) => el.getElementsByClassName(EXPANDED_FOLDER_BACKGROUND)[0];

// State
const observers = {}

    /**
 * Updates a folder's background color with the icon color.
 * @param folder the folder wrapper element
 */
const updateFolder = (folder) => {
    const background = folderBackground(folder)
    const icon = folderIcon(folder)
    const svg = icon?.querySelector("svg")
    const folderColor = svg?.style?.color;

    if (!folderColor) return;

    if (!background.classList.contains(FOLDER_COLLAPSED)) {
        background.style.backgroundColor = folderColor;
        background.style.opacity = 0.3;
    }

    folder.addEventListener("click", () => updateFolder(this))
    const observer = new MutationObserver((mutations) => updateFolder(folder))

    observer.observe(svg, {attributes: true, attributeFilter: ['style']})
    observers[folder] = observer
}

const resetFolder = (folder) => {
    const background = folderBackground(folder)
    background.style.removeProperty("background-color");
    background.style.removeProperty("opacity");
    observers[folder]?.disconnect()

    folder.removeEventListener("click", () =>  updateFolder(this))
}
