const assert = require('assert');
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gavião Negro',
    poder: 'flexas'
}
describe('Postgres Strategy', function(){
    this.timeout(Infinity);
    this.beforeAll(async function() {
        await context.connect()
    })
    it('Postgres Connection', async function(){
        const result = await context.isConnected();
        assert.equal(result, true);
    } )
    it('cadastrar', async function() {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function() {
        const [ primeraPosicaoDaListaResulte ] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete primeraPosicaoDaListaResulte.id
        assert.deepEqual(primeraPosicaoDaListaResulte, MOCK_HEROI_CADASTRAR)
    })
})