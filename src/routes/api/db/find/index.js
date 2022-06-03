// imports
import { connect } from '@lib/mongodb';

export async function post({ request }) {
  // await mongodb connection
  connection = await connect();

  // destructure request
  const { collection } = await request.json();

  const docs = await connection.db().collection(collection).find().toArray();

  return { status: 200, body: docs };
}
