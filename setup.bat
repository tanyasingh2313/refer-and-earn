@echo off
REM Create folders
mkdir config
mkdir controllers
mkdir middlewares
mkdir modules
mkdir public\css
mkdir public\images
mkdir public\js
mkdir routes
mkdir utils
mkdir views

REM Create empty files
type nul > .env
type nul > .env.example
type nul > .gitignore
