# Anvil.js

This is the node script that runs my minecraft server on ```peticol.as```. Slowly building out into a framework called anvil that will allow scripting for minecraft servers usuing javascript. Actual scripting is taking place in ```app.js```.

### Currently the server
* says a welcome message

### In the future I'd like to
* create an assasins game, reward players for killing other players assigned
* reward players with gold, diamond, weapons on correct kills

__This needs lots of work so feel free to pull request__

# How does it work?

## anvil.js

This is the main controller. It's job is to start the minecraft server as a child process and wrap stdio. It also iterates through game events on input and actions defined in app.js as a response.

_TODO:_
* Kill the child process when the parent dies

## gameEvents.js

This is an object literal of potential game events. The key, is the name of the function that will be available to the end user in app.js. The value is a function thats passed data (the most recent line of output logged) and a call back function. The functions job is to identify if it's the data is describing the desired event, parse that line of data for relevant data, and pass it in an object literal to the callback.

This file was designed to be easily extensible with additional and custom events by people who are better at regex than myself.

_TODO:_
* player kills another player
* player killed by some enemy
* player burns in lava
* player falls to death
* player drowns

## server.js

Similar to gameEvent.js, this module is an instantiable object of responses that the end user can use in app.js. The ```mc``` object passed in is the chils minecraft server process. ```mc.stdin.write`` will write to the stdin of the minecraft server and speak on behalf of the server. Thus it can do anything the server can do.

_TODO:_
* kill a player
* change the weather
* change the time of day
* give an item
* give experience
* change game mode of a player

## app.js

Look at the sample to get a good idea of this. Basically it's Express style. On some event defined in gameEvents, do something with an anonymous function passed the data that parsed in gameEvent.js and respond with the server object defined in server.js.
