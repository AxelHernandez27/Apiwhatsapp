const https = require("https");

const chatHistorial = {};

function enviarMensajeAsesora(number, chatH) {
    const asesoraNo = "524778501589"; // Número de la asesora

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

// Función para crear botones interactivos
function createButtonResponse(number, messageText, buttons) {
    return JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "text",
                "text": "¡Hola!"
            },
            "body": {
                "text": messageText
            },
            "footer": {
                "text": "Elige una opción:"
            },
            "action": {
                "buttons": buttons
            }
        }
    });
}

    if (text.includes("hola")) {
        data = createResponse(number, "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? 👉 edithmanriquemakeupartist.netlify.app/inicio\nEn ella encontrarás información sobre nuestros servicios de peinados y maquillaje.\n\n📋 Selecciona una opción para continuar:\n1️⃣ Información sobre servicios de maquillaje, peinados y cotizaciones/reservas.\n2️⃣ Conocer nuestros horarios de atención.\n3️⃣ Ver nuestros trabajos recientes.\n4️⃣ Hablar con un asesor.\n0️⃣ Regresar al menú\n\nEscribe el número de la opción que deseas y con gusto te ayudaré. 😊");
    } else {
        switch (text) {
            case "1":
                const mensaje = createResponse(number, "¡Aquí tienes nuestra lista de servicios! 😊\n\n📋 **Maquillaje**:\n- Maquillaje nupcial\n- Maquillaje XV años\n- Maquillaje piel madura\n- Maquillaje editorial\n- Maquillaje full color\n- Maquillaje con delineados gráficos.\n\n📋 **Peinados**:\n- Peinado con Ondas de agua y Hollywood\n- Peinado alaciado\n- Peinados sueltos\n- Peinados semirecogidos\n\n");
                sendWhatsAppMessage(mensaje);

                const buttonsAgendar = [
                    { type: "reply", reply: { id: "si", title: "Sí" } },
                    { type: "reply", reply: { id: "no", title: "No" } }
                ];

                data = createButtonResponse(number, "¿Te gustaría agendar una cita? 😊", buttonsAgendar);
                break;
            case "2":
                data = createResponse(number, "Nuestros días de atención son de lunes a domingo en el horario que más se acomode a tu evento (a disponibilidad). 😊");
                break;
            case "3":
                data = createResponse(number, "¡Mira algunos de nuestros trabajos recientes! 🎨📸\n\nVisita nuestro portafolio en: https://edithmanriquemakeupartist.netlify.app/portafolio\n\nY síguenos en nuestras redes sociales para ver más contenido reciente:\n\nInstagram: https://www.instagram.com/edithmanriquemakeup?igsh=bzg1eTFyN2w5ZDNk\nFacebook: https://www.facebook.com/profile.php?id=61568716406850&mibextid=ZbWKwL");
                break;
            case "4":
                data = createResponse(number, "🙏 Gracias por contactarnos, en un momento nuestra asesora te contestará.💬\n\n¡Gracias por tu paciencia! 😊");
                break;
            case "0":
                data = createResponse(number, "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? 👉 edithmanriquemakeupartist.netlify.app/inicio\nEn ella encontrarás información sobre nuestros servicios de peinados y maquillaje.\n\n📋 Selecciona una opción para continuar:\n1️⃣ Información sobre servicios de maquillaje, peinados y cotizaciones/reservas.\n2️⃣ Conocer nuestros horarios de atención.\n3️⃣ Ver nuestros trabajos recientes.\n4️⃣ Hablar con un asesor.\n0️⃣ Regresar al menú\n\nEscribe el número de la opción que deseas y con gusto te ayudaré.😊");
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
