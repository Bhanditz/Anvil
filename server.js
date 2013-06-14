var Server = function(mc) {
  this.mc = mc
}
Server.prototype = {  
  say: function(message) {
    this.mc.stdin.write('/say '+ message + '\n')
  }

, tell: function() {
    this.mc.stdin.write('/tell ' + playerName + ' ' + message + '\n')
  }
}

module.exports = Server
