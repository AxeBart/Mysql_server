import mysql from 'mysql2'


// Créer une connexion MySQL
export function connect({host, user, password, database}){
    const db = mysql.createConnection({
        host: host,
        user: user, 
        password: password,
        database: database
    })
    
    db.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données:', err);
            return false;
        }
        console.info('connection reussie')
    });
    return db   
}
