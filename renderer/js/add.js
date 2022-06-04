'use strict'
const { ipcRenderer } = require('electron')

document.getElementById('todoForm').addEventListener('submit', (evt) => {
    // prevent default refresh functionality of forms
    evt.preventDefault()
    let cash = document.getElementById("cash").value;
    ipcRenderer.send('cash', cash)
    cash.value = ''
})