function validatePassword(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    loginUser(email, password);
}

function loginUser(email, password) {
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = './Home.html';
        } else {
            document.getElementById("passError").innerHTML = "Invalid email or password";
            passError.style.display = "flex";
        }
    })
    .catch(error => {
        console.error("Error logging in:", error);
    });
}