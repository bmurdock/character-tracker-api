require('dotenv').config();
module.exports = {
    PORT: 3000,
    DB: `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@helio-ouejx.mongodb.net/character-tracker?retryWrites=true&w=majority`
}