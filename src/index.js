import './style.css';

const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#task');
const todoItemsList = document.querySelector('.todo-items');
const clearBtn = document.querySelector('.clear-all');

let tasks = [];

// show tasks into the user interface
const renderTodos = (tasks) => {
  todoItemsList.innerHTML = '';
  tasks.forEach((item) => {
    const checked = item.completed ? 'checked' : null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);

    if (item.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML = `
  <div class="task-description">
      <input type="checkbox"  ${checked} class="checkbox">
      <input type="text" class="input-description" name="${item.id}" value="${item.name}">
      <i class="fas fa-ellipsis-v"></i>
      <button class="delete-button">X</button>
   </div>
  `;
    todoItemsList.append(li);
    document.querySelector(`${item.id}`).addEventListener('input', (e) => {
      console.log(e)
      localStorage.setItem('Tasks', JSON.stringify(tasks));
      addLocal(tasks);
    });
  });
};

// Add to local storage
const addLocal = (tasks) => {
  localStorage.setItem('Tasks', JSON.stringify(tasks));
  renderTodos(tasks);
};

// Get local storage if it's any
const getLocal = () => {
  const reference = localStorage.getItem('Tasks');
  if (reference) {
    tasks = JSON.parse(reference);
    renderTodos(tasks);
  }
};

const addTodo = (task) => {
  if (task !== '') {
    const todo = {
      id: Date.now(),
      name: task,
      completed: false,
    };

    tasks.push(todo);
    addLocal(tasks);

    todoInput.value = '';
  }
};

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo(todoInput.value);
});

// delete
const toggle = (id) => {
  tasks.forEach((item) => {
    if (item.id.toString() ===id) {
      item.completed = !item.completed;
    }
  });
  addLocal(tasks);
};

const deleteTodo = (id) => {
  tasks = tasks.filter((item) => item.id.toString() !== id);
  addLocal(tasks);
};


todoItemsList.addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    toggle(e.target.parentElement.parentElement.getAttribute('data-key'));
  }
  if (e.target.classList.contains('delete-button')) {
    deleteTodo(e.target.parentElement.parentElement.getAttribute('data-key'));
  }
});

// load page

window.addEventListener('load', () => {
  getLocal();
});


