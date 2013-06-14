var Anvil = require('./anvil')
  , app = new Anvil('-Xms512M -Xmx756M')

app.login(function (info, server) {
  server.say("welcome to my Anvil server " + info.playerName)
  server.tell(info.playerName, "feel free to make pull requests "+
              "to this script at github.com/dpeticol/anvil")
})
