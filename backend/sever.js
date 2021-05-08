// Requiring module
const express = require('express');
const cors = require("cors")
  
// Creating express object
const app = express();
  
// Defining port number
const PORT = 5000;        

const tokensJson = require('./tokens.json');
  
// Function to serve all static files
// inside public directory.
app.use(express.static('public'));  
app.use('/images', express.static('images')); 
app.use(cors())

app.get('/:tokenId', function (req, res) {
    let tokenId = req.params.tokenId;
    let token = tokensJson[tokenId];
    if(!token) {
       return res.send("Not Found").status(404)
    }

    let data = {
        tokenId,
        token
    }

    res.send(data);

    
  })
  
// Server setup
app.listen(PORT, () => {
  console.log(`Running server on PORT ${PORT}...`);
})