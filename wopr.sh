#!/bin/sh
if ps -ef | grep -v grep | grep wopr.js ; then
  exit 0
else
  cd /Users/alexander/Development/Queeg/
  /usr/local/bin/node wopr.js
  exit 0
fi
