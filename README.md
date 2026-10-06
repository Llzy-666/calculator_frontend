# Frontend - Separation Calculator System

Frontend of the front-end and back-end separation calculator assignment. Built with native HTML, CSS and Vanilla JavaScript.

## Features

- Basic arithmetic calculation, support parentheses `()`, `+ - × ÷`
- CE (backspace) / C (clear all)
- Calculation history: pagination, keyword search, single delete, clear all
- Fetch data from backend REST API dynamically

## Project Structure

```
calculator_frontend/
├── index.html
└── script.js
```

## How to run

### Option 1: Local development

1. Open the folder in VS Code
2. Install Live Server extension
3. Right click `index.html` → Open with Live Server
4. Visit `http://127.0.0.1:5500/index.html`

### Option 2: Deploy with Flask static

Upload `index.html` and `script.js` to backend `static/` folder.
Then access `http://111.230.148.219:9000` directly from browser.

## API Config

Edit `baseUrl` in `script.js` to connect backend:

```
const baseUrl = "http://111.230.148.219:9000"
```

API endpoints:

- `POST /api/calculate` : Calculate expression and save record
- `GET /api/history` : Get paginated history with search
- `DELETE /api/history/{id}` : Delete single record
- `DELETE /api/history` : Clear all history

## Tech Stack

HTML5, CSS3, Vanilla JavaScript (Fetch API)

> 
> Backend repository: []
