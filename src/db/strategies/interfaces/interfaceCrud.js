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

    isConnected() {
        throw new NotImplementedException() 
    }

    connect() {
        throw new NotImplementedException() 
    }
}

module.exports = ICrud