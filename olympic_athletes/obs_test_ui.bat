@echo off
cls
REM This is obs_test.bat

ECHO   ___  _ _                 _               _   _   _     _      _            
ECHO  / _ \^| (_)_ __ ___  _ __ (_) ___ ___     / \ ^| ^|_^| ^|__ ^| ^| ___^| ^|_ ___  ___ 
ECHO ^| ^| ^| ^| ^| ^| '_ ` _ \^| '_ \^| ^|/ __/ __^|   / _ \^| __^| '_ \^| ^|/ _ \ __/ _ \/ __^|
ECHO ^| ^|_^| ^| ^| ^| ^| ^| ^| ^| ^| ^|_) ^| ^| (__\__ \  / ___ \ ^|_^| ^| ^| ^| ^|  __/ ^|^|  __/\__ \
ECHO  \___/^|_^|_^|_^| ^|_^| ^|_^| .__/^|_^|\___^|___/ /_/   \_\__^|_^| ^|_^|_^|\___^|\__\___^|^|___/
ECHO                     ^|_^|                                                      
ECHO.

dotnet build
echo Starting SPA...
cd .\obs_test_ui\ClientApp
call yarn install
call yarn start  --silent
cd ..
cd ..

