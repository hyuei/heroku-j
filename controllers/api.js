const { readdirSync, statSync } = require('fs')
const { join } = require('path')

// This controller is stateful, it holds a return and the sample data send to the game
const DEFAULT_CODE = 200
const DEFAULT_DATA = require( '../sample.json' );
// The data and the return code can be changed via the html form
var data = cloneDefaultData()
var returnCode = DEFAULT_CODE

module.exports = {

    /**
     * Allow to change data sent to the game.
     * 
     * If default param is sent then the data is restored to sample.json
     */
    postData: function(req, res) {
        console.log('saving data', req.body)
        if(req.body.default) {
            data = cloneDefaultData()
            console.log('default data', data)
            returnCode = DEFAULT_CODE
            res.sendStatus(204)
            return;
        }
        const {code, name, gender, score, origin, enableIntroVideo, lastGameDate, dateOfBirth, introURL, avatar, gameData} = req.body
        returnCode = code || DEFAULT_CODE
        data.displayName = name
        data.gender = gender
        data.score = score
        data.avatar = avatar
        data.lastGameDate = lastGameDate
        data.dateOfBirth = dateOfBirth
        data.config.enableIntroVideo = enableIntroVideo
        data.config.introURL = introURL
        data.config.allowedDomains = origin
        data.data = gameData
        console.log('result data', data)
        res.sendStatus(204)
    },
/**
     * Function called to get the current data and status code.
     * This function differs from gameCall because it does not change its return code.
     * 
     */
    getData: function(req, res) {
        const allData = {
            returnCode : returnCode,
            data: data
        }
        res.json( allData );
    },

    /**
     * return the games in the public/games
     */
    getGameFolders: function(req, res) {
        const gameDirs = getDirectories(join('public', 'games'))
        res.send(gameDirs)
    },

    /**
     * Function called by the game itself, it can be GET or POST.
     * The data and status returned can be modified via the postData function.
     */
    gameCall: function(req, res) {
        var isDbIdRegex = new RegExp("^[0-9a-fA-F]{24}$")
        if ( !isDbIdRegex.test( req.params.gameid ) ) return res.status(500).send( "not a valid game id" );
        console.log( 'Receive game call', req.params.gameid, returnCode );
        if(returnCode !== 200 && returnCode !== '200') {
            res.sendStatus(returnCode);
            return;
        }
        res.status(returnCode)
        let ret = JSON.parse(JSON.stringify(data));
        res.json( ret );
    },

    /**
     * Simulate date posting data to the API.
     * The game can update the score, lastGameDate, gameData
     */
    updateData: function(req,res) {
        var isDbIdRegex = new RegExp("^[0-9a-fA-F]{24}$")
        if ( !isDbIdRegex.test( req.params.gameid ) ) return res.status(500).send( "not a valid game id" );
        
        console.log('Update Data', req.body)
        const {score, lastGameDate, data: gameData} = req.body
        data.score = score || data.score
        data.lastGameDate = lastGameDate || data.lastGameDate
        data.data = gameData || data.data
        res.sendStatus(204)
    }
}

/**
 * Returns an array containing sub directories of the given directory.
 * 
 * @param {string} directory 
 */
function getDirectories(directory){
    return readdirSync(directory).filter(file => statSync(join(directory, file)).isDirectory())
}

function cloneDefaultData() {
    return {...DEFAULT_DATA, config:{...DEFAULT_DATA.config}}
}