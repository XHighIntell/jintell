@echo off

call "environment.cmd"

"%node%" "build.js" --mode "production" --output "output/production"

pause