const mongodb = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const client = new mongodb.MongoClient(uri);

client.connect((err) => {
    if (!err) {
        console.log('connection created');
    }
    const newDB = client.db("exam");
    newDB.createCollection("users"); // This line i s important. Unless you create collection you can not see your database in mongodb .

    newDB.collection('users').insertOne({
        password: 'password123',
        name: 'Edgar',
        email: 'edgarggamartgo@gmail.com',
        age: 24
    }, (error, result) => {
       if (error) {
         return console.log('Unable to insert user')
       }
     
       console.log(result.ops)

    })

})

   