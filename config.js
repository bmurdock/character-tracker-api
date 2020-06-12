require('dotenv').config();
module.exports = {
    PORT: 3020,
    DB: `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@helio-ouejx.mongodb.net/character-tracker?retryWrites=true&w=majority`,
    //DB: `mongodb+srv://parker:Password@cluster0-qaxjl.mongodb.net/character-tracker`
}