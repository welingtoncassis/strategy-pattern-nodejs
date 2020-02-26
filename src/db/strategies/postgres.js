const ICrud = require('./../strategies/interfaces/interfaceCrud')

class Postgres extends ICrud {
    constructor(){
        super()
    }

    isConnected() {
        
    }
    create(item) {
        console.log('item salvo no postgres')
    }
}

module.exports = Postgres