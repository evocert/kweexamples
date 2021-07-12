Demonstration of creating a basic API using the KWE server.

Sample usage:

```
http://localhost:8081/kweexamples/src/api_basic/api/?cmd=add&a=4&b=2
http://localhost:8081/kweexamples/src/api_basic/api/?cmd=sub&a=4&b=2
http://localhost:8081/kweexamples/src/api_basic/api/?cmd=mul&a=4&b=2
http://localhost:8081/kweexamples/src/api_basic/api/?cmd=div&a=4&b=2
```

`JSON` and `XML` bodies are also accepted and may be mixed with query parameters.


Rudimentary xml parsing is provided via <a href="https://github.com/ershov-konst/dom-parser" target="_blank">ershov-konst/dom-parser</a>.

The main entry point is `./api/index.js`. `cmd` contains builtin api commands. If the api command requested is not found in `cmd, an attempt is made to load it from `./api/cmd`.

Command files may respond directly or return a value. If the value is not of type `object` it will respond with `text/plain` and the return value in the response body, otherwise `application/json` with the serialized object in the response body. If the parameter `outfmt` is set to `xml`, if the return value was an object, it will respond with `application/xml` and the object serialized as `xml` in the response body.

`./api/config.js` specifies configuration settings for `./api/index.js`. 

* `enabled` can be used to enable or disable the api
* `cmdpath` specifies the path prefix to add to commands
* `preprocessor` specifies a path/paths to modules or inline functions to be executed prior to command  module execution. Parameters populated include the parameters passed in the api invocation. Returning `false` explicitly will result in normal execution of the api after that point to stop. Throwing an exception will halt normal execution and result in the main error handling of `./api/index.js` to be executed.
* `postprocessor` specifies a path/paths to modules or inline functions to be executed after command module execution. Parameters populated include the parameters passed in the api invocation as well as the return value of the command module call. Returning `false` explicitly will result in normal execution of the api after that point to stop. Throwing an exception will halt normal execution and result in the main error handling of `./api/index.js` to be executed.

Other key value pairs may be populated in `./api/config.js` and can be used in a custom fashion in the `preprocessor`, `command`, and `postprocessor` modules.

Example usages of `preprocessor` and `postprocessor` modules include logging, decryption, encryption, redirection, etc. The `preprocessor` and `postprocessor` stack is executed in the order specified in the `./api/config.js` module. Example encryptor and decryptor `preprocessor` and `postprocessor` modules are provided, which are actuated upon receiving parameter `encrypt=true` and `decrypt=true`

A test script `./test.sh` is provided illustrating basic endpoint invocation.

Live example available <a href="http://skullquake.dedicated.co.za/kweexamples/src/api_basic/api/" target="_blank">here</a>
