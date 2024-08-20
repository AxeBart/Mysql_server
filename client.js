import { connect } from "./connection.js";
import bcrypt from 'bcryptjs'

const db = connect({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'kimmo',
})

export function createClient(e, callback) {
    bcrypt.hash(e.password, 10, (err, hash) => {
        e.password = hash
        const sql = 'INSERT INTO client (nom, postnom, telephone, password, username) values (?, ?, ?, ?, ?)';
        db.query(sql, [e.nom, e.postnom, e.telephone, e.password, e.username], (err, result) => {
            if (err) callback(err);
            callback(result)
        });
    })
}

export function updateClient(e, callback) {
    const sql = `
        UPDATE client 
        SET nom = ?, postnom = ?, telephone = ?, client.password = ?, username = ?
        WHERE id = ?;
    `
    db.query(sql, [e.nom, e.postnom, e.telephone, e.password, e.username, e.id], (err, result) => {
        if (err) callback(err);
        callback(result)
    });
}

export function connectClient(e, callback) {
    console.log('conncetion client .....')
    const sql = "SELECT id, nom, postnom, telephone, password, username FROM CLIENT WHERE telephone = ? and username = ?";

    db.query(sql, [e.telephone, e.password, e.username], (err, result) => {
        console.log(result)
        // if (err) {
        //     callback(err)
        // } else {
        //     result.forEach((el, i) => {
        //         bcrypt.compare(e.password, el.password, (err, res) => {
        //             if (res == true) {
        //                 result[i].password = ''
        //                 callback(result[i])
        //             }
        //         })
        //     })
        // }
    });
}

// createClient({
//     id : 1,
//     nom: 'Barth', postnom: 'Lungele', telephone: '0841319447', password: '4444', username : 'B.lungele'
// }, (res) => {
//     console.log(res)
// })

setTimeout(() => {

    connectClient({
        telephone: '000000',
        password: '1234'
    }, (res) => {
        console.log(res)
    })

}, 1000)
