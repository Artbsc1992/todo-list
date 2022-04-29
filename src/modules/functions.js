import updateLocal from './updateLocal.js';

import addTodo from './addTodo.js';

const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#task');
const todoItemsList = document.querySelector('.todo-items');
const clearBtn = document.querySelector('.clear-all');

let tasks = [];

// show tasks into the user interface
const renderTodos = (tasks) => {
  todoItemsList.innerHTML = '';
  tasks.forEach((item) => {
    let mouseOver = false;
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
      <input type="text" class="input-description" id="${item.id}" value="${item.name}">
      <i class="fas fa-ellipsis-v dots"></i>
      <button class="delete-button">X</button>
   </div>
  `;
    todoItemsList.append(li);
    const input = li.children[0].children[1];
    updateLocal(input, tasks, item);
    const dltBtn = input.parentElement.querySelector('.delete-button');
    const dots = input.parentElement.querySelector('.dots');
    input.addEventListener('focus', () => {
      dltBtn.classList.add('active');
      dots.classList.add('active');
    });

    input.addEventListener('focusout', () => {
      if (mouseOver) return;
      dltBtn.classList.remove('active');
      dots.classList.remove('active');
    });

    dltBtn.addEventListener('mouseover', () => {
      mouseOver = true;
    });

    dltBtn.addEventListener('mouseout', () => {
      mouseOver = false;
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

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addTodo(todoInput, addLocal, tasks);
});

// delete
const toggle = (id) => {
  tasks.forEach((item) => {
    if (item.id.toString() === id) {
      item.completed = !item.completed;
    }
  });
  addLocal(tasks);
};

const deleteTodo = (id) => {
  tasks = tasks.filter((item) => item.id.toString() !== id);
  addLocal(tasks);
};

clearBtn.addEventListener('click', () => {
  tasks = tasks.filter((item) => item.completed === false);
  addLocal(tasks);
});

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