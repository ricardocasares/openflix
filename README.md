openflix
========

[![Join the chat at https://gitter.im/ricardocasares/openflix](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ricardocasares/openflix?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

In browser torrent streaming open source netflix clone

## What we got so far
* Demo: [movies.rutapirata.com](http://movies.rutapirata.com)
  *  No streaming of any kind, just limited movie browsing and torrent fetching

## Todo
* ~~Implement themoviedb.org to search & fetch film data~~
* ~~Implement yts.re/api to fetch torrent data~~
* Implement [webtorrent](https://github.com/feross/webtorrent) to accomplish in-browser torrent streaming
  * An alternative would be to implent this as a chrome extension [like this one](https://github.com/ricardocasares/bitford), downside: chrome-only
* Implement yifysubtitles.com to fetch subs

## Wishlist
* On-the-fly video/audio transcoding
  * Would be great, but I think it might be very slow
  * Maybe [videoconverter.js](http://bgrins.github.io/videoconverter.js) could help
