export default (todoInput, addLocal, tasks) => {
  if (todoInput.value !== '') {
    const todo = {
      id: Date.now(),
      name: todoInput.value,
      completed: false,
    };

    tasks.push(todo);
    addLocal(tasks);

    todoInput.value = '';
  }
};