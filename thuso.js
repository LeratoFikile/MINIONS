document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    addMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    setTimeout(() => {
        const response = generateResponse(userInput);
        addMessage(response, 'bot-message');
    }, 500);
});

function addMessage(text, type) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(input) {
    const lowerCaseInput = input.toLowerCase();

    // Greetings
    if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi') || lowerCaseInput.includes('hey')) {
        return "Hey there! How can I assist you today?";
    } else if (lowerCaseInput.includes('ola')) {
        return "Ola! Como posso ajudar você hoje?";
    } else if (lowerCaseInput.includes('sho')) {
        return "Sho! Ngiyaphila, unjani?";
    }

    // Formal Greetings
    if (lowerCaseInput.includes('good morning') || lowerCaseInput.includes('good afternoon') || lowerCaseInput.includes('good evening')) {
        return "Good day! How may I assist you with your water-related inquiries?";
    }

    // Positive Feedback
    if (lowerCaseInput.includes('thank you') || lowerCaseInput.includes('thanks')) {
        return "You’re welcome! I’m glad to help.";
    }

    // Water-Related Queries
    if (lowerCaseInput.includes('unclog') || lowerCaseInput.includes('clogged')) {
        return "To unclog your pipes, try using a plunger or a mixture of baking soda and vinegar. Let me know if you need more tips!";
    } else if (lowerCaseInput.includes('leak')) {
        return "If you have a leak, it’s best to turn off the water supply and call a plumber if you’re not comfortable fixing it yourself.";
    } else if (lowerCaseInput.includes('faucet')) {
        return "For a dripping faucet, you may need to replace the washer or O-ring. Have you tried that?";
    } else if (lowerCaseInput.includes('water pressure')) {
        return "Low water pressure can be caused by clogs or issues with your plumbing system. Have you checked for blockages?";
    } else if (lowerCaseInput.includes('water filter')) {
        return "Regularly replace your water filter according to the manufacturer's instructions to ensure clean water.";
    } else if (lowerCaseInput.includes('pipe')) {
        return "If you're hearing strange noises from your pipes, it might be due to air trapped in the system. Have you bled your radiators?";
    } else if (lowerCaseInput.includes('drain')) {
        return "To clear a slow drain, try pouring boiling water down it, or a mixture of baking soda and vinegar.";
    }

    // Responses in Other Languages
    if (lowerCaseInput.includes('fuit') || lowerCaseInput.includes('pyp')) { // Afrikaans for leak and pipe
        return "As jy 'n lek het, sluit die water af en bel 'n loodgieter as jy nie seker is hoe om dit reg te stel nie.";
    } else if (lowerCaseInput.includes('amanzi') || lowerCaseInput.includes('pipi')) { // isiZulu for water and pipe
        return "Uma unemibuzo mayelana namanzi, ngicela ungitshele! Ungakha kanjani impi yokuhlanza amapipi?";
    } else if (lowerCaseInput.includes('taps') || lowerCaseInput.includes('leaks')) { // Afrikaans for taps and leaks
        return "Kontroleer jou krane vir enige lekkasies en vervang die pakking indien nodig.";
    } else if (lowerCaseInput.includes('indlela yokunciphisa') || lowerCaseInput.includes('amanzi')) { // isiZulu for way to reduce water and water
        return "Unganciphisa amanzi ngokusebenzisa amafaucets akhanyayo noma amamitha amanzi ukuze uqaphe.";
    }

    // Fallback Response
    return "Sorry, I didn’t understand that. Can you please provide more details about your water-related question?";
}
