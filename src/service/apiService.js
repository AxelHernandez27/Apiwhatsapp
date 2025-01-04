const https = require("https");

function EnviarMensajeWhatssApp(text, number) {
    // Asegúrate de que el número esté en formato internacional.
    if (!/^\d+$/.test(number)) {
        console.error("Número inválido:", number);
        return;
    } else {
        console.log("Número válido: ", number);
    }

    // Convertir texto a minúsculas.
    text = text.toLowerCase();

    // Respuestas automáticas.
    let respuesta = "";
    switch (true) {
        case text.includes("hola"):
            respuesta = "Hola, bienvenida a Edith Manrique MakeUp Artist.😊";
            break;
        case text === "1":
            respuesta = "¡Aquí tienes nuestra lista de servicios! ... (tu mensaje aquí)";
            break;
        case text === "2":
            respuesta = "Nuestros días de atención son de lunes a domingo ...";
            break;
        case text === "3":
            respuesta = "🌟 Para agendar tu cita, proporciona los siguientes datos ...";
            break;
        case text === "4":
            respuesta = "✨ Para conocer más sobre nuestro trabajo, visita nuestra página ...";
            break;
        case text === "5":
            respuesta = "🙏 Gracias por contactarnos, en un momento nuestra asesora te contestará.";
            break;
        case text === "0":
            respuesta = "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? ...";
            break;
        default:
            respuesta = "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? ...";
            break;
    }

    // Datos para la API.
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": respuesta,
        },
    });

    // Configuración de la solicitud HTTPS.
    const options = {
        host: "graph.facebook.com",
        path: "/v21.0/503111629557940/messages",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAPkn3wIwJ8BO6PZCm09apLLwayBzUU26YcGi54S4xp02dNeFvBGRZCR0qylfKK9tC2lW5jdq77XPN0ri8wqf0gnklfHYNVvjjEAemmv6NmRMtODgv7OTPZAj8mzHpSZA3e80F7pPlJGjilfCTha8VZCHqgZCJIr2aTXbi994mP7Ea3yzo0vhYUOuVv7UkDJOz",
        },
    };

    // Envío de la solicitud.
    const req = https.request(options, (res) => {
        let responseData = "";
        res.on("data", (chunk) => {
            responseData += chunk;
        });
        res.on("end", () => {
            console.log("Respuesta de la API:", responseData);
        });
    });

    req.on("error", (error) => {
        console.error("Error al enviar mensaje:", error);
    });

    req.write(data);
    req.end();
}

module.exports = {
    EnviarMensajeWhatssApp,
};
