@echo off

call "environment.cmd"

"%node%" "build.js" --mode "development" --output "output/development"

pause