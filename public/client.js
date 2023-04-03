var socket = null;

function connect() {
  var serverUrl;
  var scheme = 'ws';
  var location = document.location;

  if (location.protocol === 'https:') {
    scheme += 's';
  }

  serverUrl = `${scheme}://${location.hostname}:${location.port}`;

  socket = new WebSocket(serverUrl, 'json');

  socket.onmessage = event => {
    const msg = JSON.parse(event.data)
    let string = ''
    msg.data.forEach(s => {
        string += String.fromCharCode(s)
    })
    let message = JSON.parse(string)
    $('#messages').append($('<li>').text(message.name + ':' + message.message))
  }
  $('form').submit(sendMessage);
}

function sendMessage() {
  let name = $('#n').val();
  const msg = { type: 'message', name: name, message: $('#m').val() };
  socket.send(JSON.stringify(msg));
  return false;
}