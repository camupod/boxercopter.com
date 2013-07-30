#!/bin/bash

export JS_FILES="boxercopter.js \
                support.js \
                clouds.js \
                copter.js"

echo "Building boxercopter.min.js"
uglifyjs $JS_FILES -c -m -o boxercopter.min.js

echo "Building boxercopter.min.css"
cleancss boxercopter.css -e -o boxercopter.min.css
