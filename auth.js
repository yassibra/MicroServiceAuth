const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var aes256 = require('aes256');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
var jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(cors())
var key = 'mysuperpassphrase';
var plaintext = 'mymdp';
var encryptedPlainText = aes256.encrypt(key, plaintext);
var decryptedPlainText = aes256.decrypt(key, encryptedPlainText);
console.log(encryptedPlainText,decryptedPlainText)
// Set up Global configuration access
dotenv.config();
let users = require('./users.json');
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is up and running on ${PORT} ...`);
});

// Main Code Here //
// Generating JWT
//ajout nouveau compte
app.post("/creeruncompte", (req, res) => {
	let object = {username: req.body.username, mdp: aes256.encrypt(key, req.body.mdp)}
	foundUser = users.find(x => x.username === req.body.username);
	console.log(foundUser)
	if(foundUser == null){
		users.push(object)
		res.send({compte: "inscrit"})
		
	  }
	else{
		res.status(404).send("Veuillez choisir un username différent")
	}
	
})

app.post("/generateTokenAvecMDP", async (req, res) => { // << plus besoin du bodyParser vu qu'on l'a déclaré globalement plus haut
    //const jwtSecretKey = "mysecretsecret";
	console.log('users',users)
	  foundUser = users.find((x) => {return (x.username === req.body.username) && (aes256.decrypt(key,x.mdp) === req.body.mdp)});
	  console.log('founduser', foundUser)
	  if(foundUser == null){
		res.status(404).send("Votre username ou votre mot de passe est incorrect")
	  }
	  else{
		let data = {
			time: new Date(),
			username: req.body.username		
		  };
		  console.log(data)
		  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: 60});
		  res.send({ bearer: token });
	  }
     
});

app.post("/generateToken", async (req, res) => { // << plus besoin du bodyParser vu qu'on l'a déclaré globalement plus haut
    //const jwtSecretKey = "mysecretsecret";
	  
      let data = {
        time: new Date(),
        username: req.body.username		
      };
	  console.log(data)
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn: 1800});
      res.send({ bearer: token });
});

// Verification of JWT
app.get("/verifyToken", (req, res) => {
	// Tokens are generally passed in header of request
	// Due to security reasons.

	//let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
	//let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let jwtSecretKey = "mysecretsecret";

	try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
		const verified = jwt.verify(token, jwtSecretKey);
		if(verified){
			// return res.send({valid: verified['time']});
			return res.send(verified);
		}else{
			// Access Denied
			return res.status(401).send(error);
		}
	} catch (error) {
		// Access Denied
		return res.status(401).send(error);
	}
});

app.get("/getAllUsers", (req, res) => {
	res.send(users)
})
//C3PHVLSXciT4NwSb