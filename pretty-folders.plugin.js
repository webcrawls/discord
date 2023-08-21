/**
 * @name PrettyFolders
 * @author webcrawls
 * @description Applies a folder's icon colour to its background when expanded.
 * @version 1.2.0
 */
module.exports = class MyPlugin {
    start = () => Array.from(document.getElementsByClassName(FOLDER_WRAPPER)).forEach(attachFolder)
    stop = () => Array.from(document.getElementsByClassName(FOLDER_WRAPPER)).forEach(detachFolder)
};

// Discord HTML classname constants
const FOLDER_WRAPPER = "wrapper-38slSD"
const FOLDER_COLLAPSED = "collapsed-uGXEbi"
const FOLDER_ICON_WRAPPER = "expandedFolderIconWrapper-3RwQpD"
const EXPANDED_FOLDER_BACKGROUND = "expandedFolderBackground-1kSAf6"

// Utility methods to get key elements
// Not exactly happy with how these, but hey, they're one-liners :D
const folderIcon = (el) => "getElementsByClassName" in el ? el.getElementsByClassName(FOLDER_ICON_WRAPPER)[0] : undefined
const folderBackground = (el) => "getElementsByClassName" in el ? el.getElementsByClassName(EXPANDED_FOLDER_BACKGROUND)[0] : undefined

// State. MutationObservers are thrown in here
const observers = {}

// A bit of a hack. "#updateFolder" reads this string when updating a folder.
// If the icon's SVG color is one of these, i.e. "white", which it will be after we make it look better,
// the function will not make any modifications.
const ignoredColors = [
    "white"
]

const attachFolder = (folderElement) => {
    const observer = new MutationObserver(() => setTimeout(updateFolder.bind(this, folderElement), 1))
    observer.observe(folderElement, {childList: true, attributes: true})
    observers[folderElement] = observer
    updateFolder(folderElement)
}

const detachFolder = (folderElement) => {
    observers[folderElement]?.disconnect()
    observers[folderElement] = null
}

/**
 * Updates a folder's background color with the icon color.
 * @param folder the folder wrapper element
 */
const updateFolder = (folder) => {
    const background = folderBackground(folder)
    if (!background) {
        console.warn("could not find background element for", {folder})
        return
    }

    const icon = folderIcon(folder)
    const svg = icon?.querySelector("svg")
    const folderColor = svg?.style?.color;

    if (!folderColor) return;

    if (!background.classList.contains(FOLDER_COLLAPSED) && ignoredColors.indexOf(folderColor) === -1) {
        background.style.backgroundColor = folderColor;
        icon.style.backgroundColor = folderColor
        svg.style.color = "white"
        svg.style.opacity = 0.7;
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

    folder.removeEventListener("click", () => updateFolder(this))
}
