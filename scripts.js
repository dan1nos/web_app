// Elementi DOM
const taskForm = document.getElementById('task-form');
const tasks = [];
const calendarEl = document.getElementById('calendar');

// Aggiungere una nuova attività
function addTask(event) {
    event.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskType = document.getElementById('task-type').value;
    const taskDate = document.getElementById('task-date').value;
    const taskEmail = document.getElementById('task-email').value;

    if (!taskName || !taskType || !taskDate || !taskEmail) {
        alert('Per favore, compila tutti i campi richiesti.');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        type: taskType,
        date: taskDate,
        email: taskEmail,
    };

    tasks.push(task);
    saveTasks();
    renderCalendarEvents();
    sendEmailReminder(task);

    alert('Intervento aggiunto con successo e promemoria inviato!');
    taskForm.reset();
}

// Salvare le attività
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Caricare le attività
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => tasks.push(task));
    renderCalendarEvents();
}

// Inviare un promemoria via email
function sendEmailReminder(task) {
    emailjs.send("service_id", "template_id", {
        task_name: task.name,
        task_type: task.type,
        task_date: task.date,
        user_email: task.email,
    }).then(
        () => console.log("Promemoria inviato con successo!"),
        (error) => console.error("Errore nell'invio dell'email:", error)
    );
}

// Mostrare gli eventi nel calendario
function renderCalendarEvents() {
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        events: tasks.map((task) => ({
            id: task.id,
            title: `${task.name} - ${task.type}`,
            start: task.date,
        })),
    });
    calendar.render();
}

// Inizializzazione
loadTasks();
taskForm.addEventListener("submit", addTask);
