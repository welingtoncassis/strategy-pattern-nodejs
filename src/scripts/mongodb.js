//docker exec -it mongodb mongo -u herois_app -p 12345 --authenticationDatabase herois

// show dbs

// show collections

// Create

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    nascimento: '1998-01-01'
})

for(let i=0; i<= 10; i++){
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

// Read

db.herois.find().pretty()
db.herois.findOne()
db.herois.find().limit(5).sort({nome: -1})
db.herois.find({nome: 'Flash'}).pretty()
db.herois.count()
db.herois.find({nome: 'Flash'}).limit(1).pretty()

// Update

db.herois.update({_id: ObjectId("5e7d713c9a921102c5e0941d")}, { $set: { nome: 'Mulher Maravilha' } } )

//Delete

db.herois.remove({nome: 'Mulher maravilha'})