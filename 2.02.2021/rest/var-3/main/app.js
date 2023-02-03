const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
// const mysql = require('mysql2/promise');

// const DB_USERNAME = 'app1';
// const DB_PASSWORD = 'welcome123';
// let conn

// mysql.createConnection({
//     user : DB_USERNAME,
//     password : DB_PASSWORD
// })
// .then((connection) => {
//     conn = connection
//     return connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
// })
// .then(() => {
//     return conn.end()
// })
// .catch((err) => {
//     console.warn(err.stack)
// })

const sequelize = new Sequelize( {
    dialect: 'sqlite'
});

sequelize.sync().then( () => {
    console.log("All models were syncronized successfully!");
})

class Device extends Sequelize.Model { };

Device.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.FLOAT,
    }
}, {
    sequelize,
    modelName: 'devices',
    timestamps: false
});

const app = express();
app.use(bodyParser.json());

app.get('/create', async (req, res) => {
    await sequelize.sync({force: true});
    for(let i = 0; i < 10; i++) {
        await Device.create({name: `Device-${i}`, price: `${Math.random() * 100 + i + 10}`});
    }
    res.status(201).json({message: 'devices created'});
})

app.get('/device', async (req, res) => {
    const devices = await Device.findAll();
    res.status(200).send(devices);
})

app.post('/device', async (req, res) => {
    try{
        if(Object.keys(req.body).length === 0){
            res.status(400).json({message: "bad request"})
        }
        else {
            if(req.body.price < 0){
                res.status(400).json({message: "bad request"})
            }
            else if(req.body.name.length < 4){
                res.status(400).json({message: "bad request"})
            }
            else {
                const newDevice = await Device.create(req.body)
                res.status(201).json({message: "device created"})
            }
        }
    }
    catch(error){
        console.warn(error)
    }
})

app.delete('/device/:id', async (req, res) => {
   try{
        const author = await Device.findByPk(req.params.id)
        if(author){
            await author.destroy()
            res.status(202).json({message: "device deleted"})
        }
   }
   catch(error){
    console.warn(error)
   }
})

app.listen(8080, async()=>{
	try {
		await sequelize.authenticate();
        console.log("Connection has been established successfully")
	} catch (error) {
		console.log("Unable to connect to the database:", error)

	}
})

module.exports = app;