# 🗂️ Floating Task Tracker

A floating Electron-based task tracker that displays active builds, tasks, and remote executions in real time. It stays on top of your desktop and updates automatically with status, timestamp, and duration. Designed for use in local or remote (e.g., ADS) environments.

---

## ✨ Features Implemented So Far

- 🪟 Floating translucent UI window with draggable top bar
- 🟢 Task statuses with colored icons (In Progress, Success, Failed)
- 🕒 Shows start time and duration of each task
- 🔄 Updates every 2 seconds by reading `tasks.json`
- 🔘 Minimize and close controls
- 📍 Appears on top-right of screen
- 🌐 Background HTTP API server (`api.js`) listens on `localhost:3333`
- 📤 `runRemote.js` script runs SSH commands on remote (e.g., ADS) and reports status to the tracker

---

## 🛠️ Prerequisites

Ensure the following are installed on your system:

| Dependency   | Version        |
|--------------|----------------|
| Node.js      | 18+ or 20+     |
| npm          | 9+             |
| SSH access   | Configured for ADS |
| Electron     | Installed via `npm install` |
| Python       | *optional* (for future scripts) |

To verify:
```bash
node -v
npm -v


Setup

cd /path/to/floating-task-tracker
npm install
npm start
node runRemote.js "Test Build" "ssh ssazeed@bgl-ads-230 'mkdir -p /nobackup/ssazeed/test && sleep 5'"
curl -X POST http://localhost:3333/track \
  -H "Content-Type: application/json" \
  -d '{"name": "Build XYZ", "status": "in-progress"}'
curl -X POST http://localhost:3333/track \
  -H "Content-Type: application/json" \
  -d '{"name": "Build XYZ", "status": "success"}'

File Structure
floating-task-tracker/
├── main.js              # Electron window config
├── api.js               # API server to receive task updates
├── runRemote.js         # Script to SSH and track command execution
├── tasks.json           # Stores live task statuses
├── package.json         # Project config and dependencies
├── README.md            # This file
└── renderer/
    ├── index.html       # UI layout and topbar
    ├── styles.css       # Styling for tasks, layout, and legend
    └── tracker.js       # Reads tasks.json and renders them
