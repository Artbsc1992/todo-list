const addLocal = (tasks) => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
    return tasks;
  };

const addTodo = (todoInput, addLocal, tasks, id=Date.now() ) => {
    if (todoInput.value !== '') {
      const todo = {
        id: id,
        name: todoInput.value,
        completed: false,
      };
  
      tasks.push(todo);
      addLocal(tasks);
  
      todoInput.value = '';
    }
};

module.exports = { addLocal, addTodo };