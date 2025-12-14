@echo off
echo ========================================
echo Aim Tracker - Flutter Build Script
echo ========================================
echo.

REM Check if Flutter is installed
where flutter >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Flutter is not installed or not in PATH
    echo Please install Flutter first. See INSTALLATION_GUIDE.md
    echo.
    pause
    exit /b 1
)

echo [1/5] Checking Flutter installation...
flutter --version
echo.

echo [2/5] Getting dependencies...
flutter pub get
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to get dependencies
    pause
    exit /b 1
)
echo.

echo [3/5] Checking for connected devices...
flutter devices
echo.

echo [4/5] Running Flutter doctor...
flutter doctor
echo.

echo ========================================
echo Choose an option:
echo 1. Test app locally (flutter run)
echo 2. Build release APK
echo 3. Build debug APK
echo 4. Exit
echo ========================================
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Starting app in debug mode...
    flutter run
) else if "%choice%"=="2" (
    echo.
    echo [5/5] Building release APK...
    flutter build apk --release
    echo.
    echo ========================================
    echo SUCCESS! APK built successfully!
    echo Location: build\app\outputs\flutter-apk\app-release.apk
    echo ========================================
) else if "%choice%"=="3" (
    echo.
    echo [5/5] Building debug APK...
    flutter build apk --debug
    echo.
    echo ========================================
    echo SUCCESS! Debug APK built successfully!
    echo Location: build\app\outputs\flutter-apk\app-debug.apk
    echo ========================================
) else (
    echo Exiting...
    exit /b 0
)

echo.
pause
