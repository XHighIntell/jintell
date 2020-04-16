@echo off

:: This batch will find node.exe and add its path to "path" environment
:: Add "C:\node_modules" to "NODE_PATH" environment

:: 1. find node.exe
:: 2. add NODE_PATH

:: --1--
where /q node

IF %ERRORLEVEL% EQU 0 (
    goto FoundNodeJs
) ELSE (
    set "nodes[0]=C:\Program Files\nodejs"
    set "nodes[1]=C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Microsoft\VisualStudio\NodeJs"
    set "nodes[2]=C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\Microsoft\VisualStudio\NodeJs"

    
    for /F "tokens=2 delims==" %%s in ('set nodes[') do (
	    if exist %%s\node.exe (
		    SET "path=%path%;%%s"
		    goto FoundNodeJs
	    )
    )

    echo "can't find node.exe"
    pause
    exit
)

:FoundNodeJs
:: --2--
set NODE_PATH=%NODE_PATH%;C:\node_modules