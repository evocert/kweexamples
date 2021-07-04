#!/bin/bash
curl "http://localhost:8081/kweexamples/src/api_encrypted/api/?cmd=bmp&encrypt=true" -s|xxd|head
curl "http://localhost:8081/kweexamples/src/api_encrypted/api/?cmd=bmp&encrypt=false&ftm=bin" -s|xxd|head
curl "http://localhost:8081/kweexamples/src/api_encrypted/api/?cmd=bmp&encrypt=false&fmt=hex" -s|xxd|head
