import { connect } from "./connection.js";
import bcrypt from 'bcryptjs'

const db = connect({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'kimmo',
})

export function createEntreprise(e, callback) {
    bcrypt.hash(e.password, 10, (err, hash) => {
        e.password = hash
        const sql = 'INSERT INTO Entreprise (nom, rccm, id_nat, adresse, telephone, email, password) values (?, ?, ?, ?, ? ,?, ?)';
        db.query(sql, [e.nom, e.rccm, e.id_nat, e.adresse, e.telephone, e.email, e.password], (err, result) => {
            if (err) callback(err);
            callback(result)
        });
    })
}

export function updateEntreprise(e, callback) {
    const sql = `
        UPDATE Entreprise 
        SET nom = ?, rccm = ?, id_nat = ?, adresse = ?, telephone = ?
        email = ?, password = ?
        WHERE id = ?;
    `
    db.query(sql, [e.nom, e.rccm, e.id_nat, e.adresse, e.telephone, e.email, e.password, e.id], (err, result) => {
        if (err) callback(err);
        callback(result)
    });
}

export function connectEntreprise(e, callback) {
    const sql = "SELECT * FROM Entreprise WHERE telephone = ? and email = ?";

    db.query(sql, [e.telephone, e.email], (err, result) => {
        if (err) {
            callback(err)
        } else {
            if(result.length > 0){
                result.forEach((el, i) => {
                    bcrypt.compare(e.password, el.password, (err, res) => {
                        if (res == true) {
                            result[i].password = ''
                            callback(result[i])
                        }else{
                            callback({response : 'Non trouvé'})
                        }
                    })
                })
            }else{
                callback({response : 'Non trouvé'})
            }
        }
    });
}

// createEntreprise({
//     nom: 'Kinshasa immobilier',
//     rccm : '0X0X',
//     id_nat : '0X0X',
//     telephone: '0841319447', 
//     password: '4444', 
//     email : 'kinshasaimobilier@kimmo.com',
//     adresse : 'huilerie 04bis, C/ kinshasa'
// }, (res) => {
//     console.log(res)
// })


connectEntreprise({
    telephone: '000000',
    password: '1234',
    email : 'kinshasaimobilier@kimmo.com'
}, (res) => {
    console.log(res)
})
