//classe de erro personalizada
class NotImplementedException extends Error {
    constructor() {
        super('Not implemented Exception')
    }
}

//simulando uma interface pois no js não tem interface
class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }
}

//estrategias
class MongoDB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('item salvo no mongo')
    }
}

class Postgres extends ICrud {
    constructor(){
        super()
    }

    create(item) {
        console.log('item salvo no postgres')
    }
}

//classe abstrata de contexto
class ContextStrategy {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }
    read(item) {
        return this._database.read(item)
    }
    update(id, item) {
        return this._database.update(id, item)
    }
    delete(id) {
        return this._database.delete(id)
    }
}
//instanciando o contexto
const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()
contextMongo.read()

const contextPostgres = new ContextStrategy(new Postgres())