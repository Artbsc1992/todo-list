
const { addLocal, addTodo } = require('../__tests__/functions.js');

const task = {
  value : 'string',
};

const id = Date.now();
const testObject = {
    id: id,
    name: 'string',
    completed: false,
  };

let tasks = [];

describe('Add items', ()=>{
    addTodo(task, addLocal,tasks, id);

    test('Add to task',()=>{
        expect(testObject).toStrictEqual(tasks[0]);
    })

    test('Add to Local',()=>{
        expect(localStorage.setItem).toHaveBeenLastCalledWith('Tasks', JSON.stringify(tasks));
        expect(localStorage.__STORE__["Tasks"]).toBe(JSON.stringify(tasks));
    })
})