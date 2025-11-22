// tracker.js

async function renderTasks() {
  try {
    const response = await fetch('http://bgl-ads-230:4444/tasks.json');
    const tasks = await response.json();

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const div = document.createElement('div');
      div.className = `task ${task.status}`;

      const time = task.startedAt ? formatTime(task.startedAt) : '';
      const duration = task.duration ? ` (${task.duration})` : '';

      div.innerHTML = `${getIcon(task.status)} ${task.name} - ${time}${duration}`;
      taskList.appendChild(div);
    });
  } catch (err) {
    console.error('Failed to load tasks.json:', err);
  }
}

function getIcon(status) {
  if (status === 'success') return '🟢';
  if (status === 'failed') return '🔴';
  return '🟡';
}

function formatTime(iso) {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

renderTasks();
setInterval(renderTasks, 2000);
