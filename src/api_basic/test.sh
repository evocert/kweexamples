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
curl -X POST -H "Content-Type: text/plain" --data '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' "$URL?decrypt=true" --output -
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
curl -X POST -H "Content-Type: text/plain" --data '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' "$URL?decrypt=true" --output -
echo multiple commands
curl -X POST -H "Content-Type: application/json" --data '{"cmd":[{"cmd":"mul","a":1,"b":1},{"cmd":"mul","a":1,"b":2},{"cmd":"mul","a":1,"b":3},{"cmd":"mul","a":1,"b":4},{"cmd":"mul","a":1,"b":5},{"cmd":"mul","a":1,"b":6},{"cmd":"mul","a":1,"b":7},{"cmd":"mul","a":1,"b":8},{"cmd":"mul","a":2,"b":1},{"cmd":"mul","a":2,"b":2},{"cmd":"mul","a":2,"b":3},{"cmd":"mul","a":2,"b":4},{"cmd":"mul","a":2,"b":5},{"cmd":"mul","a":2,"b":6},{"cmd":"mul","a":2,"b":7},{"cmd":"mul","a":2,"b":8},{"cmd":"mul","a":3,"b":1},{"cmd":"mul","a":3,"b":2},{"cmd":"mul","a":3,"b":3},{"cmd":"mul","a":3,"b":4},{"cmd":"mul","a":3,"b":5},{"cmd":"mul","a":3,"b":6},{"cmd":"mul","a":3,"b":7},{"cmd":"mul","a":3,"b":8},{"cmd":"mul","a":4,"b":1},{"cmd":"mul","a":4,"b":2},{"cmd":"mul","a":4,"b":3},{"cmd":"mul","a":4,"b":4},{"cmd":"mul","a":4,"b":5},{"cmd":"mul","a":4,"b":6},{"cmd":"mul","a":4,"b":7},{"cmd":"mul","a":4,"b":8},{"cmd":"mul","a":5,"b":1},{"cmd":"mul","a":5,"b":2},{"cmd":"mul","a":5,"b":3},{"cmd":"mul","a":5,"b":4},{"cmd":"mul","a":5,"b":5},{"cmd":"mul","a":5,"b":6},{"cmd":"mul","a":5,"b":7},{"cmd":"mul","a":5,"b":8},{"cmd":"mul","a":6,"b":1},{"cmd":"mul","a":6,"b":2},{"cmd":"mul","a":6,"b":3},{"cmd":"mul","a":6,"b":4},{"cmd":"mul","a":6,"b":5},{"cmd":"mul","a":6,"b":6},{"cmd":"mul","a":6,"b":7},{"cmd":"mul","a":6,"b":8},{"cmd":"mul","a":7,"b":1},{"cmd":"mul","a":7,"b":2},{"cmd":"mul","a":7,"b":3},{"cmd":"mul","a":7,"b":4},{"cmd":"mul","a":7,"b":5},{"cmd":"mul","a":7,"b":6},{"cmd":"mul","a":7,"b":7},{"cmd":"mul","a":7,"b":8},{"cmd":"mul","a":8,"b":1},{"cmd":"mul","a":8,"b":2},{"cmd":"mul","a":8,"b":3},{"cmd":"mul","a":8,"b":4},{"cmd":"mul","a":8,"b":5},{"cmd":"mul","a":8,"b":6},{"cmd":"mul","a":8,"b":7},{"cmd":"mul","a":8,"b":8}]}' "$URL" --output -
curl -X POST -H "Content-Type: application/json" --data '{"cmd":[{"cmd":"mul","a":1,"b":1},{"cmd":"mul","a":1,"b":2},{"cmd":"mul","a":1,"b":3},{"cmd":"mul","a":1,"b":4},{"cmd":"mul","a":1,"b":5},{"cmd":"mul","a":1,"b":6},{"cmd":"mul","a":1,"b":7},{"cmd":"mul","a":1,"b":8},{"cmd":"mul","a":2,"b":1},{"cmd":"mul","a":2,"b":2},{"cmd":"mul","a":2,"b":3},{"cmd":"mul","a":2,"b":4},{"cmd":"mul","a":2,"b":5},{"cmd":"mul","a":2,"b":6},{"cmd":"mul","a":2,"b":7},{"cmd":"mul","a":2,"b":8},{"cmd":"mul","a":3,"b":1},{"cmd":"mul","a":3,"b":2},{"cmd":"mul","a":3,"b":3},{"cmd":"mul","a":3,"b":4},{"cmd":"mul","a":3,"b":5},{"cmd":"mul","a":3,"b":6},{"cmd":"mul","a":3,"b":7},{"cmd":"mul","a":3,"b":8},{"cmd":"mul","a":4,"b":1},{"cmd":"mul","a":4,"b":2},{"cmd":"mul","a":4,"b":3},{"cmd":"mul","a":4,"b":4},{"cmd":"mul","a":4,"b":5},{"cmd":"mul","a":4,"b":6},{"cmd":"mul","a":4,"b":7},{"cmd":"mul","a":4,"b":8},{"cmd":"mul","a":5,"b":1},{"cmd":"mul","a":5,"b":2},{"cmd":"mul","a":5,"b":3},{"cmd":"mul","a":5,"b":4},{"cmd":"mul","a":5,"b":5},{"cmd":"mul","a":5,"b":6},{"cmd":"mul","a":5,"b":7},{"cmd":"mul","a":5,"b":8},{"cmd":"mul","a":6,"b":1},{"cmd":"mul","a":6,"b":2},{"cmd":"mul","a":6,"b":3},{"cmd":"mul","a":6,"b":4},{"cmd":"mul","a":6,"b":5},{"cmd":"mul","a":6,"b":6},{"cmd":"mul","a":6,"b":7},{"cmd":"mul","a":6,"b":8},{"cmd":"mul","a":7,"b":1},{"cmd":"mul","a":7,"b":2},{"cmd":"mul","a":7,"b":3},{"cmd":"mul","a":7,"b":4},{"cmd":"mul","a":7,"b":5},{"cmd":"mul","a":7,"b":6},{"cmd":"mul","a":7,"b":7},{"cmd":"mul","a":7,"b":8},{"cmd":"mul","a":8,"b":1},{"cmd":"mul","a":8,"b":2},{"cmd":"mul","a":8,"b":3},{"cmd":"mul","a":8,"b":4},{"cmd":"mul","a":8,"b":5},{"cmd":"mul","a":8,"b":6},{"cmd":"mul","a":8,"b":7},{"cmd":"mul","a":8,"b":8}],"encrypt":true}' "$URL" --output -
