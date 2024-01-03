let sendMessage = (userFromId, userToId, message) => {
    let response = requestEndpoint("/chat/send", {
        "userFromId": userFromId,
        "userToId": userToId,
        "message": message
    });
    console.log(response);
}

let loadChat = (contact) => {
    let userId = parseInt(getCookie("_id"));

    let chatContentDiv = document.getElementById('chatContentDiv');
    chatContentDiv.innerHTML = "";

    let messageHead = document.createElement("div");
    messageHead.className = "msg-head";
    messageHead.innerHTML =
        '<div class="row">' +
        '   <div class="col-8">' +
        '       <div class="d-flex align-items-center">' +
        '           <div class="flex-shrink-0">' +
        '               <img class="img-fluid" src="{{ url_for(\'static\', filename=\'images/user.png\') }}" alt="user img" />' +
        '           </div>' +
        '           <div id="chatContactText" className="flex-grow-1 ms-3">' +
        '               <h3>' + contact["handle"] + '</h3>' +
        '           </div>' +
        '       </div>' +
        '   </div>' +
        '</div>';


    // TODO: create the following structure:
    // <div className="msg-head">
    //     <div className="row">
    //         <div className="col-8">
    //             <div className="d-flex align-items-center">
    //                 <div className="flex-shrink-0">
    //                     <img className="img-fluid"
    //                          src="{{ url_for('static', filename='images/user.png') }}"
    //                          alt="user img">
    //                 </div>
    //                 <div id="chatContactText" className="flex-grow-1 ms-3">
    //                     <h3>Pasha Celluloid</h3>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="col-4">
    //             <ul className="moreoption">
    //                 <li className="navbar nav-item dropdown">
    //                     <a className="nav-link dropdown-toggle" href="#" role="button"
    //                        data-bs-toggle="dropdown" aria-expanded="false"><i
    //                         className="fa fa-ellipsis-v" aria-hidden="true"></i></a>
    //                     <ul className="dropdown-menu">
    //                         <li><a className="dropdown-item" href="#">Action</a></li>
    //                         <li><a className="dropdown-item" href="#">Another action</a></li>
    //                         <li>
    //                             <hr className="dropdown-divider">
    //                         </li>
    //                         <li><a className="dropdown-item" href="#">Something else here</a>
    //                         </li>
    //                     </ul>
    //                 </li>
    //             </ul>
    //         </div>
    //     </div>
    // </div>
    //
    //
    // <div className="modal-body">
    //     <div className="msg-body">
    //         <ul>
    //             <li className="message_from">
    //                 <p> Hey, Are you there? </p>
    //                 <span className="time">10:06 am</span>
    //             </li>
    //             <li className="message_from">
    //                 <p> Hey, Are you there? </p>
    //                 <span className="time">10:16 am</span>
    //             </li>
    //             <li className="message_to">
    //                 <p>yes!</p>
    //                 <span className="time">10:20 am</span>
    //             </li>
    //             <li className="message_from">
    //                 <p> Hey, Are you there? </p>
    //                 <span className="time">10:26 am</span>
    //             </li>
    //             <li className="message_from">
    //                 <p> Hey, Are you there? </p>
    //                 <span className="time">10:32 am</span>
    //             </li>
    //             <li className="message_to">
    //                 <p>How are you?</p>
    //                 <span className="time">10:35 am</span>
    //             </li>
    //             <li>
    //                 <div className="divider">
    //                     <h6>Today</h6>
    //                 </div>
    //             </li>
    //
    //             <li className="message_to">
    //                 <p> yes, tell me</p>
    //                 <span className="time">10:36 am</span>
    //             </li>
    //             <li className="message_to">
    //                 <p>yes... on it</p>
    //                 <span className="time">just now</span>
    //             </li>
    //
    //         </ul>
    //     </div>
    // </div>
    //
    //
    // <div className="send-box">
    //     <form>
    //         <input type="text" id="actionNewMessageInput" className="form-control" aria-label="message…"
    //                placeholder="Write message…">
    //
    //             <button type="button" id="actionNewMessageTrigger"><i className="fa fa-paper-plane"
    //                                                                   aria-hidden="true"></i> Send
    //             </button>
    //     </form>
    // </div>

    let chatContactTextElementTextDiv = document.getElementById("chatContactText");
    chatContactTextElementTextDiv.innerHTML = "<h3>" + contact["handle"] + "</h3>";

    let actionNewMessageInputElement = document.getElementById("actionNewMessageInput");
    let actionNewMessageTriggerElement = document.getElementById("actionNewMessageTrigger");
    actionNewMessageInputElement.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            sendMessage(userId, contact["userId"], document.getElementById("actionNewMessageInput").value);
        }
        return true;
    });
    actionNewMessageTriggerElement.addEventListener("click", () => {
        sendMessage(userId, contact["userId"], document.getElementById("actionNewMessageInput").value);
        return true;
    });

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

    }

    return null;
}

let populateContactList = (contacts) => {
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
};

window.onload = () => {
    let userId = parseInt(getCookie("_id"));

    let response = requestEndpoint("/chat/fetch_contacts", {});
    if (response["status"] === 200) {
        populateContactList(response["contacts"]);
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
