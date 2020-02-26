const ICrud = require('./../strategies/interfaces/interfaceCrud')

class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('item salvo no mongo')
    }
}

module.exports = MongoDB