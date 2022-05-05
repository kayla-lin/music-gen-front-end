# GDSC Music Generation

See: https://kayla-lin.github.io/music-gen-front-end/

[![Image from Gyazo](https://i.gyazo.com/80d8c5d78df8ebd63f7cbb613b3cb731.png)](https://gyazo.com/80d8c5d78df8ebd63f7cbb613b3cb731)

[![Music Visualizer](https://i.gyazo.com/73ed4ab1c54c012c06213befdeab30a5.png)](https://gyazo.com/73ed4ab1c54c012c06213befdeab30a5)

This is the front-end (no AI functionality) for GDSC's 2-semester-long community tech project. This interface will allow users to create their own artificial intelligence created music. Users can either upload their own sample to base the song on, or they can select from the provided options.

To see the website with a functioning AI model, visit: https://ur-gdsc-music.github.io/.
Currently, the model will only generate classical music, no matter the input you use.

## Technologies
This is a React application created with help from:
* Create React App
* Web Audio API & Canvas API
* React Spring
* Sample audio from: https://www.sessions.blue/

## Setup
```
git clone git://kayla-lin.github.io/music-gen-front-end.git
cd music-gen-front-end
npm install
```
## Running
```
npm start
```
Your website should open to http://localhost:3000/
