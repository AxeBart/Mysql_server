import { connect } from "./connection.js";
import bcrypt from 'bcryptjs'

const db = connect({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'kimmo',
})

export function createPublication(e, callback) {
    const sql = 'INSERT INTO Publication (titre, description, photo, prix, id_entreprise) values (?, ?, ?, ?, ?)';
    db.query(sql, [e.titre, e.description, e.photo, e.prix, e.id_entreprise], (err, result) => {
        if (err) callback(err);
        callback(result)
    });
}

export function updatePublication(e, callback) {
    const sql = `
        UPDATE Publication 
        SET titre = ?, description = ?, prix = ?, photo = ?
        WHERE id_entreprise = ?;
    `
    db.query(sql, [e.titre, e.description, e.prix, e.photo, e.id_entreprise], (err, result) => {
        if (err) callback(err);
        callback(result)
    });
}

export function deletePublication(e, callback) {
    const sql = `
        delete from Publication 
        WHERE id_entreprise = ? and id = ?;
    `
    db.query(sql, [e.id_entreprise, e.id], (err, result) => {
        if (err) callback(err);
        callback(result)
    });
}

deletePublication({
    id_entreprise : 1, id : 1
}, (data) => {
    console.log(data)
})