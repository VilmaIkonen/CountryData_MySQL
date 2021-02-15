const mysql = require('mysql2');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT
});

connection.connect((err) => {
	if (err) {
		console.log(err.message);
	}
	// console.log('db ' + connection.state);
});


class DbService {
	static getDbServiceInstance() {
		return instance ? instance : new DbService();
	}

	async getAllCountries() {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM Country;";

				connection.query(query, (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			});
			// console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}


	// async insertNewCountry(code) {
	// 	try {
	// 		const insertCountry = await new Promise((resolve, reject) => {
	// 			const query = "INSERT INTO Country (Code, Name, LocalName, Population) VALUES (?, ?, ?, ?);";

	// 			connection.query(query, [Code, Name, LocalName, Population] , (err, result) => {
	// 					if (err) reject(new Error(err.message));
	// 					resolve(result.insertId);
	// 			})
	// 		});
	// 		return {
	// 			Code : Code,
	// 			Name: Name,
	// 			LocalName: LocalName,
	// 			Population: Population
	// 		};
	// 	} 
	// 	catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// async deleteRowByCode(code) {
	// 	try {
	// 		const response = await new Promise((resolve, reject) => {
	// 			const query = "DELETE FROM Country WHERE COde = ?;";

	// 			connection.query(query, [code] , (err, result) => {
	// 				if (err) reject(new Error(err.message));
	// 				resolve(result.affectedRows);
	// 			})
	// 		});

	// 		return response === 1 ? true : false;
	// 	} 
	// 	catch (err) {
	// 		console.log(err);
	// 		return false;
	// 	}
	// }

	async searchByCode(Code) {
		try {
			const response = await new Promise((resolve, reject) => {
				const query = "SELECT * FROM Country WHERE Code = ?;";

				connection.query(query, [Code], (err, results) => {
					if (err) reject(new Error(err.message));
					resolve(results);
				})
			});

			return response;
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = DbService;