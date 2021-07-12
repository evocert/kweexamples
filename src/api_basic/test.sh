#!/bin/bash
PROTOCOL=http
HOST=skullquake.dedicated.co.za
PORT=80
HOST=localhost
PORT=8081
ENDPOINT=/kweexamples/src/api_basic/api/
OUTFMT=json
URL=$PROTOCOL://$HOST:$PORT$ENDPOINT
#--------------------------------------------------------------------------------
echo query parameters:
curl "$URL?cmd=help&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=add&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=sub&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=mul&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=div&a=4&b=2&outfmt="$OUTFMT"" --output -
echo json body:
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"help","outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"add","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"sub","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"mul","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"div","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
echo query parameters and json body:
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=div" --output -
echo xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>help</cmd><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>add</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>sub</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>mul</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b><c><d><e>4</e><f>2</f></d></c><outfmt>xml</outfmt></api>' "$URL" --output -
echo query parameters and xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=div" --output -
#--------------------------------------------------------------------------------
OUTFMT=xml
echo query parameters:
curl "$URL?cmd=help&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=add&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=sub&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=mul&a=4&b=2&outfmt="$OUTFMT"" --output -
curl "$URL?cmd=div&a=4&b=2&outfmt="$OUTFMT"" --output -
echo json body:
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"help","outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"add","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"sub","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"mul","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"div","a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL" --output -
echo query parameters and json body:
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/json" --data '{"a":4,"b":2,"outfmt":"'$OUTFMT'"}' "$URL?cmd=div" --output -
echo xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>help</cmd><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>add</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>sub</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>mul</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><cmd>div</cmd><a>4</a><b>2</b><c><d><e>4</e><f>2</f></d></c><outfmt>xml</outfmt></api>' "$URL" --output -
echo query parameters and xml body:
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=add" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=sub" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=mul" --output -
curl -X POST -H "Content-Type: application/xml" --data '<?xml version="1.0" encoding="UTF-8"?><api><a>4</a><b>2</b><outfmt>xml</outfmt></api>' "$URL?cmd=div" --output -
echo parameter for postprocessor:./api/mw/post_encrypt.js:
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"help","outfmt":"'$OUTFMT'","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"add","a":4,"b":2,"outfmt":"'$OUTFMT'","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"sub","a":4,"b":2,"outfmt":"'$OUTFMT'","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"mul","a":4,"b":2,"outfmt":"'$OUTFMT'","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"div","a":4,"b":2,"outfmt":"'$OUTFMT'","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"help","outfmt":"'$OUTFMT'","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"add","a":4,"b":2,"outfmt":"'$OUTFMT'","outfmt":"xml","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"sub","a":4,"b":2,"outfmt":"'$OUTFMT'","outfmt":"xml","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"mul","a":4,"b":2,"outfmt":"'$OUTFMT'","outfmt":"xml","encrypt":true}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":"div","a":4,"b":2,"outfmt":"'$OUTFMT'","outfmt":"xml","encrypt":true}' "$URL" --output -
echo parameter for preprocessor: ./api/mw/pre_decrypt.js
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19QwTiSuwa0h1yoiD0KWQe2rKG6tb4O/8284gonj8Em4g5bgVwSeIdU' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX1/U5tSiMgPWbswaqbIUMxrsVPrn8/H8RBNCCbZoeweL1Mjlu03XhXv3' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX1/QDuTHYU9hKHrQLN85wSfFsSWdOaU9QQPopnFUL5TNHIcahdlCdHw1' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19q8+6HxorhzfUOvSbQcTQwb/6KeI9+tv53wfwwWEwm4b5z32JW9c2T' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX1/L/1VAqdpRgZOSpfDux3BJTVD1Y+HVr/Y=' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19s3EgcqpRfxY/MHkZIy0QrOwh3FKul6Wya6PDTIr2FwJFEMjik3ZeB9mu4/nKf9XuS8reNzrVWHw==' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19VL1uvtodHsmD/2QMHCldNjLJCKovykxhETdJvXrMj9U/bOFWLIcIKTQVMxeNXljmhcUc9+AoshA==' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX1+gAxgLksykPYl0lIFdrwaPIlU7YFw2kHnibi6WHU6sRCA/4tNRaDhQCZ/Pa/Lsl9H9hnsfngkTiQ==' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19WgIX9oINDgSHikkOVYPZynrs30P/1f0XL4yGWZjq8cEG9gxRt2v5VI1uW63akiwXMuiL0s37R2w==' "$URL?decrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX18zHjxpXH0shv9Ylvyd1FC4U6PB9jrwSw5dqQowqiMQ7FZLRhqPEEjj' "$URL?decrypt=true" --output -
echo parameter for pre and post processor: ./api/mw/pre_decrypt.js and ./api/mw/post_encrypt.js
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19QwTiSuwa0h1yoiD0KWQe2rKG6tb4O/8284gonj8Em4g5bgVwSeIdU' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX1/U5tSiMgPWbswaqbIUMxrsVPrn8/H8RBNCCbZoeweL1Mjlu03XhXv3' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX1/QDuTHYU9hKHrQLN85wSfFsSWdOaU9QQPopnFUL5TNHIcahdlCdHw1' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19q8+6HxorhzfUOvSbQcTQwb/6KeI9+tv53wfwwWEwm4b5z32JW9c2T' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX1/L/1VAqdpRgZOSpfDux3BJTVD1Y+HVr/Y=' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19s3EgcqpRfxY/MHkZIy0QrOwh3FKul6Wya6PDTIr2FwJFEMjik3ZeB9mu4/nKf9XuS8reNzrVWHw==' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19VL1uvtodHsmD/2QMHCldNjLJCKovykxhETdJvXrMj9U/bOFWLIcIKTQVMxeNXljmhcUc9+AoshA==' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX1+gAxgLksykPYl0lIFdrwaPIlU7YFw2kHnibi6WHU6sRCA/4tNRaDhQCZ/Pa/Lsl9H9hnsfngkTiQ==' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX19WgIX9oINDgSHikkOVYPZynrs30P/1f0XL4yGWZjq8cEG9gxRt2v5VI1uW63akiwXMuiL0s37R2w==' "$URL?decrypt=true&encrypt=true" --output -
curl -X POST -H "Content-Type: text/plain" --data 'U2FsdGVkX18zHjxpXH0shv9Ylvyd1FC4U6PB9jrwSw5dqQowqiMQ7FZLRhqPEEjj' "$URL?decrypt=true&encrypt=true" --output -
echo multiple commands
curl -X POST -H "Content-Type: application/json" --data '{"cmd":[{"cmd":"mul","a":1,"b":1},{"cmd":"mul","a":1,"b":2},{"cmd":"mul","a":1,"b":3},{"cmd":"mul","a":1,"b":4},{"cmd":"mul","a":1,"b":5},{"cmd":"mul","a":1,"b":6},{"cmd":"mul","a":1,"b":7},{"cmd":"mul","a":1,"b":8},{"cmd":"mul","a":2,"b":1},{"cmd":"mul","a":2,"b":2},{"cmd":"mul","a":2,"b":3},{"cmd":"mul","a":2,"b":4},{"cmd":"mul","a":2,"b":5},{"cmd":"mul","a":2,"b":6},{"cmd":"mul","a":2,"b":7},{"cmd":"mul","a":2,"b":8},{"cmd":"mul","a":3,"b":1},{"cmd":"mul","a":3,"b":2},{"cmd":"mul","a":3,"b":3},{"cmd":"mul","a":3,"b":4},{"cmd":"mul","a":3,"b":5},{"cmd":"mul","a":3,"b":6},{"cmd":"mul","a":3,"b":7},{"cmd":"mul","a":3,"b":8},{"cmd":"mul","a":4,"b":1},{"cmd":"mul","a":4,"b":2},{"cmd":"mul","a":4,"b":3},{"cmd":"mul","a":4,"b":4},{"cmd":"mul","a":4,"b":5},{"cmd":"mul","a":4,"b":6},{"cmd":"mul","a":4,"b":7},{"cmd":"mul","a":4,"b":8},{"cmd":"mul","a":5,"b":1},{"cmd":"mul","a":5,"b":2},{"cmd":"mul","a":5,"b":3},{"cmd":"mul","a":5,"b":4},{"cmd":"mul","a":5,"b":5},{"cmd":"mul","a":5,"b":6},{"cmd":"mul","a":5,"b":7},{"cmd":"mul","a":5,"b":8},{"cmd":"mul","a":6,"b":1},{"cmd":"mul","a":6,"b":2},{"cmd":"mul","a":6,"b":3},{"cmd":"mul","a":6,"b":4},{"cmd":"mul","a":6,"b":5},{"cmd":"mul","a":6,"b":6},{"cmd":"mul","a":6,"b":7},{"cmd":"mul","a":6,"b":8},{"cmd":"mul","a":7,"b":1},{"cmd":"mul","a":7,"b":2},{"cmd":"mul","a":7,"b":3},{"cmd":"mul","a":7,"b":4},{"cmd":"mul","a":7,"b":5},{"cmd":"mul","a":7,"b":6},{"cmd":"mul","a":7,"b":7},{"cmd":"mul","a":7,"b":8},{"cmd":"mul","a":8,"b":1},{"cmd":"mul","a":8,"b":2},{"cmd":"mul","a":8,"b":3},{"cmd":"mul","a":8,"b":4},{"cmd":"mul","a":8,"b":5},{"cmd":"mul","a":8,"b":6},{"cmd":"mul","a":8,"b":7},{"cmd":"mul","a":8,"b":8}]}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":[{"cmd":"mul","a":1,"b":1},{"cmd":"mul","a":1,"b":2},{"cmd":"mul","a":1,"b":3},{"cmd":"mul","a":1,"b":4},{"cmd":"mul","a":1,"b":5},{"cmd":"mul","a":1,"b":6},{"cmd":"mul","a":1,"b":7},{"cmd":"mul","a":1,"b":8},{"cmd":"mul","a":2,"b":1},{"cmd":"mul","a":2,"b":2},{"cmd":"mul","a":2,"b":3},{"cmd":"mul","a":2,"b":4},{"cmd":"mul","a":2,"b":5},{"cmd":"mul","a":2,"b":6},{"cmd":"mul","a":2,"b":7},{"cmd":"mul","a":2,"b":8},{"cmd":"mul","a":3,"b":1},{"cmd":"mul","a":3,"b":2},{"cmd":"mul","a":3,"b":3},{"cmd":"mul","a":3,"b":4},{"cmd":"mul","a":3,"b":5},{"cmd":"mul","a":3,"b":6},{"cmd":"mul","a":3,"b":7},{"cmd":"mul","a":3,"b":8},{"cmd":"mul","a":4,"b":1},{"cmd":"mul","a":4,"b":2},{"cmd":"mul","a":4,"b":3},{"cmd":"mul","a":4,"b":4},{"cmd":"mul","a":4,"b":5},{"cmd":"mul","a":4,"b":6},{"cmd":"mul","a":4,"b":7},{"cmd":"mul","a":4,"b":8},{"cmd":"mul","a":5,"b":1},{"cmd":"mul","a":5,"b":2},{"cmd":"mul","a":5,"b":3},{"cmd":"mul","a":5,"b":4},{"cmd":"mul","a":5,"b":5},{"cmd":"mul","a":5,"b":6},{"cmd":"mul","a":5,"b":7},{"cmd":"mul","a":5,"b":8},{"cmd":"mul","a":6,"b":1},{"cmd":"mul","a":6,"b":2},{"cmd":"mul","a":6,"b":3},{"cmd":"mul","a":6,"b":4},{"cmd":"mul","a":6,"b":5},{"cmd":"mul","a":6,"b":6},{"cmd":"mul","a":6,"b":7},{"cmd":"mul","a":6,"b":8},{"cmd":"mul","a":7,"b":1},{"cmd":"mul","a":7,"b":2},{"cmd":"mul","a":7,"b":3},{"cmd":"mul","a":7,"b":4},{"cmd":"mul","a":7,"b":5},{"cmd":"mul","a":7,"b":6},{"cmd":"mul","a":7,"b":7},{"cmd":"mul","a":7,"b":8},{"cmd":"mul","a":8,"b":1},{"cmd":"mul","a":8,"b":2},{"cmd":"mul","a":8,"b":3},{"cmd":"mul","a":8,"b":4},{"cmd":"mul","a":8,"b":5},{"cmd":"mul","a":8,"b":6},{"cmd":"mul","a":8,"b":7},{"cmd":"mul","a":8,"b":8}],"encrypt":true}' "$URL" --output -
