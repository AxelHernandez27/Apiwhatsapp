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
function createButtonResponse(number, buttons) {
    return JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "message",
            },
            "action": {
                "buttons": buttons,
            },
        },
    });
}
    if (text.includes("hola")) {
        data = createResponse(number, "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? 👉 edithmanriquemakeupartist.netlify.app/inicio\nEn ella encontrarás información sobre nuestros servicios de peinados y maquillaje.\n\n📋 Selecciona una opción para continuar:\n1️⃣ Información sobre servicios de maquillaje, peinados y cotizaciones/reservas.\n2️⃣ Conocer nuestros horarios de atención.\n3️⃣ Ver nuestros trabajos recientes.\n4️⃣ Hablar con un asesor.\n0️⃣ Regresar al menú\n\nEscribe el número de la opción que deseas y con gusto te ayudaré. 😊");
    } else if (text == "1") {
        // Llamar a la función `createButtonResponse` correctamente
        data = createButtonResponse(
            number,
            "¡Aquí tienes nuestra lista de servicios! 😊\n\n📋 **Maquillaje**:\n- Maquillaje nupcial\n- Maquillaje XV años\n- Maquillaje piel madura\n- Maquillaje editorial\n- Maquillaje full color\n- Maquillaje con delineados gráficos.\n\n📋 **Peinados**:\n- Peinado con Ondas de agua y Hollywood\n- Peinado alaciado\n- Peinados sueltos\n- Peinados semirecogidos\n\n¿Te gustaría agendar una cita? 😊",
            [
                { type: "reply", reply: { id: "si", title: "Sí" } },
                { type: "reply", reply: { id: "no", title: "No" } }
            ]
        );
    }else if (text === "sí" || text === "si") {
        data = createButtonResponse(
            number,
            "¡Excelente! ¿Qué servicio deseas?",
            [
                { type: "reply", reply: { id: "maquillaje", title: "Maquillaje" } },
                { type: "reply", reply: { id: "peinado", title: "Peinado" } },
            ]
        );
    } else if (text === "no") {
        data = createResponse(number, "¡Entendido! Si necesitas más información, no dudes en escribirme. 😊");
    } else if (text.includes("maquillaje")) {
        data = createResponse(number, "¡Excelente elección! 😊 ¿Qué tipo de maquillaje te gustaría? Elige uno de los siguientes:\n\n1️⃣ Maquillaje nupcial\n2️⃣ Maquillaje XV años\n3️⃣ Maquillaje piel madura\n4️⃣ Maquillaje editorial\n5️⃣ Maquillaje full color\n6️⃣ Maquillaje con delineados gráficos.");
    } else if (text.includes("peinado")) {
        data = createResponse(number, "¡Genial! 😊 ¿Qué tipo de peinado te gustaría? Elige uno de los siguientes:\n\n1️⃣ Peinado con Ondas de agua y Hollywood\n2️⃣ Peinado alaciado\n3️⃣ Peinados sueltos\n4️⃣ Peinados semirecogidos.");
    } else if (text == "1" || text == "2" || text == "3" || text == "4" || text == "5" || text == "6") {
        data = createResponse(number, "Perfecto. Ahora, por favor proporciónanos los siguientes datos para continuar con la cotización o reserva:\n\n- Nombre:");
        chatHistorial[number].push({ type: "sent", text: "Por favor, proporciónanos tu nombre." });
        chatHistorial[number].estado = "esperando_nombre"; // Actualiza el estado
    } else if (chatHistorial[number].estado === "esperando_nombre") {
        chatHistorial[number].nombre = text;
        data = createResponse(number, "¡Gracias! Ahora, por favor proporciónanos los siguientes datos:\n\n- Día de cita:");
        chatHistorial[number].estado = "esperando_dia"; // Actualiza el estado
    } else if (chatHistorial[number].estado === "esperando_dia") {
        chatHistorial[number].dia = text;
        data = createResponse(number, "Perfecto. Ahora, indícanos la hora de la cita:");
        chatHistorial[number].estado = "esperando_hora"; // Actualiza el estado
    } else if (chatHistorial[number].estado === "esperando_hora") {
        chatHistorial[number].hora = text;
        data = createResponse(number, "¡Muy bien! Por último, proporciónanos la dirección donde será el servicio:");
        chatHistorial[number].estado = "esperando_direccion"; // Actualiza el estado
    } else if (chatHistorial[number].estado === "esperando_direccion") {
        chatHistorial[number].direccion = text;
        data = createResponse(number, "¡Listo! Gracias por la información. En breve nos pondremos en contacto para confirmar tu cita. 😊");
        // Enviar el historial a la asesora en la opción 1
        const chatH = chatHistorial[number]
            .map(entry => `${entry.type === "received" ? "**Cliente**" : "Bot"}: ${entry.text}`)
            .join("\n");
        enviarMensajeAsesora(number, chatH);
    } else if (text == "2") {
        data = createResponse(number, "Nuestros días de atención son de lunes a domingo en el horario que más se acomode a tu evento (a disponibilidad). 😊");
    } else if (text == "3") {
        data = createResponse(number, "¡Mira algunos de nuestros trabajos recientes! 🎨📸\n\nVisita nuestro portafolio en: https://edithmanriquemakeupartist.netlify.app/portafolio\n\nY síguenos en nuestras redes sociales para ver más contenido reciente:\n\nInstagram: https://www.instagram.com/edithmanriquemakeup?igsh=bzg1eTFyN2w5ZDNk\nFacebook: https://www.facebook.com/profile.php?id=61568716406850&mibextid=ZbWKwL\n\n¿Te gustaría ver más trabajos? 😊");
    } else if (text == "4") {
        const chatH = chatHistorial[number]
            .map(entry => `${entry.type === "received" ? "**Cliente**" : "Bot"}: ${entry.text}`)
            .join("\n");

        data = createResponse(number, "🙏 Gracias por contactarnos, en un momento nuestra asesora te contestará.💬\n\n¡Gracias por tu paciencia! 😊");
        enviarMensajeAsesora(number, chatH);
    } else if (text == "0") {
        data = createResponse(number, "Hola🌟\n\n¿Ya tuviste oportunidad de visitar nuestra página web? 👉 edithmanriquemakeupartist.netlify.app/inicio\nEn ella encontrarás información sobre nuestros servicios de peinados y maquillaje.\n\n📋 Selecciona una opción para continuar:\n1️⃣ Información sobre servicios de maquillaje, peinados y cotizaciones/reservas.\n2️⃣ Conocer nuestros horarios de atención.\n3️⃣ Ver nuestros trabajos recientes.\n4️⃣ Hablar con un asesor.\n0️⃣ Regresar al menú\n\nEscribe el número de la opción que deseas y con gusto te ayudaré.😊");
    }else {
        data = createResponse(number, "No entendí tu mensaje. Por favor, selecciona una opción del menú o elige un tipo de maquillaje o peinado. 😊");
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
