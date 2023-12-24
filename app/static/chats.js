let sendMessage = (userFromId, userToId, message) => {
    console.log(userFromId, userToId, message);
}

let loadChat = (contact) => {
    let userId = parseInt(getCookie("_id"));

    let chatContactTextElementTextDiv = document.getElementById("chatContactText");
    chatContactTextElementTextDiv.innerHTML = "<h3>" + contact["handle"] + "</h3>";

    // TODO: handle unapproved contacts
    if (contact["approved"] === false) {
    } else {
    }

    let response = requestEndpoint("/chat/find", {
        "contactId": contact["userId"],
    });

    if (response["status"] === 200) {
        let data = response["data"];
        let chatId = data["chatId"];

        // TODO: load messages
        document.getElementById("actionNewMessageInput").addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                sendMessage(userId, contact["userId"], document.getElementById("actionNewMessageInput").value);
            }
        });
        document.getElementById("actionNewMessageTrigger").addEventListener("click", () => {
            sendMessage(userId, contact["userId"], document.getElementById("actionNewMessageInput").value);;
        });
    }

    return null;
}

window.onload = () => {
    let userId = parseInt(getCookie("_id"));

    let response = requestEndpoint("/chat/fetch_contacts", {});
    if (response["status"] === 200) {
        let contacts = response["contacts"];
        if (typeof contacts === "undefined") {
            contacts = [];
        }
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
        if (response["status"] !== 201) {
            alert("Failed to add contact: " + response["error"]);
        } else {
            let contactId = response["contactId"];
            response = requestEndpoint("/chat/create", {
                "user1Id": userId,
                "user2Id": contactId
            });
            if (response["status"] !== 201) {
                alert("Failed to create chat: " + response["error"]);
            }
        }
    });
};
