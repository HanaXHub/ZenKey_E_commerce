var express = require("express");
var cors = require("cors"); // Import the cors middleware
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var port = 8000;

app.use(bodyParser.json());
// Enable CORS for all origins
app.use(cors());

// Define routes
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile("Landing.html", { root: "public/" });
});

app.get("/Landing.html", function(req, res) {
  res.sendFile("Landing.html", { root: "public/" });
});

app.get("/Signup.html", function(req, res) {
  res.sendFile("Signup.html", { root: "public/" });
});

app.get("/Login.html", function(req, res) {
  res.sendFile("Login.html", { root: "public/" });
});

app.get("/Home.html", function(req, res) {
  res.sendFile("Home.html", { root: "public/" });
});

app.get("/Products.html", function(req, res) {
  res.sendFile("Products.html", { root: "public/" });
});

app.get("/Product-view.html", function(req, res) {
  res.sendFile("Product-view.html", { root: "public/" });
});

app.get("/Cart.html", function(req, res) {
  res.sendFile("Cart.html", { root: "public/" });
});

app.get("/Checkout.html", function(req, res) {
  res.sendFile("Checkout.html", { root: "public/" });
});

app.get("/Account.html", function(req, res) {
  res.sendFile("Account.html", { root: "public/" });
});

// Read users from users.json file
function readUsers() {
  var users = [];
  try {
      users = JSON.parse(fs.readFileSync("users.json", "utf8"));
  } catch (err) {
      console.error("Error reading users.json:", err);
  }
  return users;
}

// Write users to users.json file
function writeUsers(users) {
  try {
      fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
      console.error("Error writing to users.json:", err);
  }
}

// Signup route
app.post("/signup", function(req, res) {
  var users = readUsers();
  var newUser = req.body;

  if (users.find(user => user.email === newUser.email)) {
      res.status(400).send("Email already exists");
  } else {
      users.push(newUser);
      writeUsers(users);
      res.status(200).send("User registered successfully");
  }
});

// Login route
app.post("/login", function(req, res) {
  var users = readUsers();
  var { email, password } = req.body;

  var user = users.find(user => user.email === email && user.password === password);
  if (user) {
      res.status(200).send("Login successful");
  } else {
      res.status(401).send("Invalid email or password");
  }
});

// Start the server
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
