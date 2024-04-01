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
