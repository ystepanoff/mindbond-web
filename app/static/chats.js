function fetchContacts() {

}

document.getElementById("actionAddContactTrigger").addEventListener("click", function() {
    let contactHandle = document.getElementById("actionAddContactInput").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/chats/add_contact", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
           if (xhr.status === 200) {
               let data = JSON.parse(xhr.responseText);
               console.log(data);
           }
        }
    };
    xhr.send(JSON.stringify({ "handle": contactHandle }));
});
