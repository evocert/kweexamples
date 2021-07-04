#!/bin/bash
curl "http://localhost:8081/kweexamples/src/api_encrypted/api/?cmd=acc" -s|xxd
