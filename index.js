const express = require('express')
const cors = require('cors')
const {MongoClient} = require('mongodb');



const uri = "mongodb+srv://m001-student:m001-student@cluster0.qslea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


async function dbconnector(){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);

        await readDBFile(client)
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

dbconnector().catch(console.error)

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function readDBFile(client){
    const database = await client.db('project_spending').collection('userspending').findOne({user:"user1"})
    console.log('project data:')
    
    console.log(database)
}