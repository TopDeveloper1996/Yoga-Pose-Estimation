@echo off
REM Define the destination path
set "DESTINATION_PATH=C:\nginx-1.27.2\html"
set "NGINX_PATH=C:\nginx-1.27.2"  REM Update this path as needed

REM Build the React project
echo Building the React project...
call npm run build

REM Check if the build was successful
if %errorlevel% neq 0 (
    echo Build failed. Exiting...
    exit /b %errorlevel%
)

REM Create destination directory if it does not exist
if not exist "%DESTINATION_PATH%" (
    echo Destination directory does not exist. Creating directory...
    mkdir "%DESTINATION_PATH%"
)

REM Copy build files to the destination directory
echo Copying build files to the destination directory...
xcopy "build" "%DESTINATION_PATH%" /E /I /Y

REM Check if xcopy was successful
if %errorlevel% neq 0 (
    echo Copy failed. Exiting...
    exit /b %errorlevel%
)

REM Navigate to the Nginx directory
cd /d "%NGINX_PATH%"

REM Stop any running Nginx instance
echo Stopping any running Nginx instance...
nginx -s stop

REM Wait for a moment to ensure Nginx stops
timeout /t 2 > nul

REM Start Nginx fresh
echo Starting Nginx...
start "" nginx
if %errorlevel% neq 0 (
    echo Failed to start Nginx. Please check the Nginx configuration or permissions.
    exit /b %errorlevel%
)

echo Build, copy, and Nginx restart process completed successfully.
pause