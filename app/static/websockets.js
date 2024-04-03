let ws = null;

let wsInit =  () => {
    let userId = parseInt(getCookie("_id"));
    let token = getCookie("_token");
    ws = new WebSocket(wsEndpoint);
    ws.onopen = () => {
        let data = {
            "userId": userId,
            "token": token,
            "request": "init",
            "data": null,
        }
        ws.send(JSON.stringify(data));
    };
    ws.onmessage = (message) => {
        data = JSON.parse(message.data);
        addMessage(data);
    }
};

let wsSendMessage = (userToId, message) => {
    let userId = parseInt(getCookie("_id"));
    let token = getCookie("_token");
    let data = {
        "userId": userId,
        "token": token,
        "request": "sendMessage",
        "data": {
            "contactId": userToId,
            "message": message,
        }
    }
    ws.send(JSON.stringify(data));
}

let addMessage = (message) => {
    let userId = parseInt(getCookie("_id"));
    let chatBody = document.getElementById("chatMessages");
    if (message["userOriginal"] === userId) {
        chatBody.innerHTML += '<li class="message_to"><p>' + message["original"] + '</p></li>';
    } else if (message["userTranslated"] === userId) {
        chatBody.innerHTML += '<li class="message_from"><p>' + message["translated"] + '</p></li>';
    }
    let modalBody = document.getElementById("chatModalBody");
    modalBody.scrollTop = modalBody.scrollHeight;
};
