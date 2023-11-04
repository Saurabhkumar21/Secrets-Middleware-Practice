import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { log } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
var authenticated = false;
const passwordAuthenticator = (req, res, next)=>{
    if(req.body.password === "ILoveProgramming"){
        authenticated = true;
    }
    next();
}
app.use(passwordAuthenticator);
app.get("/", (req, res)=>{
    res.sendFile(__dirname+ "/public/index.html");
})

app.post("/check",(req, res)=>{
    if(authenticated){
        res.sendFile(__dirname+"/public/secret.html");
    }else res.sendFile(__dirname+"/public/index.html");
})


app.listen(port, ()=>{
    log("The port is running at" + port);
})
