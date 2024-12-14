const verificar = (req, res) => {

    try {
        var tokencode = "AXELCODEAPIMETA";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == tokencode){
            res.send(challenge);
        }else{
            res.status(400).send();
            console.log("este error es el 404 del if");
            console.log(tokencode);
            console.log(token);
            console.log(challenge);



        }

        console.log(req);
    } catch (e) {
        res.status(400).send();
    }
  
}

const recibir = (req,res) => {
    res.send("recibido");
    console.log("Recibido consola"); 
}

module.exports ={
    verificar,
    recibir
}