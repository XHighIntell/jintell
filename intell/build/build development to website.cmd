@echo off

call "environment.cmd"

"%node%" "build.js" --mode "development" --output "../Website Document/static/lib"

pause