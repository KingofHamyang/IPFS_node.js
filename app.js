const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');

const app = express();
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
let testFile = fs.readFileSync("./testfile.txt");
let testBuffer = new Buffer(testFile);

app.get('/' , (req, res)=>{
    res.send("hello world")
})

app.get('/addfile', function(req, res) {

    ipfs.files.add(testBuffer, function (err, file) {
        if (err) {
          console.log(err);
        }
        console.log(file)
        res.send(file[0].hash)
      })

})

app.get('/getfile', function(req, res) {
    
    //This hash is returned hash of addFile router.
    const validCID = 'HASH_CODE'

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          console.log(file.path)
          console.log(file.content.toString('utf8'))
        })
      })

})

app.listen(3000, (err)=>{
    console.log("express is running on 3000")
})