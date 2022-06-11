'use strict'
const { ipcRenderer } = require('electron')
let root

document.getElementById('newUserForm').addEventListener('submit', (evt) => {
    // prevent default refresh functionality of forms
    evt.preventDefault()
    let username = document.getElementById('username').value
    let fullname = document.getElementById('fullname').value
    let password = document.getElementById('password').value
    let radioBtn = document.getElementById('root').value
    if (radioBtn == 'on') {
        root = true
        ipcRenderer.send('newUser', [username], [fullname], [password], [root])
    } else {
        root = false
        ipcRenderer.send('newUser', [username], [fullname], [password], [root])
    }
    username.value = ''
    fullname.value = ''
    password.value = ''
    radioBtn.value = ''
})