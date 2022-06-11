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
    user: 'sql4499006',
    password: 'NjgU8dtxhc',
    database: 'sql4499006',
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
    let addUserWin

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

    ipcMain.on('add-user', () => {
        if (!addUserWin) {
            addUserWin = new Window({
                file: path.join('renderer', 'add_users.html'),
                width: 480,
                height: 600,
                parent: mainWindow
            })

            addUserWin.on('closed', () => {
                addUserWin = null
            })
        }
    })

    ipcMain.on('newUser', (event, username, fullname, password, root) => {
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        connection.query(`INSERT INTO users(username, full_name, password, root, created_at, deleted_at) VALUES ("${username}", "${fullname}", "${password}", ${root}, "${date}", NULL)`,
            function(err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    mainWindow.send('userdata', [username], [fullname], [root])
                    addUserWin.close()
                    showNotification('Панель администратора', 'Пользователь успешно добавлен')
                }
            })
    })

    // Transfers
    ipcMain.on('delete', (event, id) => {
        connection.query(`DELETE FROM users WHERE Id=${id}`, function(err, results, fields) {
            if (err) {
                console.log(err);
            } else { showNotification('Панель администратора', 'Пользователь удалён') }
        })
    })

    ipcMain.on('cash', (event, cash) => {
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var transaction = getRanHex(16)
        connection.query(`INSERT INTO cash_data( TRANSACTION, username, cash, DATE ) VALUES("${transaction}", "${u_name}", ${cash}, "${date}" )`, function(err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                mainWindow.send('cash', cash)
                addTodoWin.close()
                showNotification('X-отчёт', 'Данные успешно записаны')
            }
        })
    })

    return ipcMain.on('login', (event, username, password) => {
        //connection.query('SELECT COUNT(1) AS total FROM users WHERE username = "' + username + '" AND password = "' + password + '"', function(err, results, fields) {
        connection.query(`SELECT * FROM users`, function(err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                for (let index = 0; index in results; index++) {
                    if (results[index].username == username) {
                        for (let j = 0; j < results.length; j++) {
                            if (results[j].password == password) {
                                if (results[j].root) {
                                    connection.query(`SELECT * FROM users`, function(err, results, fields) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            for (let index = 0; index in results; index++) {
                                                var userdata = results[index].username
                                                var fullname = results[index].full_name
                                                var root = results[index].root
                                                mainWindow.send('userdata', [userdata], [fullname], [root])
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
                                // showNotification('Ошибка', 'Пароль не верный')
                            }
                        }
                    } else {
                        // showNotification('Ошибка', 'Пользователя не существует')
                    }

                }
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