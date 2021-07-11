`caching` entry browser example. `JSON`, query parameter, and `xml` interfaces provided.

Sample JSON bodies

```
{"cmd":"log","action":"create","msg":"test_0","debug":true}
{"cmd":"log","action":"create","msg":"test_1","debug":true}
{"cmd":"log","action":"create","msg":"test_2","debug":true}
{"cmd":"log","action":"create","msg":"test_3","debug":true}
{"cmd":"log","action":"search","query":"test_1","offset":0,"limit":10,"sort":"DESC","debug":true}
{"cmd":"log","action":"search","query":"lorem","offset":10,"limit":20,"sort":"ASC","debug":true}
{"cmd":"log","action":"clear","debug":true}
```
Live example available <a href="http://skullquake.dedicated.co.za/kweexamples/src/cache_entry_browser/" target="_blank">here</a>
