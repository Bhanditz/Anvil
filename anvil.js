var exec = require('child_process').exec
  , child

child = exec('java -jar -Xms512M -Xmx756M minecraft_server.jar nogui');

/* data is any output by the server, regex this for events */
child.stderr.on('data', function (data) {
  console.log(data)
  if(data.match(/logged\ in/g)) {
    login(data.split(' ')[3].split('[')[0])
  }
})

/* say will say something from the server to all players */
function say(message) {
  child.stdin.write('/say '+ message + '\n')
}

function login(playerName) {
  console.log('hi')
  say("welcome to my Anvil server " + playerName)
  say("feel free to make pull requests to this script at github.com/dpeticol/anvil")
}
