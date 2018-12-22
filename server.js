const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controllers/api')

const app = express()

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
}
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static('public', options))

app.post('/api/data', controller.postData);
app.get('/api/data', controller.getData);
app.get('/api/folders', controller.getGameFolders)
app.post('/api/games/:gameid', controller.updateData);
app.get('/api/games/:gameid', controller.gameCall);

app.listen(32360, () => console.log('Example app listening on port 32360!'))

// for( var i = 0 ; i < 1000; i ++ ){
//     var randomState = Math.floor(Math.random() * Math.floor(4)) + 1;
//     console.log( randomState );
//     if( randomState == 4 ) break;
// }

