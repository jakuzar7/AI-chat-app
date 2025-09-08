const express = require("express");
const cors = require("cors")
const app = express();
const port = 8080;

app.use(cors())

app.get("/hello", (req, res) => {
    res.send({"message":"bonjour!"});
});


app.post("/sendMessage", (req, res) => {  
    console.log("message received", req.body);
    
})

app.listen(port, () => { console.log(`"listening on port ${port}"`);
 })
