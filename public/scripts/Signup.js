
function validatePassword(event) {
    event.preventDefault();
    // check if passwords are equal
    var pass = document.getElementById("password").value;
    var pass2 = document.getElementById("confirm_password").value;
    var lowercaseCheck = /[a-z]/;
    var upperCaseCheck = /[A-Z]/;
    var specialCheck = /[^a-zA-Z\d\s:]/;
    var numCheck = /[0-9]/;
    if (!lowercaseCheck.test(pass.trim())) {
        document.getElementById("passError").innerHTML = "Password should include atleast one lowercase letter";
        passError.style.display = "flex";
        return false;

    }
    if (!upperCaseCheck.test(pass.trim())) {
        document.getElementById("passError").innerHTML = "Password should include atleast one uppercase letter";
        passError.style.display = "flex";
        return false;
    }
    if (!specialCheck.test(pass.trim())) {
        document.getElementById("passError").innerHTML = "Password should include atleast one special character";
        passError.style.display = "flex";
        return false;
    }

    if (!numCheck.test(pass.trim())) {
        document.getElementById("passError").innerHTML = "Password should include atleast one digit";
        passError.style.display = "flex";
        return false;
    }

    if (pass.trim().length < 8 | pass.trim().length > 15) {
        document.getElementById("passError").innerHTML = "Password length should be between 8-15 characters";
        passError.style.display = "flex";
        return false;
    }

    if (pass.trim() != pass2.trim()) {
        document.getElementById("passError").innerHTML = "Passwords do not match";
        passError.style.display = "flex";
        return false;
    }

    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: document.getElementById('firstname').value, email: document.getElementById('email').value, password: pass })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = './Login.html';
            } else {
                return response.text(); // Return the error text for further processing
            }
        })
        .then(text => {
            if (text) {
                document.getElementById("passError").innerHTML = text;
                passError.style.display = "flex";
            }
        })
        .catch(error => {
            console.error("Error signing up:", error);
        });
    return false;

}

function offlinevalidatePassword(event) {
    event.preventDefault();
    // check if passwords are equal
    var pass = document.getElementById("password").value;
    var pass2 = document.getElementById("confirm_password").value;
    var lowercaseCheck = /[a-z]/;
    var upperCaseCheck = /[A-Z]/;
    var specialCheck = /[^a-zA-Z\d\s:]/;
    var numCheck = /[0-9]/;
    if (!lowercaseCheck.test(pass.trim())) {
        document.getElementById("passError").innerHTML = "Password should include atleast one lowercase letter";
        passError.style.display = "flex";
        return false;

    }
    if (!upperCaseCheck.test(pass.trim())) {
        document.getElementById("passError").innerHTML = "Password should include atleast one uppercase letter";
        passError.style.display = "flex";
        return false;
    }
    if (!specialCheck.test(pass.trim())) {
        document.getElementById("passError").innerHTML = "Password should include atleast one special character";
        passError.style.display = "flex";
        return false;
    }

    if (!numCheck.test(pass.trim())) {
        document.getElementById("passError").innerHTML = "Password should include atleast one digit";
        passError.style.display = "flex";
        return false;
    }

    if (pass.trim().length < 8 | pass.trim().length > 15) {
        document.getElementById("passError").innerHTML = "Password length should be between 8-15 characters";
        passError.style.display = "flex";
        return false;
    }

    if (pass.trim() != pass2.trim()) {
        document.getElementById("passError").innerHTML = "Passwords do not match";
        passError.style.display = "flex";
        return false;
    }

    signUpUser(document.getElementById('firstname').value, document.getElementById('email').value, document.getElementById('password').value)
    document.getElementById("passError").innerHTML = "You are Offline! Your will be signed up once you are online.";
    passError.style.display = "flex";

    //Ask for notification permissions when the user tries to signup offline
    Notification.requestPermission().then(function (permission) {
    });
    return false;

}

// Wait for the DOM to be loaded before running the script
function signUpUser(name, email, password) {
    // Open a connection to the database.
    var openRequest = indexedDB.open("UsersDB", 1);

    // Create the schema if needed.
    openRequest.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('Users')) {
            db.createObjectStore("Users", { keyPath: "email" });
        }
    };

    openRequest.onerror = function (event) {
        console.error("Error opening database: ", event.target.error);
    };

    // Called when the database has been successfully opened.
    openRequest.onsuccess = function (e) {
        var db = e.target.result;

        // Start a new transaction and get the object store.
        var transaction = db.transaction("Users", "readwrite");
        var store = transaction.objectStore("Users");

        // Make a request to add our newUser object to the object store
        var addRequest = store.add({ name: name, email: email, password: password, status: 'saved' });

        addRequest.onsuccess = function () {
            // The user has been added to the database, handle the success case here
            console.log("User added to the database");
        };

        addRequest.onerror = function (event) {
            // Handle errors that occurred during the add operation.
            console.error("Error adding user: ", event.target.error);
        };
    };
}