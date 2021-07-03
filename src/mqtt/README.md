KWE `mqtt` getting started template. Copy this into your public web directory and visit the index page.

Make sure you have an `mqtt` server running, `./src/mosquitto.sh` is provided in order to do that. Various other scripts are also provided for testing as well as a front-end page `./src/index.html`.


Prerequisites: `curl`, `bash/cmd`, `mosquitto`

Instructions:
	* deploy to `/mqtt`
	* kwe server assumed `localhost:8081`
	* mosquitto server assumed at `locahost:1883`, you can start mosquitto server with `mosquitto.[sh|bat]`
	* run `test[bat|sh]`

Alternatively invoke manual scripts for testing

```
connect.[bat|sh]
subscribe.[bat|sh]
monitor.[bat|sh]
publish.[bat|sh]
unmonitor.[bat|sh]
unsubscribe.[bat|sh]
disconnect.[bat|sh]
```

Observe logs, subscription hanlers in `./hdl/*.js` should invoke logging to server console to indicate their execution.
