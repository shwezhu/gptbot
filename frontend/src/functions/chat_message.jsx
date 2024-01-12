import {assistant, doctor, translator} from "../components/role.jsx";

function trimMessage(messages) {
    let totalCharacters = messages.reduce((sum, message) => sum + message.content.length, 0);

    while (messages.length > 16) {
        messages.shift();  // remove the old message
    }

    if (totalCharacters > 3000) {
        while (messages.length > 8) {
            messages.shift();  // remove the old message
        }
    }

    totalCharacters = messages.reduce((sum, message) => sum + message.content.length, 0);
    if (totalCharacters > 3000) {
        while (messages.length > 2) {
            messages.shift();  // remove the old message
        }
    }
}

function getSystemInstruction(role) {
    if (role === 'translator') {
        return translator;
    } else if (role === 'doctor') {
        return doctor;
    } else {
        return assistant;
    }
}

export {trimMessage, getSystemInstruction};