@echo off
echo Starting MediscanAI...

:: Start Backend
start "MediscanAI Backend" cmd /k "cd web/Backend && npm run dev"

:: Start Frontend
start "MediscanAI Frontend" cmd /k "cd web/Frontend && npm run dev"

echo Servers starting in new windows...
