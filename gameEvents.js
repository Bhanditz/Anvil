/* 
 * by defining a gameEvent in this file it becomes accessable as public method
 * to the end user. All game events are called on each and every log to stderr 
 */

var gameEvents = {
  'login': function (data, cb) {
    if(data.match(/logged\ in/g)) {
      cb({ 
        'originalData': data
      , 'timeStamp': new Date(data.split(' ')[0] + "T" + data.split(' ')[1])
      , 'playerName': data.split(' ')[3].split('[')[0]
      })
    }
  }

, 'logout': function(data, cb) {
    if(data.match(/lost\ connection\:\ disconnect\.quitting/)) {
      cb({ 
        'originalData': data
      , 'timeStamp': new Date(data.split(' ')[0] + "T" + data.split(' ')[1])
      , 'playerName': data.split(' ')[3].split('[')[0]
      })
    }
  }

}

module.exports = gameEvents
