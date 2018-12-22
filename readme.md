# API Demo Server
## Installation 

```sh
$ cd your-download-part
$ npm install
```

## Usage
Put the games or activities files under `public/games`
You can test many games at the same time, each game must be a directory :
```
public/games
├── puzzle-foo
├── count-bar
├── jump-foo
└── read-and-learn
```

Run the server using
```sh
$ node server.js
```

Run the server with hot reloading when a file has changed
```sh
$ npm run dev
```

then open [http://localhost:32360/](http://localhost:32360/)

Use the server to run the game or activity to simulate the same platform environment

## Use case
- The server will inject the selected game in an iframe to test it. You can switch easily between games.  
- The server will expose an API service that can be used by the game.  
- The API data can be controlled via the html form, you can change :  
    - The return code
    - The child data
    - The intro video data
    - The allowed domains (localhost or * (allow from all))
    - The game custom data


## Enjoy
[ZidoWorld Inc](https://zidoworld.com)
