Basic webcrawler demonstration using `webing`. The relevant file to look at is `./api/cmd/wget.js`, which does traversive crawling, extracts links, handles paths, and performs downloads. A basic API is provided for manipulating the service and is accessible via `./api/`, with example invocation provided in `./test.sh` using `curl`. To test from browser, try something like `/api/?cmd=wget&url=http://localhost:3000/&recursive=true&debug=true&maxvisit=1024&maxdepth=4`. Query parameters used:

* `cmd` - the command file from `./api/cmd/`, here `wget`
* `url` - the url to crawl
* `recursive` - crawl recursively
* `debug` - log to server console
* `maxvisit` - maximum links to visit
* `maxdepth` - maximum recursion depth
* `handler` - optional handler path, path to AMD module `function(url,body){...}`

Rudimentary xml parsing is provided via <a href="https://github.com/ershov-konst/dom-parser" target="_blank">ershov-konst/dom-parser</a>. URLs are constructed based on absolute or relative paths and normalized using `./api/lib/pathutils.js`

Live example available <a href="http://skullquake.dedicated.co.za/kweexamples/src/webcrawler/api/" target="_blank">here</a>
