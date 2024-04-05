/**
 * @name PrettyFolders
 * @author webcrawls
 * @authorLink https://github.com/webcrawls
 * @description Applies a folder's icon colour to its background when expanded.
 * @version 1.2.3
 * @source https://github.com/webcrawls/discord
 * @updateUrl https://raw.githubusercontent.com/webcrawls/discord/master/pretty-folders.plugin.js
 */
module.exports = class MyPlugin {
    start = () => Array.from(document.querySelectorAll(FOLDER_WRAPPER)).forEach(attachFolder)
    stop = () => Array.from(document.querySelectorAll(FOLDER_WRAPPER)).forEach(detachFolder)
};

// Discord HTML classname constants
const FOLDER_WRAPPER = "div[aria-label='Servers'] > div[class^='wrapper__']"
const FOLDER_COLLAPSED = "span[class^='expandedFolderBackground'], span[class^='collapsed__']"
const FOLDER_ICON_WRAPPER = "div[class^='expandedFolderIconWrapper']"
const EXPANDED_FOLDER_BACKGROUND = "span[class^='expandedFolderBackground']"

/**
 * Returns the folder icon element, if any, within the provided element.
 *
 * @param el an HTMLElement
 * @returns an HTMLElement or null
 */
const folderIcon = (el) => "getElementsByClassName" in el ? el.querySelectorAll(FOLDER_ICON_WRAPPER)[0] : null

/**
 * Returns the folder background element, if any, within the provided element.
 *
 * @param el an HTMLElement
 * @returns an HTMLElement or null
 */
const folderBackground = (el) => "getElementsByClassName" in el ? el.querySelectorAll(EXPANDED_FOLDER_BACKGROUND)[0] : null

/**
 * State that maps a root folder HTML element to it's MutationObserver.
 *
 * @type {Object.<HTMLElement, MutationObserver>}
 */
const observers = {}

/**
 * Used for a dumb hack.
 *
 * If a folder icon's SVG is a colour in this array, the colour won't be changed by the plugin.
 * Currently, we change the folder icon's colour to 'white'. So we're telling the plugin to skip any changes that
 * we've already made.
 *
 * @type {string[]}
 */
const ignoredColors = [
    "white"
]

/**
 * Creates a MutationObserver that listens for changes to a folder wrapper.
 *
 * @param folderElement the folder wrapper element
 */
const attachFolder = (folderElement) => {
    const observer = new MutationObserver(() => setTimeout(updateFolder.bind(this, folderElement), 1))
    observer.observe(folderElement, {childList: true, attributes: true})
    observers[folderElement] = observer
    updateFolder(folderElement)
}

/**
 * Removes a MutationObserver for a folder wrapper.
 *
 * @param folderElement the folder wrapper element
 */
const detachFolder = (folderElement) => {
    observers[folderElement]?.disconnect()
    observers[folderElement] = null
}

/**
 * Updates a folder's background color with the icon color.
 *
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

    if (!background.matches(FOLDER_COLLAPSED) && ignoredColors.indexOf(folderColor) === -1) {
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

/**
 * Resets any changes to a folder wrapper.
 *
 * @param folder the folder wrapper element
 */
const resetFolder = (folder) => {
    const background = folderBackground(folder)
    background.style.removeProperty("background-color");
    background.style.removeProperty("opacity");
    observers[folder]?.disconnect()

    folder.removeEventListener("click", () => updateFolder(this))
}
