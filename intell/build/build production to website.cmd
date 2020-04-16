@echo off

call "environment.cmd"

node "build.js" --mode "production" --output "../Website Document/static/lib"

pause