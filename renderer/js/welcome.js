'use strict'

const DataStore = require('../DataStore')
const { ipcRenderer } = require('electron')

document.getElementById('login-form').addEventListener('submit', (evt) => {
    evt.preventDefault()

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    ipcRenderer.send('username', username)
    ipcRenderer.send('password', password)
    username.value = ''
    password.value = ''
})