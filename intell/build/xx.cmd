@echo off

echo %cd%

set /p input="Do you want to copy to website? (Y/N): "


IF "%input%" == "Y" (
	echo may chon Y
) ELSE (
	exit
)

pause