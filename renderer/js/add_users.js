'use strict'
const { ipcRenderer } = require('electron')

document.getElementById('newUserForm').addEventListener('submit', (evt) => {
    // prevent default refresh functionality of forms
    evt.preventDefault()
    let username = document.getElementById('username').value
    let fullname = document.getElementById('fullname').value
    let password = document.getElementById('password').value
    let root = document.getElementById('root').value
    ipcRenderer.send('newUser', [username], [fullname], [password], [root])
    username.value = ''
    fullname.value = ''
    password.value = ''
    root.value = ''
})