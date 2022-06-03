'use strict'

const path = require('path')
const { app, ipcMain, ipcRenderer, remote } = require('electron')
const mysql = require('mysql')

const Window = require('./Window')
const DataStore = require('./DataStore')
const query = require('esquery')

let name

const connection = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11496402',
    password: 'ZwM8Cz2kva',
    database: 'sql11496402',
    port: 3306
});

const getRanHex = size => {
    let result = [];
    let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    for (let n = 0; n < size; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
}

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('DataBase is OK');
    }
})

require('electron-reload')(__dirname)

// create a new todo store name "Todos Main"
const todosData = new DataStore({ name: 'Todos Main' })

function main() {
    // todo list window
    let mainWindow = new Window({
        file: path.join('renderer', 'index.html')
    })
    mainWindow.hide()

    let authWindow = new Window({
        file: path.join('renderer', 'welcome.html'),
        width: 500,
        height: 500,
        // close with the main window
        modal: true,
        show: false,
        frame: false,
        parent: mainWindow
    })

    // add todo window
    let addTodoWin

    // TODO: put these events into their own file

    // initialize with todos
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todos', todosData.todos)
    })

    // create add todo window
    ipcMain.on('add-todo-window', () => {
        // if addTodoWin does not already exist
        if (!addTodoWin) {
            // create a new add todo window
            addTodoWin = new Window({
                file: path.join('renderer', 'add.html'),
                width: 400,
                height: 400,
                // close with the main window
                parent: mainWindow
            })

            // cleanup
            addTodoWin.on('closed', () => {
                addTodoWin = null
            })
        }
    })

    ipcMain.on('cash', (event, cash) => {
        var transaction = getRanHex(16)
        const date = new Date().toJSON().slice(0, 10)
        console.log(date)
        connection.query(`INSERT INTO cash_data( TRANSACTION, username, cash, DATE ) VALUES( "${transaction}", "${name}", ${cash}, ${date} )`, function(err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                const updatedTodos = todosData.addTodo(cash).todos
                mainWindow.send('todos', updatedTodos)
            }
        })
    })

    // delete-todo from todo list window
    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos

        mainWindow.send('todos', updatedTodos)
    })

    // auth-todo from todo list window
    return ipcMain.on('username', (event, username) => {
        ipcMain.on('password', (event, password) => {
            connection.query('SELECT COUNT(1) AS total FROM users WHERE username = "' + username + '" AND password = "' + password + '"', function(err, results, fields) {
                if (results[0].total === 1) {
                    if (username === 'root') {} else {
                        connection.query(`SELECT * FROM cash_data`, function(err, results, fields) {
                            if (err) {
                                console.log(err);
                            } else {
                                for (let index = 0; index in results; index++) {
                                    const updatedTodos = todosData.addTodo(results[index].cash).todos
                                    mainWindow.send('todos', updatedTodos)
                                }
                            }
                        })
                        name = username
                        mainWindow.send('username', username)
                        authWindow.close()
                        mainWindow.show()
                    }
                } else {

                }
            })
        })
    })


    ipcMain.on('close', () => {
        app.quit()
    })
}

app.on('ready', main)

app.on('window-all-closed', function() {
    app.quit()
})