import './style.css';

const list = document.querySelector('ul');

const taskList = [
  {
    description: 'Make breakfast',
    completed: false,
    index: 1,
  },
  {
    description: 'Do laundry',
    completed: false,
    index: 2,
  },
  {
    description: 'Walk the dog',
    completed: false,
    index: 3,
  },
];

const addTask = (task) => `
   <li> 
   <div class="task-description">
   <input type="checkbox" class="checkbox">
   <input type="text" readonly class="input-descrption" value="${task.description}">
   <i class="fas fa-ellipsis-v"></i>
   </div>
   </li>
  `;

const iterate = () => {
  list.innerHTML = taskList.map(addTask).join('');
};

iterate();
