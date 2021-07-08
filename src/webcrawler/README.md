Basic webcrawler demonstration using `webing`. The relevant file to look at is `./api/cmd/wget.js`, which does traversive crawling, extracts links, handles paths, and performs downloads. A basic API is provided for manipulating the service and is accessible via `./api/`, with example invocation provided in `./test.sh` using `curl`.

Rudimentary xml parsing is provided via <a href="https://github.com/ershov-konst/dom-parser" target="_blank">ershov-konst/dom-parser</a>. URLs are constructed based on absolute or relative paths and normalized using `./api/lib/pathutils.js`.

Live example available <a href="http://skullquake.dedicated.co.za/kweexamples/src/webcrawler/api/" target="_blank">here</a>
