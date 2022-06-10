'use strict'

const path = require('path')
const { app, ipcMain, Notification } = require('electron')
const mysql = require('mysql')

const Window = require('./Window')
const DataStore = require('./DataStore')
const query = require('esquery')
const { id } = require('prelude-ls')

let u_name

const getRanHex = size => {
    let result = [];
    let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    for (let n = 0; n < size; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
}

const connection = mysql.createConnection({
    host: 'sql4.freemysqlhosting.net',
    user: 'sql4498020',
    password: 'kDeeHVFnbY',
    database: 'sql4498020',
    port: 3306
});

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
    //windows
    let addTodoWin
    let adminWindow

    // todo list window
    let mainWindow = new Window({
        file: path.join('renderer', 'index.html'),
        frame: false,
        hide: true
    })
    mainWindow.blur()

    let authWindow = new Window({
        file: path.join('renderer', 'welcome.html'),
        width: 500,
        height: 500,
        modal: true,
        show: false,
        frame: false,
        parent: mainWindow
    })

    ipcMain.on('add-todo-window', () => {
        if (!addTodoWin) {
            addTodoWin = new Window({
                file: path.join('renderer', 'add.html'),
                width: 400,
                height: 400,
                parent: mainWindow
            })

            addTodoWin.on('closed', () => {
                addTodoWin = null
            })
        }
    })

    // initialize with todos
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todos', todosData.todos)
    })

    // Transfers
    ipcMain.on('info', (event, id, transaction) => {
        console.log(transaction);
    })

    ipcMain.on('cash', (event, cash) => {
        const date = new Date().toJSON().slice(0, 10)
        var transaction = getRanHex(16)
        connection.query(`INSERT INTO cash_data( TRANSACTION, username, cash, DATE ) VALUES( "${transaction}", "${u_name}", ${cash}, "${date}" )`, function(err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                mainWindow.send('cash', cash)
                addTodoWin.close()
                showNotification('X-отчёт', 'Данные успешно записаны')
            }
        })
    })

    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos

        mainWindow.send('todos', updatedTodos)
    })

    return ipcMain.on('login', (event, username, password) => {
        connection.query('SELECT COUNT(1) AS total FROM users WHERE username = "' + username + '" AND password = "' + password + '"', function(err, results, fields) {
            if (results[0].total === 1) {
                if (username == 'root') {
                    connection.query(`SELECT * FROM users`, function(err, results, fields) {
                        if (err) {
                            console.log(err);
                        } else {
                            for (let index = 0; index in results; index++) {
                                console.log(results[index].username);
                                var userdata = results[index].username
                                mainWindow.send('userdata', userdata)
                            }
                        }
                    })
                    authWindow.close()
                    mainWindow.show()
                    mainWindow.maximize()
                } else {
                    connection.query(`SELECT * FROM cash_data`, function(err, results, fields) {
                        if (err) {
                            console.log(err);
                        } else {
                            for (let index = 0; index in results; index++) {
                                const updatedTodos = results[index].cash
                                mainWindow.send('cash', updatedTodos)
                            }
                        }
                    })
                    u_name = username
                    mainWindow.send('username', username)
                    authWindow.close()
                    mainWindow.show()
                    mainWindow.maximize()
                }
            } else {
                showNotification('Ошибка', 'Неверное имя пользователя или пароль')
            }
        })
    })
}

function showNotification(notitfivation_title, notification_body) {
    new Notification({ title: notitfivation_title, body: notification_body }).show()
}

app.on('ready', main)

ipcMain.on('close', () => {
    todosData.delete()
    app.quit()
})

app.on('window-all-closed', function() {
    todosData.delete()
    app.quit()
})