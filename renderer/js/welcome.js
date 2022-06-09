'use strict'

const DataStore = require('../DataStore')
const { ipcRenderer } = require('electron')

document.getElementById('login-form').addEventListener('submit', (evt) => {
    evt.preventDefault()

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    ipcRenderer.send('login', [username], [password])
    username.value = ''
    password.value = ''
})

document.getElementById('close').addEventListener('click', (evt) => {
    evt.preventDefault()

    ipcRenderer.send('close')
})