const https = require("https");

function EnviarMensajeWhatssApp(text, number){

    text = text.toLowerCase();
    
    if(text.includes("hola")){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to" : number,
            "type": "text",
            "text" : {
                "preview_url" : false,
                "body": "Hola, bienvenida a Edith Manrique MakeUp Artist.😊"
            }
    
        });
    }else if(text =="1"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to" : number,
            "type": "text",
            "text" : {
                "preview_url" : false,
                "body": "¡Aquí tienes nuestra lista de servicios!\n\n📋 **Maquillaje**:\n- Maquillaje social (día o noche)\n- Maquillaje nupcial\n- Maquillaje XV años\n- Maquillaje piel madura\n- Maquillaje editorial\n- Maquillaje full color\n- Maquillaje con delineados gráficos\n\n📋 **Peinados**:\n- Peinado con Ondas de agua y Hollywood\n- Peinado alaciado\n- Peinados sueltos\n- Peinados semirecogidos\n\n✍️ Escribe el servicio que deseas y con gusto te ayudaré a agendarlo. 😊"

            }
    
        });
    
    }else if (text =="2"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to" : number,
            "type": "text",
            "text" : {
                "preview_url" : false,
                "body": "Nuestros días de atención son de lunes a domingo en el horario que más se acomode a tu evento (a disponibilidad). 😊"


            }
    
        });
    }else if (text == "3"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to" : number,
            "type": "text",
            "text" : {
                "preview_url" : false,
                "body": "🌟 Para agendar tu cita, proporciona los siguientes datos para revisar nuestra disponibilidad:\n\n📝 **Datos necesarios**:\n- Nombre:\n- Día de cita:\n- Hora de cita:\n- Dirección del servicio:\n\n⏳ *Se te notificará cuando tu cita esté agendada.*\n📅 En caso de no tener disponibilidad, te ofreceremos horarios alternativos para que elijas el que mejor se adapte a tus tiempos. 😊"



            }
    
        });
    }else if (text =="4"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to" : number,
            "type": "text",
            "text" : {
                "preview_url" : false,
                "body": "✨ Para conocer más sobre nuestro trabajo, visita nuestra página:\n🌐 [Portafolio](https://edithmanriquemakeupartist.netlify.app/portafolio)\n\n📲 **Síguenos en nuestras redes sociales para más contenido reciente:**\n- Instagram: [edithmanriquemakeup](https://www.instagram.com/edithmanriquemakeup?igsh=bzg1eTFyN2w5ZDNk)\n- Facebook: [Edith Manrique Makeup Artist](https://www.facebook.com/profile.php?id=61568716406850&mibextid=ZbWKwL)\n\n💖 ¡Gracias por tu apoyo! #MakeupLover"




            }
    
        });
    }else if (text =="5"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to" : number,
            "type": "text",
            "text" : {
                "preview_url" : false,
                "body": "🙏 Gracias por contactarnos, en un momento uno de nuestra asesora te contestará.💬\n\n¡Gracias por tu paciencia! 😊"
            }
    
        });
    }else if (text == "0"){
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to" : number,
            "type": "text",
            "text" : {
                "preview_url" : false,
                "body": "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? 👉 edithmanriquemakeupartist.netlify.app/inicio\nEn ella encontrarás información sobre nuestros servicios de peinados y maquillaje.\n\n📋 Selecciona una opción para continuar:\n1️⃣ Información sobre servicios de maquillaje y peinados.\n2️⃣ Conocer nuestros horarios de atención.\n3️⃣ Reservar una cita.\n4️⃣ Ver nuestros trabajos recientes.\n5️⃣ Hablar con un asesor.\n0️⃣ Regresar al menú\n\nEscribe el número de la opción que deseas y con gusto te ayudaré. 😊"

            }
    
        });
    }else{
        var data = JSON.stringify({
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to" : number,
            "type": "text",
            "text" : {
                "preview_url" : false,
                "body": "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? 👉 edithmanriquemakeupartist.netlify.app/inicio\nEn ella encontrarás información sobre nuestros servicios de peinados y maquillaje.\n\n📋 Selecciona una opción para continuar:\n1️⃣ Información sobre servicios de maquillaje y peinados.\n2️⃣ Conocer nuestros horarios de atención.\n3️⃣ Reservar una cita.\n4️⃣ Ver nuestros trabajos recientes.\n5️⃣ Hablar con un asesor.\n0️⃣ Regresar al menú\n\nEscribe el número de la opción que deseas y con gusto te ayudaré. 😊"

            }
    
        });
    }
  

    const options ={
        host: "graph.facebook.com",
        path: "/v21.0/503111629557940/messages",
        method: "POST",
        body: data,
        headers : {
            "Content-Type" : "application/json",
            Authorization : "Bearer EAAPkn3wIwJ8BO6PZCm09apLLwayBzUU26YcGi54S4xp02dNeFvBGRZCR0qylfKK9tC2lW5jdq77XPN0ri8wqf0gnklfHYNVvjjEAemmv6NmRMtODgv7OTPZAj8mzHpSZA3e80F7pPlJGjilfCTha8VZCHqgZCJIr2aTXbi994mP7Ea3yzo0vhYUOuVv7UkDJOz"
        }
    };

    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.write(data);
    req.end();
}

module.exports= {
    EnviarMensajeWhatssApp
};