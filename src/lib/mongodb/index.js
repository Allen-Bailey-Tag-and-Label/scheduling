// imports
import 'dotenv/config';
import { MongoClient } from 'mongodb';

// connection options
const options = { useUnifiedTopology: true, useNewUrlParser: true };

// create a new MongoClient
let client;

// initial connection variable
let connection;

// create connection function
const connect = async () => {
  if (client === undefined) client = new MongoClient(process.env.MONGODB_URL, options);
  if (connection === undefined) connection = await client.connect();
  return client;
};

// close connection
const close = async () => client.close();

export { close, connect };
