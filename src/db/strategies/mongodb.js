const ICrud = require('./../strategies/interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'desconectado',
    1: 'conectado',
    2: 'conectando',
    3: 'desconectando',
}
class MongoDB extends ICrud {
    constructor() {
        super()
        this._driver = null;
        this._herois = null;
    }

    connect() {
        Mongoose.connect('mongodb://herois_app:12345@localhost:27017/herois',
            { useNewUrlParser: true, useUnifiedTopology: true },
            function (error) {
                if (!error) return;
                console.log('Falha na conexão!', error)
            }
        )

        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('database rodando!!'))

    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if(state === 'conectado') return state;

        if(state !== 'conectando') return state;

        await new Promise(resolve => setTimeout(resolve,1000))
        
        return STATUS[this._driver.readyState]

    }

    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        this._herois = Mongoose.model('herois', heroiSchema)
    }

    async create(item) {
        const resultCadastrar = await model.create({
            nome: 'Flash',
            poder: 'Velocidade'
        })
        console.log('Result cadastrar', resultCadastrar )
    }
}

module.exports = MongoDB