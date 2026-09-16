function processCommand(command) {

    command = command.toLowerCase().trim();

    console.log("JARVIS HEARD:", command);

    let reply = "";

    if (
        command.includes("hello") ||
        command.includes("hi") ||
        command.includes("hey")
    ) {
        reply = "Hello Nick. JARVIS is online.";
    }

    else if (
        command.includes("your name") ||
        command.includes("who are you")
    ) {
        reply = "I am JARVIS, your personal AI assistant.";
    }

    else if (
        command.includes("my name") ||
        command.includes("who am i")
    ) {
        reply = "Your name is Nick.";
    }

    else if (command.includes("time")) {

        reply = "The current time is " +
                new Date().toLocaleTimeString();
    }

    else if (command.includes("date")) {

        reply = "Today is " +
                new Date().toLocaleDateString();
    }

    else if (
        command.includes("system status") ||
        command === "status"
    ) {
        reply = "All primary systems are operational.";
    }

    /* FREE FIRE SEARCH */
    else if (
        command.includes("search free fire") ||
        command.includes("search freefire")
    ) {

        let query = command
            .replace("search free fire", "")
            .replace("search freefire", "")
            .trim();

        if (query) {

            reply = "Searching Free Fire for " + query;

            window.open(
                "https://www.google.com/search?q=" +
                encodeURIComponent("Free Fire " + query),
                "_blank"
            );

        } else {

            reply = "What should I search for in Free Fire?";
        }
    }

    /* GENERAL SEARCH */
    else if (command.includes("search")) {

        let query = command
            .replace("search", "")
            .trim();

        if (query) {

            reply = "Searching for " + query;

            window.open(
                "https://www.google.com/search?q=" +
                encodeURIComponent(query),
                "_blank"
            );

        } else {

            reply = "What should I search for?";
        }
    }

    else if (command.includes("open google")) {

        reply = "Opening Google.";

        window.open(
            "https://www.google.com",
            "_blank"
        );
    }

    else if (command.includes("open youtube")) {

        reply = "Opening YouTube.";

        window.open(
            "https://www.youtube.com",
            "_blank"
        );
    }

    else if (command.includes("calculator")) {

        reply = "Calculator command received.";
    }

    else if (
        command.includes("thank") ||
        command.includes("thanks")
    ) {

        reply = "You're welcome, Nick.";
    }

    else if (command.includes("stop")) {

        speechSynthesis.cancel();

        reply = "Voice output stopped.";
    }

    else {

        reply =
            "Command received. I don't know that command yet.";
    }

    showMessage(reply);
    jarvisSpeak(reply);
}// ===============================
// JARVIS VOICE RECOGNITION
// ===============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    console.log("Speech Recognition is not supported.");

} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function () {
        console.log("JARVIS: Listening...");
    };

    recognition.onresult = function (event) {

        const command =
            event.results[0][0].transcript;

        console.log("JARVIS HEARD:", command);

        processCommand(command);
    };

    recognition.onerror = function (event) {

        console.log(
            "JARVIS microphone error:",
            event.error
        );
    };

    recognition.onend = function () {

        console.log("JARVIS: Listening ended.");
    };

    // Find microphone button
    const micButton =
        document.querySelector("button");

    if (micButton) {

        micButton.addEventListener("click", function () {

            console.log("MIC BUTTON PRESSED");

            recognition.start();
        });

    } else {

        console.log("Microphone button not found.");
    }
}