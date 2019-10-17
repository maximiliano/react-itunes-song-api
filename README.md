# Table of Contents

<!-- MarkdownTOC autolink="true" autoanchor="true" levels="1,2,3" -->

- [How to Use](#how-to-use)
- [App Documentation](#app-documentation)
    - [Requirements](#requirements)
    - [Install Instruction](#install-instruction)
    - [Work environment used](#work-environment-used)

<!-- /MarkdownTOC -->

<a id="how-to-use"></a>
# How to Use
This project allows the user to search for an artist, album or song name and display a list of songs or album.

The music information is loaded from iTunes API directly.

- Search Bar: Receives user input for artist, album or song name.
- Get Albums: Lists only albums that match the criteria.
    + In the album list, if you click on the album name the system will load only the songs of that album.
- Get Songs: Lists only songs that match the criteria.
- Clear Search: Start search from scratch.

<a id="app-documentation"></a>
# App Documentation

<a id="requirements"></a>
## Requirements
To run this project you must have the newest versions of `node` and `npm`.

<a id="install-instruction"></a>
## Install Instruction

1. Clone repository: `$ git clone git@github.com:maximiliano/react-itunes-song-api.git`
2. `$ cd react-itunes-song-api`
3. Install dependencies: `$ npm install`
4. Start development server to test it: `$ npm start`
5. OR, create a build to deploy: `$ npm run build`

**NOTE:** This project is configured to run on the [http://maximiliano.github.io/music-search/](http://maximiliano.github.io/music-search/) URL, so the API requests to iTunes won't load locally because of CORS, unless you change some configurations.

<a id="work-environment-used"></a>
## Work environment used

- Computer:
  + MacBook Air (13-inch, Early 2014)
  + Processor: 1,4 GHz Intel Core i5
  + Memory: 4 GB 1600 MHz DDR3
  + Storage: 120 GB SSD
- Operating System
  + macOS Mojave
  + Version: 10.14.6
- Software:
  + Text Editor: Sublime Text 3
  + Terminal: iTerm
  + Databases: None
  + Libraries: React.js
  + API tests: curl
  + Browsers: Safari and Chrome
