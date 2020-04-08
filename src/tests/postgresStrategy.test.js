const assert = require('assert');
const Postgres = require('../db/strategies/postgres/postgres')
const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema')
const Context = require('../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gavião Negro',
    poder: 'flexas'
}
const MOCK_HEROI_ATUALIZAR = { 
    nome: 'Batman',
    poder: 'dinheiro'
}

let context = {}

describe.only('Postgres Strategy', function(){
    this.timeout(Infinity);
    this.beforeAll(async () => {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete();
        await context.create(MOCK_HEROI_CADASTRAR);
        await context.create(MOCK_HEROI_ATUALIZAR);
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
        const [ primeraPosicaoDaListaResult ] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete primeraPosicaoDaListaResult.id
        assert.deepEqual(primeraPosicaoDaListaResult, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async function() {
        //1 sucesso; 0 erro;
        const [ primeraPosicaoDaBuscaParaAtualizar ] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update(primeraPosicaoDaBuscaParaAtualizar.id, novoItem)
        assert.deepEqual(result, 1)
    })
    it('deletar por id', async function() {
        const [primeiroItemDaBusca] = await context.read({})
        const result = await context.delete(primeiroItemDaBusca.id)
        assert.deepEqual(result, 1)
    })
})