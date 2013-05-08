var Server = function(mc) {
  this.mc = mc
}
Server.prototype = {  
  say = function(message) {
    mc.stdin.write('/say '+ message + '\n')
  }

, tell = function() {
    mc.stdin.write('/tell ' + playerName + ' ' + message + '\n')
  }
}

module.exports = Server
