'use strict'

const { ipcRenderer } = require('electron')
let now = new Date();

ipcRenderer.on('username', (e, username) => {
        const p_user = document.getElementById('user')
        p_user.innerHTML = `<p>Пользователь: ${username}</p>`;
        alert('Привет ' + username + ", приятной работы!");
    })
    // delete todo by its text value ( used below in event listener)
const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent)
}

// create add todo window button
document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window')
})

//Buttons
// on receive todos
ipcRenderer.on('todos', (event, todos) => {
    // get the todoList ul
    const todoList = document.getElementById('todoList')

    // create html string
    const todoItems = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`

        return html
    }, '')

    // set list html to the todo items
    todoList.innerHTML = todoItems

    // add click handlers to delete the clicked todo
    todoList.querySelectorAll('.todo-item').forEach(item => {
        //item.addEventListener('click', deleteTodo)
    })
})

document.getElementById('info').addEventListener('click', () => {
    ipcRenderer.send('info')
})

document.getElementById('exit').addEventListener('click', (evt) => {
    evt.preventDefault()
    ipcRenderer.send('exit')
})