import {assistant, doctor, translator} from "../components/role.jsx";

function roughlyEstimateWordCount(str) {
    const cleanStr = str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    // roughly estimate english word count by counting space
    const roughEnglishWordCount = (cleanStr.match(/\s+/g) || []).length + 1;
    const chineseCharacterCount = (cleanStr.match(/[\u4e00-\u9fff]/g) || []).length;
    return roughEnglishWordCount + chineseCharacterCount;
}

function trimMessage(messages) {
    let totalCharacters = messages.reduce((sum, message) => sum + roughlyEstimateWordCount(message.content), 0);

    while (messages.length > 16) {
        messages.shift();  // remove the old message
    }

    if (totalCharacters > 3000) {
        while (messages.length > 8) {
            messages.shift();  // remove the old message
        }
    }

    totalCharacters = messages.reduce((sum, message) => sum + roughlyEstimateWordCount(message.content), 0);
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