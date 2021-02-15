const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// read
app.get('/getAll', (req, res) => {
	const db = dbService.getDbServiceInstance();

	const result = db.getAllCountries();
	
	result
	.then(data => res.json({data : data}))
	.catch(err => console.log(err));
})

// create
app.post('/insert', (req, res) => {
	const { code } = req.body;
	const db = dbService.getDbServiceInstance();
	
	const result = db.insertNewcode(code);

	result
	.then(data => res.json({ data: data}))
	.catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (req, res) => {
	const { id } = req.params;
	const db = dbService.getDbServiceInstance();

	const result = db.deleteRowById(id);
	
	result
	.then(data => res.json({success : data}))
	.catch(err => console.log(err));
});

app.get('/search/:Code', (req, res) => {
	const { Code } = req.params;
	const db = dbService.getDbServiceInstance();

	const result = db.searchByCode(Code);
	
	result
	.then(data => res.json({data : data}))
	.catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log(`app is running in port ${process.env.PORT}`));