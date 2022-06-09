'use strict'

const { ipcRenderer } = require('electron')


ipcRenderer.on('users', (event, users) => {
    const usersList = document.getElementById('users_list')

    const usersItems = users.reduce((html, user) => {
        html += `<li class="users-item">${user}</li>`

        return html
    }, '')

    usersList.innerHTML = usersItems

    usersList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', (evt) => {})
    })
})


document.getElementById('exit').addEventListener('click', (evt) => {
    evt.preventDefault()
    ipcRenderer.send('close')
})