var htmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <title>PopUp</title>
    <link rel="stylesheet" href="./css/Popup.css">
    <script src="/scripts/Checkout.js"></script>
  </head>
  <body>
    <div class="main">
      <div class="background">
        <p class="headerMessage">{headerMessage}</p>
        <p class="message">{message}</p>
      </div>
      <div class="mainButton">
        <button class="button1" onClick="hidePopup()">No</button>
        <button class="button2" onClick="Logout()">Yes</button>
      </div>
    </div>
  </body>
</html>`;

function generateHTML(headerMessage, message) {
  return htmlTemplate.replace('{headerMessage}', headerMessage).replace('{message}', message);
}

function confirmation(headerMessage, message) {
  var popup = document.createElement('div');
  popup.className = 'popup-container';
  popup.innerHTML = generateHTML(headerMessage, message);
  document.body.appendChild(popup);
}

function alert(headerMessage, message) {
  var popup = document.createElement('div');
  popup.className = 'popup-container';
  var html = generateHTML(headerMessage, message);
  // Remove the second button by replacing its entire tag with an empty string
  html = html.replace('<button class="button1" onClick="hidePopup()">No</button>', '').replace('<button class="button2" onClick="Logout()">Yes</button>', '<button class="button2" onClick="hidePopup()">Ok</button>');
  popup.innerHTML = html;
  document.body.appendChild(popup);
}

function Logout() {

    // Check the user's response
        // User clicked "OK"


  var popup = document.querySelector('.popup-container');
  if (popup) {
    window.location.href = '../Login.html'
    popup.parentNode.removeChild(popup);
  }
 
}

function hidePopup() {
  var popup = document.querySelector('.popup-container');
  if (popup) {
    popup.parentNode.removeChild(popup);
  }
 
}