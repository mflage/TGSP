var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function getPlayers() {
  var url = "http://squash.tgsp.no/api/getPlayers.php";

  xhrRequest(url, "GET",
    function(responseText) {
      var json = JSON.parse(responseText);
      var dictionary = {
        "KEY_PLAYER1": json.player1,
        "KEY_PLAYER2": json.player2
      };
      
      Pebble.sendAppMessage(dictionary,
        function(e) {
          console.log("Information sent successfully");
        },
        function(e) {
          console.log("Error sending info");
        });
    });
}

// Listen for when the watchface is opened
Pebble.addEventListener('ready', 
  function(e) {
    console.log("PebbleKit JS ready!");
    getPlayers();
  }
);

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
  function(e) {
    console.log("AppMessage received!");
  }                     
);
