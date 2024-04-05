# `webcrawls/discord`

A collection of BetterDiscord plugins to tweak and improve my user experience.

## Installation

To install a plugin, you must first ensure [BetterDiscord](#) is installed on your system.

- Download a plugin by `git clone`-ing this repository, or by directly downloading a `.plugin.js` file from GitHub.
- Navigate to your `BetterDiscord/plugins` directory
- Copy the desired plugins into this directory.
- Restart/reload Discord

## Plugins

### BetterFolders

A plugin that improves the default styling of Discord's folders,
using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)s.

This plugin will apply a folder's colour to the folder background. Additionally, the folder icon itself will be made
white. These changes are mostly to improve readability, and I think they look good :)

> Please be aware, there are still a few outstanding issues with this plugin.
> You might need to reload the plugin if you create a new folder.

![Demo gif](https://github.com/webcrawls/discord/blob/master/assets/better-folders.gif?raw=true)