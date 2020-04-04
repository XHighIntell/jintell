@echo off

:: 1. find node.exe
:: 2. set NODE_PATH

:: --1--
set nodes[0]=C:\Program Files\nodejs\node.exe
set nodes[1]=C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Microsoft\VisualStudio\NodeJs\node.exe
set nodes[2]=C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\Microsoft\VisualStudio\NodeJs\node.exe


for /F "tokens=2 delims==" %%s in ('set nodes[') do (
	if exist %%s (
		SET node=%%s
		goto FoundNodeJs
	)
)
:FoundNodeJs

IF NOT DEFINED node (
	echo "can't find node.exe"
	pause
	exit
)

:: --2--
set "NODE_PATH=C:\node_modules"






