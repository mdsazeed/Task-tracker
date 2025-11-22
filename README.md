# 🧭 Floating Task Tracker

A lightweight floating task status dashboard built with **Electron**, designed to track and display the live status of commands run remotely from an **ADS server**. It enables developers to monitor builds, test runs, or automation jobs with minimal distraction.

<img width="561" height="358" alt="Screenshot 2025-11-22 145509" src="https://github.com/user-attachments/assets/d0cf2dba-3219-44d3-88f4-50c062c80dd5" />

---

## 📐 Architecture Overview

The project follows a **client-server** model:

```
          [ ADS Server ]                        [ Local Developer Machine ]
      ┌────────────────────┐                 ┌────────────────────────────┐
      │ trackrun (CLI)     │── POST /track → │ Electron Task UI (Client)  │
      │                    │                 │ Live status updates        │
      │ API Server (4444)  │← GET /tasks.json┤ from ADS via HTTP          │
      └────────────────────┘                 └────────────────────────────┘
```

---

## 📦 Prerequisites

### Server (ADS):

* Node.js >= 12.x
* `npm`

### Client (Local):

* Node.js >= 18.x
* Electron via `npm`

---

## 📁 Directory Structure

```
task-tracker/
├── api.js                 # Backend API (on ADS)
├── tasks.json             # Stores current tasks
├── trackrun.sh            # Shell function to track commands
├── renderer/              # Frontend UI shared across both ends
│   ├── index.html
│   └── tracker.js
├── main.js                # Electron app (on Local)
├── preload.js             # Preload for IPC (Local)
├── package.json
└── README.md
```

---

## 🚀 Setup Instructions

### 🔧 Server (ADS)

```bash
# Install dependencies
npm install

# Start the API and renderer
npm start
```

This runs:

* `api.js` on [http://localhost:4444](http://localhost:4444)
* Static UI server on [http://localhost:4445](http://localhost:4445)

#### ✏️ Add `trackrun` to your shell

In `.bashrc` or `.zshrc`:

```bash
trackrun() {
  taskname="$1"
  shift
  start=$(date +%s)
  "$@" && status="success" || status="failed"
  end=$(date +%s)
  curl -s -X POST http://localhost:4444/track \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$taskname\",\"status\":\"$status\"}" > /dev/null
}
```

Then reload:

```bash
source ~/.bashrc
```

#### ✅ Usage:

```bash
trackrun build ./build.sh
trackrun ping-test ping -c 3 google.com
```

---

### 🖥️ Client (Local Electron)

```bash
# Clone and install
npm install

# Start the Electron app
npm start
```

The app opens as a **floating, always-on-top window** on the top-right corner of your screen.

---

## 🎨 UI Features

* 🟡 In Progress
* 🟢 Success
* 🔴 Failed

Each task shows:

* Name
* Start Time
* Duration
* Status (color coded)

It auto-refreshes every 2 seconds to show the latest task list.

---

## 💡 Why This Exists

Often, you trigger a long-running job on a remote server and forget its status.
This tool shows those task results **live** in your peripheral vision without tab switching or terminal monitoring.

---

## 🛠️ Possible Enhancements

* Scrollable log per task
* Configurable polling interval
* Notification alerts on failure
* WebSocket integration for push

---

## 👤 Author

**Md Sazeed**
Inspired by the constant struggle of keeping track of my ongoing terminal tasks — builds, test runs, or script executions — which I often left running in the background only to forget their status or outcome. This tool was born out of the need for a lightweight, persistent tracker that stays visible and reminds me exactly where I left off, without interrupting my workflow.
Created with ❤️ in 2025.

---

## 📸 Screenshot

*Add a screenshot of the UI here for visual reference*

---

## 📄 License

MIT
