@echo off
:ask
set /p INPUT=Do you want to install the modules? (Y/N)

if %INPUT% == "y" goto install
if %INPUT% == "Y" goto install
if %INPUT% == "n" goto exit
if %INPUT% == "N" goto exit

:install
npm install
echo Installation completed successfully.
pause