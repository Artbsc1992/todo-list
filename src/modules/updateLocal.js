export default (input, tasks, item) => {
  input.addEventListener('input', () => {
    tasks.forEach((task) => {
      if (task.id === item.id) {
        task.name = input.value;
      }
    });
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  });
};