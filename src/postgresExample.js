//npm install sequelize pg-hstore pg --save2

const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'admin',
    'admin',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifires: false,
        operatorsAliases: false
    }
)

async function main() {
    const Herois = driver.define('heroes', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })
    await Herois.sync()

    const result = await Herois.findAll({raw: true, attributes: ['nome']})
    console.log(result)
}

main()