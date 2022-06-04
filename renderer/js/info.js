'use strict'
const { ipcRenderer } = require('electron')

document.getElementById('btn_delete_trnsaction').addEventListener('click', (evt) => {
    // prevent default refresh functionality of forms
    evt.preventDefault()
    ipcRenderer.send('delete_transaction')
})