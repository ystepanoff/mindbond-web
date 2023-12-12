document.getElementById("actionAddContactTrigger").addEventListener("click", function() {
    let contactHandle = document.getElementById("actionAddContactInput").value;
    fetch('/chats/add_contact', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "handle": contactHandle })
    });
});
