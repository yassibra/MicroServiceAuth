const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
// var aes256 = require('aes256');
// var cors = require('cors')
// app.use(cors())
// var key = 'mysuperpassphrase';
// var plaintext = 'mymdp';
// var encryptedPlainText = aes256.encrypt(key, plaintext);
// var decryptedPlainText = aes256.decrypt(key, encryptedPlainText);
// console.log(encryptedPlainText, decryptedPlainText)
// // Set up Global configuration access
// dotenv.config();

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Yassine:C3PHVLSXciT4NwSb@cluster0.zmfdtgw.mongodb.net/?retryWrites=true&w=majority";
// let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// let db = client.db("mydb");


// Main Code Here //
// Generating JWT

// app.post("/creeruncompte", (req, res) => {
// 	// Validate User Here
// 	// Then generate JWT Token

// 	let jwtSecretKey = "mysecretsecret";
// 	let data = {
// 		time: Date(),
// 		userId: 12,
// 	}

// 	const token = jwt.sign(data, jwtSecretKey);

// 	res.send(token);
// });

// app.post("/creeruncompte", (req, res) => {
// 	// Validate User Here
// 	// Then generate JWT Token

// 	let jwtSecretKey = "mysecretsecret";
// 	let data = {
// 		time: Date(),
// 		userId: 12,
// 	}

// 	const token = jwt.sign(data, jwtSecretKey);

// 	res.send(token);
// });

// app.get("/getCustomer", async (req, res) => {

// 	await client.db('mydb').collection('customers').findOne().then(result => console.log(result), err => console.log(err));;

// 	res.send({ ok: "ok" });
// });

// app.get('/answers', function (req, res) {
// 	client.open(function (err, db) { // <------everything wrapped inside this function
// 		db.collection('customers', function (err, collection) {
// 			collection.find().toArray(function (err, items) {
// 				console.log(items);
// 				res.send(items);
// 			});
// 		});
// 	});
// });

// app.post("/generateToken", async (req, res) => { // << plus besoin du bodyParser vu qu'on l'a déclaré globalement plus haut
// 	//const UserModel = dbo.collection("users");
// 	const jwtSecretKey = "mysecretsecret";
// 	await dbo.collection("users").findOne({ username: req.body.username });
// 	console.log(user.json());
// 	//   let data = {
// 	//     time: new Date(),
// 	//     userame: user,
// 	//   } ;
// 	//   console.log(user);
// 	//   const token = jwt.sign(data, jwtSecretKey);
// 	//   res.send({ bearer: token });
// });

// // Verification of JWT
// app.get("/verifyToken", (req, res) => {
// 	// Tokens are generally passed in header of request
// 	// Due to security reasons.

// 	//let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
// 	//let jwtSecretKey = process.env.JWT_SECRET_KEY;
// 	let jwtSecretKey = "mysecretsecret";

// 	try {
// 		console.log("ici")
// 		const authHeader = req.headers['authorization']
// 		const token = authHeader && authHeader.split(' ')[1]
// 		console.log(token)
// 		const verified = jwt.verify(token, jwtSecretKey);
// 		if (verified) {
// 			console.log("ici")
// 			return res.send("Successfully Verified");
// 		} else {
// 			// Access Denied
// 			return res.status(401).send(error);
// 		}
// 	} catch (error) {
// 		// Access Denied
// 		return res.status(401).send(error);
// 	}
// });

app.get("/products", async (req, res) => {
	try {
		const endpoint = 'https://dummyjson.com/products';
		const response = await axios.get(endpoint); // utilisable avec les méthode .get() .post() .patch() etc....
		console.log('data', response.data); // la donnée reçue se trouve dans la propriété "data"
		res.send(response.data);
	} catch (e) {
		res.send(e);
	}
})

app.get("/products/:id", async (req, res) => {
	const id = req.params.id;
	if (id) {
		try {
			const endpoint = `https://dummyjson.com/products/${id}`; // une api random avec un id en parametre
			const response = await axios.get(endpoint); // utilisable avec les méthode .get() .post() .patch() etc....
			console.log(response.data); // la donnée reçue se trouve dans la propriété "data"
			res.send(response.data);
		} catch (e) {
			res.status(500).send({ message: e.message });
		}
	} else {
		res.status(400).send({ message: 'Invalid id param' });
	}
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is up and running on ${PORT} ...`);
});
//C3PHVLSXciT4NwSb