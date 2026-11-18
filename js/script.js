let tasks = [
  { id: 1, title: 'Программирование мобильных устройств', start: '08:00', end: '09:35', room: '322', teacher: 'Смирнова Владимир Иванович', desc: 'Защитить лабораторную работу номер 2.4', done: true },
  { id: 2, title: 'Технологии программирования и создание WEB приложений', start: '09:45', end: '11:20', room: '322', teacher: 'Чесноков Сергей Евгеньевич', desc: 'Защитить практические работы 8 и 9', done: false },
  { id: 3, title: 'Современные бизнес-модели и экономический анализ', start: '11:30', end: '13:05', room: '522', teacher: 'Собоева Ирина Алексеевна', desc: 'Прикрепить презентацию на курс', done: false },
  { id: 4, title: 'Инструменты и методы моделирования бизнес-процессов', start: '13:30', end: '15:05', room: '412', teacher: 'Репина Ольга Михайловна', desc: 'Без описания', done: false }
];

let currentFilter = 'all';

const form = document.getElementById('taskForm');
const titleInput = document.getElementById('taskTitle');
const startInput = document.getElementById('taskStart');
const endInput = document.getElementById('taskEnd');
const roomInput = document.getElementById('taskRoom');
const teacherInput = document.getElementById('taskTeacher');
const descInput = document.getElementById('taskDesc');
const formError = document.getElementById('formError');

const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.btn-filter');

document.addEventListener('DOMContentLoaded', () => {
  render();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formError.textContent = '';

  const title = titleInput.value.trim();
  const start = startInput.value;
  const end = endInput.value;

  if (!title || !start || !end) {
    formError.textContent = 'Заполните обязательные поля.';
    return;
  }
  if (end <= start) {
    formError.textContent = 'Время окончания должно быть позже времени начала.';
    return;
  }

  const newTask = {
    id: Date.now(),
    title: title,
    start: start,
    end: end,
    room: roomInput.value.trim() || '—',
    teacher: teacherInput.value.trim() || '—',
    desc: descInput.value.trim() || 'Без описания',
    done: false
  };

  tasks.push(newTask);
  form.reset();
  
  const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
  modal.hide();

  render();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

function render() {
  tasks.sort((a, b) => a.start.localeCompare(b.start));

  const visibleTasks = tasks.filter(t => {
    if (currentFilter === 'upcoming') return !t.done;
    if (currentFilter === 'done') return t.done;
    return true;
  });

  const countAll = tasks.length;
  const countUpcoming = tasks.filter(t => !t.done).length;
  const countDone = tasks.filter(t => t.done).length;
  
  filterBtns[0].textContent = `Все (${countAll})`;
  filterBtns[1].textContent = `Предстоящие (${countUpcoming})`;
  filterBtns[2].textContent = `Выполненные (${countDone})`;

  taskList.querySelectorAll('.schedule-card').forEach(el => el.remove());

  if (visibleTasks.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  visibleTasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `schedule-card ${task.done ? 'done' : ''}`;

    card.innerHTML = `
      <div class="card-time">
        <span class="time-start">${task.start}</span>
        <span class="time-end">${task.end}</span>
      </div>
      
      <div class="card-info">
        <div class="card-title">${task.title}</div>
        <div class="card-desc">${task.desc}</div>
      </div>
      
      <div class="card-meta">
        <span><i class="bi bi-geo-alt me-2"></i>${task.room}</span>
        <span><i class="bi bi-person me-2"></i>${task.teacher}</span>
      </div>
      
      <div class="card-actions">
        <button class="btn-action ${task.done ? 'btn-action-done' : 'btn-action-check'}">
          ${task.done ? '<i class="bi bi-check-lg me-1"></i> Выполнено' : 'Отметить'}
        </button>
        <button class="btn-delete" title="Удалить">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    // Обработчик кнопки "Отметить / Выполнено"
    card.querySelector('.btn-action').addEventListener('click', () => toggleTask(task.id));
    
    // Обработчик кнопки удаления
    card.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));

    taskList.appendChild(card);
  });

  updateStats();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const left = total - done;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statDone').textContent = done;
  document.getElementById('statDone2').textContent = done;
  document.getElementById('statLeft').textContent = left;
  document.getElementById('statPercent').textContent = percent + '%';

  const circle = document.getElementById('progressCircle');
  circle.style.background = `conic-gradient(var(--primary) ${percent}%, #e2e8f0 ${percent}%)`;
}