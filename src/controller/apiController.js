const enviarmensaje = require("../service/apiService")

const verificar = (req, res) => {

    try {
        var tokencode = "AXELCODEAPIMETA";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == tokencode){
            res.send(challenge);
        }else{
            res.status(400).send();
        }

        console.log(req);
    } catch (e) {
        res.status(400).send();
    }
}

const chatHistorial = {};

const recibir = (req,res) => {
    try{
        console.log("JSON recibido:", JSON.stringify(req.body, null, 2));
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var ObjetoMensaje = value["messages"];
        
        if(typeof ObjetoMensaje != "undefined"){
            var messages = ObjetoMensaje[0];
        
            var text = messages ["text"]["body"];
            var number = messages["from"];
            console.log("Numero enviado: "+ number + "texto recibido: " + text )

            // Guardar mensaje en el historial
            if (!chatHistorial[number]) {
                chatHistorial[number] = [];
            }
            chatHistorial[number].push({
                sender: "user",
                messages: text,
                timestamp: new Date()
            });
            
            enviarmensaje.EnviarMensajeWhatssApp(text, number);
        }
       
        res.send("EVENT_RECEIVED");
    }catch(e){
        console.log(e);
        res.send("EVENT_RECEIVED");
    }
    console.log(req);
}

module.exports ={
    verificar,
    recibir
}