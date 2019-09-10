@echo off

SET NODE_PATH=%userprofile%\AppData\Roaming\npm\node_modules;C:\Users\X High Intell\AppData\Roaming\npm\node_modules\gulp\node_modules
SET GULP_PATH=%userprofile%\AppData\Roaming\npm\node_modules\gulp\bin\gulp.js

::node "%GULP_PATH%" --gulpfile "gulpfile.js" development --output "../output"

node "build.js" --mode "development" --output "../output/development"


pause