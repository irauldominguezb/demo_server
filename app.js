const db = require('./db/connection');
const axios = require('axios');

const createClient = () => {
    axios.get('https://randomuser.me/api/')
        .then((response) => {
            const { name } = response.data.results[0];
            const sql = `INSERT INTO clients (name,last_name, created_at) VALUES ('${name.first}','${name.last}', '2024-02-01 19:07:41')`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log('Cliente creado!');
                /*const sql = `INSERT INTO logs (description, time_stamp) VALUES ('Cliente creado', NOW())`;
                db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log('Log creado!');
                });*/
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

const petNames = ["Max", "Luna", "Bella", "Charlie", "Lucy", "Cooper", "Oliver", "Mia", "Rocky", "Daisy", "Coco", "Bailey", "Sophie", "Leo", "Milo", "Zoe", "Chloe", "Toby", "Lola", "Oscar"]
const breed = ["Labrador", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Husky", "Boxer", "Dalmatian", "Doberman", "Chihuahua", "Pug", "Shih Tzu", "Golden Retriever", "Schnauzer", "Yorkshire Terrier", "Pomeranian", "Maltese", "Bichon Frise", "Cocker Spaniel", "Papillon"]
const catBreed = ["Siamese", "Persian", "Main"]
const type = ["perro", "gato"]

const getClients = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT id FROM clients ORDER BY RAND() LIMIT 1';
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const {id} = result[0] 
                resolve(id);
            }
        });
    });
};


getRandNumber = (max) => {
    return Math.floor(Math.random() * max)
}


const savePet = async () => {
    try {
        const idClient = await getClients();
        const petName = petNames[getRandNumber(petNames.length)];
        const petType = type[getRandNumber(type.length)];
        let petBreed = "";
        switch (petType) {
            case "perro":
                petBreed = breed[getRandNumber(breed.length)];
                break;
            case "gato":
                petBreed = catBreed[getRandNumber(catBreed.length)];
                break;
            default:
                break;
        }
        const sql = `INSERT INTO pets (name, type, breed, owner_id) VALUES ('${petName}','${petType}', '${petBreed}', ${idClient})`;
        db.query(sql, (err, result)=> {
            if(err) throw err;
            console.log('Mascota creada!', result);
        })
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
    }
};
setInterval(savePet,5000);