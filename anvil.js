/* Anvil framework */
var exec = require('child_process').exec
  , Server = require('./server.js')
  , gameEvents = require('./gameEvents.js')
  , Anvil

/* set up stdin and stderr */
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stderr.resume()
process.stderr.setEncoding('utf8')

Anvil = function(flags) {
  var mc
    , info
    , server
  
  /* define the actions object that will store the function arrays */
  this.actions = {}
  Object.keys(gameEvents).each(function (key) { this.actions[key] = [] })
  
  /* exec the minecraft server as a chil process */
  flags = flags || ""
  mc = exec('java -jar ' + flags + 'minecraft_server.jar nogui')
  
  server = new Server(mc)
  
  /* pipe stdin to the minecraft_server's stdin */
  process.stdin.on('data', function (data) {
    mc.stdin.write(data)
  }
  
  /* start the stderr listener where game events are logged */
  mc.stderr.on('data', function (data) {
    
    /* log the data to stderr as normal */
    process.stderr.write(data)
    
    /* check all the action listeners */
    Object.keys(gameEvents).forEach(function (actionName) {
      gameEvents[actionName](data, function(info) {
        actions[actionName].forEach(function (action) {
          action(info, server)
        })
      })
    })

  })
}

/* construct Anvil's public facing action creating methods */
Object.keys(gameEvents).map(function (name) {
  Anvil.prototype[name] = function (action) {
    if(typeof(action) == 'function') {
      this.actions['login'].push(action);
    }
  }
}
  
module.exports = Anvil
