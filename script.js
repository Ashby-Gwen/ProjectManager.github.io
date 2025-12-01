// STATIC TASK DATA (NO DATABASE)
const tasks = [
    { id: 1, title: "Design UI Layout", completed: false, deadline: "2025-02-15" },
    { id: 2, title: "Write System Documentation", completed: true, deadline: "2025-02-12" },
    { id: 3, title: "Create Task Checklist Module", completed: false, deadline: "2025-02-20" },
    { id: 4, title: "Finalize GitHub Deployment", completed: false, deadline: "2025-02-25" }
];

// LOAD TASKS
function loadTasks() {
    const container = document.getElementById("task-container");
    if (!container) return;
    
    container.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task-item");

        if (task.completed) div.classList.add("completed");

        div.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${task.id})">
            <span>${task.title}</span>
        `;

        container.appendChild(div);
    });
}

// CHECK/UNCHECK TASK (Crossout + Gray)
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    loadTasks();  // re-render
}

// UPCOMING DEADLINES
function loadDeadlines() {
    const list = document.getElementById("deadline-list");
    if (!list) return;

    list.innerHTML = "";

    const now = new Date();
    const upcoming = tasks.filter(t => new Date(t.deadline) >= now);

    upcoming.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    upcoming.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.title} — Due: ${task.deadline}`;
        list.appendChild(li);
    });
}

// INITIAL LOAD
window.onload = () => {
    loadTasks();
    loadDeadlines();
};
