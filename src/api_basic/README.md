# BASIC API EXAMPLE

Demonstration of creating a basic API using the KWE server.

Sample usage:

```
http://localhost:8081/kweexamples/api_basic/api/?cmd=add&a=4&b=2
http://localhost:8081/kweexamples/api_basic/api/?cmd=sub&a=4&b=2
http://localhost:8081/kweexamples/api_basic/api/?cmd=mul&a=4&b=2
http://localhost:8081/kweexamples/api_basic/api/?cmd=div&a=4&b=2
```

The main entry point is `./api/index.js`. Here we have an object `cmd` containing internal command functions. Parameters are parsed, `cmd` is searched
for the specified command, and invoked with the rest of the url parameters applied as an object argument first parameter. If the command is not found,
an attempt is made to load in the command frim `./api/cmd`
