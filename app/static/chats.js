let loadChat = (contact) => {
    let chatContactTextElementTextDiv = document.getElementById("chatContactText");
    chatContactTextElementTextDiv.innerHTML = "<h3>" + contact["handle"] + "</h3>";

    if (approved === false) {
    } else {
    }
    return null;
}

window.onload = () => {
    let userId = parseInt(getCookie("_id"));
    let userToken = getCookie("_token");

    let response = requestEndpoint("/chat/fetch_contacts", {});
    if (response["status"] === 200) {
        let contacts = response["contacts"];
        for (let contact of contacts) {
            let chatListElement = document.getElementById("listChats");

            let contactElement = document.createElement("a");
            contactElement.href = "#";
            contactElement.id = "aContact-" + contact["id"];
            contactElement.onclick = () => loadChat(contact);
            contactElement.className = "d-flex align-items-center";

            let contactElementImageDiv = document.createElement("div");
            contactElementImageDiv.className = "flex-shrink-0";
            contactElementImageDiv.innerHTML = "<img class=\"img-fluid\" " +
                "src=\"/static/images/user.png\" " +
                "alt=\"user img\">";
                //"<span class=\"active\"></span>";
            contactElement.appendChild(contactElementImageDiv);

            let contactElementTextDiv = document.createElement("div");
            contactElementTextDiv.className = "flex-grow-1 ms-3";
            contactElementTextDiv.innerHTML = "<h3>" + contact["handle"] + "</h3>";
            contactElement.appendChild(contactElementTextDiv);

            chatListElement.appendChild(contactElement);
        }
    } else {
        alert("Failed to fetch contacts: " + response["error"]);
    }

    document.getElementById("actionAddContactTrigger").addEventListener("click", function () {
        let response = requestEndpoint("/chat/add_contact", {
            "handle": document.getElementById("actionAddContactInput").value
        });
        let data = JSON.parse(response);
        if (data["status"] !== 201) {
            alert("Failed to add contact: " + data["error"]);
        }
    });
};
