const API_GATEWAY = 'http://localhost:3000';

let getCookie = (cookieName) => {
    let name = cookieName + "=";
    let parts = document.cookie.split(';');
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i].trim();
        if (part.indexOf(name) === 0) {
            return part.substring(name.length, part.length);
        }
    }
    return "";
};

let requestEndpoint = (endpoint, data) => {
    data["userId"] = parseInt(getCookie("_id"));
    data["token"] = getCookie("_token");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", API_GATEWAY + endpoint, false);
    xhr.setRequestHeader('Authorization', 'Bearer ' + data["token"]);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    if (xhr.status === 201) {
        return JSON.parse(xhr.responseText);
    }
    return null;
};
