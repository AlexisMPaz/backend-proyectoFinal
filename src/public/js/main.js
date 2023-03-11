if (window.location.pathname === '/chat') { 
    const socket = io();

    const chatForm = document.getElementById("chatForm");
    const chatContainer = document.getElementById("chatContainer");
    const message = document.getElementById("message");

    function scrollDown() {
       chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(chatForm);
        const newMessage = {};

        formData.forEach((value, key) => {
            newMessage[key] = value;
        });
        
        console.log(newMessage)
        socket.emit("message", newMessage);
        message.value = "";
    })

    socket.on("allMessages", (messages) => {
        chatContainer.innerHTML = "";
        messages.forEach(message => {
            chatContainer.innerHTML +=
            `<p>-${message.user} (${message.email}): ${message.message}`
        })
        scrollDown();
    })
} 