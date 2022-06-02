'use strict'

const DataStore = require('../DataStore')
const { ipcRenderer } = require('electron')

document.getElementById('login-form').addEventListener('submit', (evt) => {
    evt.preventDefault()

    const username = evt.currentTarget.username.value
    const password = evt.currentTarget.password.value
    ipcRenderer.send('auth', (username, password))
    username.value = ''
    password.value = ''
})