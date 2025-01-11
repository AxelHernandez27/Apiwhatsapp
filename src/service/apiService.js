const https = require("https");
const { title } = require("process");

const chatHistorial = {};

function enviarMensajeAsesora(number, chatH) {
    const asesoraNo = "524777465581"; // Número de la asesora

    const mensajeAsesora = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": asesoraNo,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": `Hola Edith! 🤗\n\nUna persona está solicitando asesoramiento de tu parte, te comparto el historial del chat 🙌\n\nNúmero del cliente: ${number}\n\n${chatH}`
        }
    });

    const options = {
        host: "graph.facebook.com",
        path: "/v21.0/503111629557940/messages",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAPkn3wIwJ8BO6PZCm09apLLwayBzUU26YcGi54S4xp02dNeFvBGRZCR0qylfKK9tC2lW5jdq77XPN0ri8wqf0gnklfHYNVvjjEAemmv6NmRMtODgv7OTPZAj8mzHpSZA3e80F7pPlJGjilfCTha8VZCHqgZCJIr2aTXbi994mP7Ea3yzo0vhYUOuVv7UkDJOz"
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.write(mensajeAsesora);
    req.end();
}

function EnviarMensajeWhatssApp(text, number) {
    text = text.toLowerCase();

    if (!chatHistorial[number]) {
        chatHistorial[number] = [];
    }

    chatHistorial[number].push({ type: "received", text });

    let data;

    if (text.includes("hola")) {
        data = createResponse(number, "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? 👉 edithmanriquemakeupartist.netlify.app/inicio\nEn ella encontrarás información sobre nuestros servicios de peinados y maquillaje.\n\n📋 Selecciona una opción para continuar:\n1️⃣ Información sobre servicios de maquillaje, peinados y cotizaciones/reservas.\n2️⃣ Ver nuestros trabajos recientes.\n3️⃣ Hablar con un asesor.\n0️⃣ Regresar al menú\n\nEscribe el número de la opción que deseas y con gusto te ayudaré. 😊");
    } else if (text.includes(":")) {
        const datosCliente = text;
        enviarMensajeAsesora(number, datosCliente);
        data = createResponse(number, "Gracias por proporcionarnos los datos. Nuestra asesora se pondrá en contacto contigo en breve. 😊");
    } else {
        switch (text.toLowerCase()) {
            case "1":
                data = createResponse(number, "¡Aquí tienes nuestra lista de servicios! 😊\n\n📋 **Maquillaje**:\n- Maquillaje nupcial\n- Maquillaje XV años\n- Maquillaje piel madura\n- Maquillaje editorial\n- Maquillaje full color\n- Maquillaje con delineados gráficos.\n\n📋 **Peinados**:\n- Peinado con Ondas de agua y Hollywood\n- Peinado alaciado\n- Peinados sueltos\n- Peinados semirecogidos\n\n¿Te gustaría recibir una cotizacion y/o agendar una cita? 😊\n\nEscribe \"Sí\" o \"No\"");
                break;
            case "si":
                data = createResponse(number, "¡Perfecto! Por favor, proporcióname los siguientes datos en un solo mensaje para cotizar y/o agendar tu cita:\n\n📌 *Nombre y Apellido*\n📅 *Fecha (DD/MM/AAAA)*\n⏰ *Hora de tu evento(HH:MM)*\n🏠 *Domicilio*\n💄 *Servicio* (Ejemplo, Maquillaje nupcial, Peinado con ondas de agua, etc.)");
                break;
            case "sí":
                    data = createResponse(number, "¡Perfecto! Por favor, proporcióname los siguientes datos en un solo mensaje para cotizar y/o agendar tu cita:\n\n📌 *Nombre y Apellido*\n📅 *Fecha (DD/MM/AAAA)*\n⏰ *Hora de tu evento(HH:MM)*\n🏠 *Domicilio*\n💄 *Servicio* (Ejemplo, Maquillaje nupcial, Peinado con ondas de agua, etc.)");
                    break;
            case "no":
                data = createResponse(number, "¡Entendido! Si necesitas ayuda más adelante, no dudes en escribirme. 😊");
                break;
            case "2":
                data = createResponse(number, "¡Mira algunos de nuestros trabajos recientes! 🎨📸\n\nVisita nuestro portafolio en: https://edithmanriquemakeupartist.netlify.app/portafolio\n\nY síguenos en nuestras redes sociales para ver más contenido reciente:\n\nInstagram: https://www.instagram.com/edithmanriquemakeup?igsh=bzg1eTFyN2w5ZDNk\nFacebook: https://www.facebook.com/profile.php?id=61568716406850&mibextid=ZbWKwL");
                break;
            case "3":
                data = createResponse(number, "🙏 Gracias por contactarnos, en un momento nuestra asesora te contestará.💬\n\n¡Gracias por tu paciencia! 😊");
                const datosCliente = text;
                enviarMensajeAsesora(number, datosCliente);
                break;
            case "0":
                data = createResponse(number, "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? 👉 edithmanriquemakeupartist.netlify.app/inicio\nEn ella encontrarás información sobre nuestros servicios de peinados y maquillaje.\n\n📋 Selecciona una opción para continuar:\n1️⃣ Información sobre servicios de maquillaje, peinados y cotizaciones/reservas.\n2️⃣ Ver nuestros trabajos recientes.\n3️⃣Hablar con un asesor.\n0️⃣ Regresar al menú\n\nEscribe el número de la opción que deseas y con gusto te ayudaré.😊");
                break;
            default:
                data = createResponse(number, "No entendí tu mensaje. Por favor, selecciona una opción del menú o elige un tipo de maquillaje o peinado. 😊");
        }
    }

    chatHistorial[number].push({ type: "sent", text: JSON.parse(data).text.body });

    sendWhatsAppMessage(data);
}

function createResponse(number, body) {
    return JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": body
        }
    });
}

function sendWhatsAppMessage(data) {
    const options = {
        host: "graph.facebook.com",
        path: "/v21.0/503111629557940/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAPkn3wIwJ8BO6PZCm09apLLwayBzUU26YcGi54S4xp02dNeFvBGRZCR0qylfKK9tC2lW5jdq77XPN0ri8wqf0gnklfHYNVvjjEAemmv6NmRMtODgv7OTPZAj8mzHpSZA3e80F7pPlJGjilfCTha8VZCHqgZCJIr2aTXbi994mP7Ea3yzo0vhYUOuVv7UkDJOz"
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.write(data);
    req.end();
}

module.exports = {
    EnviarMensajeWhatssApp
};
