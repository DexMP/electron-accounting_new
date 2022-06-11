'use strict'

const { ipcRenderer } = require('electron')
const { indexOf, lastIndexOf } = require('lodash')
const admin_panel = document.getElementById('admin_panel')
const cash_data = document.getElementById('cash_data')

//Buttons
// on receive todos
ipcRenderer.on('cash', (event, cash) => {
    cash_data.style.display = 'block'
    admin_panel.style.display = 'none'
        // get the todoList ul
    const todoList = document.getElementById('todoList')
    todoList.innerHTML += `<li class="todo-item">${cash}</li>`
})

ipcRenderer.on('username', (e, username) => {
    const p_user = document.getElementById('user')
    p_user.innerHTML = `<p>Пользователь: ${username}</p>`
    alert('Привет ' + username + ", приятной работы!")
})

document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window')
})

// Admin panel

ipcRenderer.on('userdata', (e, userdata, fullname) => {
    admin_panel.style.display = 'block'
    cash_data.style.display = 'none'
    const userList = document.getElementById('userList')
    userList.innerHTML += `<li class="todo-item">Логин: ${userdata}<br>Имя: ${fullname}</li>`

    userList.querySelectorAll('.todo-item').forEach((item, index, parametr) => {
        item.addEventListener('click', (evt) => {
            evt.preventDefault()
            item.remove()
            ipcRenderer.send('delete', index)
        })
    })

})

document.getElementById('createUsersBtn').addEventListener('click', (evt) => {
    evt.preventDefault()
    ipcRenderer.send('add-user')
})

// exit buttons

document.getElementById('exit').addEventListener('click', (evt) => {
    evt.preventDefault()
    ipcRenderer.send('close')
})

document.getElementById('close').addEventListener('click', (evt) => {
    evt.preventDefault()
    ipcRenderer.send('close')
})