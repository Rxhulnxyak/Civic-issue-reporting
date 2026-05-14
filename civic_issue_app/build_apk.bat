@echo off
echo Building जनसेतु Flutter App APK...
echo.

echo Step 1: Cleaning previous builds...
flutter clean
echo.

echo Step 2: Getting dependencies...
flutter pub get
echo.

echo Step 3: Building release APK...
flutter build apk --release
echo.

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ APK built successfully!
    echo 📱 APK location: build\app\outputs\flutter-apk\app-release.apk
    echo.
    echo You can now install this APK on your Android device.
) else (
    echo.
    echo ❌ Build failed! Please check the error messages above.
    echo.
)

pause
