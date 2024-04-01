 let wsInit =  () => {
    let userId = parseInt(getCookie("_id"));
    let token = getCookie("_token");
    let ws = new WebSocket(wsEndpoint);
    ws.onopen = () => {
        ws.send(token);
    };
};
