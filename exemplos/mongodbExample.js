const Mongoose = require('mongoose')
Mongoose.connect('mongodb://herois_app:12345@localhost:27017/herois',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error) {
        if (!error) return;
        console.log('Falha na conexão!', error)
    }
)

const connection = Mongoose.connection
connection.once('open', () => console.log('database rodando!!'))

/*

const state = connection.readyState
console.log('state', state)

0: desconectado
1: conectado
2: conectando
3: desconectando

*/

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
const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Flash',
        poder: 'Velocidade'
    })
    console.log('Result cadastrar', resultCadastrar )

    const listItens = await model.find()
    console.log(listItens)
}

main()