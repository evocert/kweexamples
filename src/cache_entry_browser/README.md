`caching` entry browser example.

Sample invocations

```
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"create","msg":"test_0","debug":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"create","msg":"test_1","debug":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"create","msg":"test_2","debug":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"create","msg":"test_3","debug":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"search","query":"test_1","offset":0,"limit":10,"sort":"DESC","debug":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"search","query":"lorem","offset":10,"limit":20,"sort":"ASC","debug":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"log","action":"list"}' "$URL" --output -
```
Live example available <a href="http://skullquake.dedicated.co.za/kweexamples/src/cache_entry_browser/" target="_blank">here</a>
