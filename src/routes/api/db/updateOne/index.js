// imports
import { connect } from '@lib/mongodb';
import { ObjectId } from 'mongodb';

export async function post({ request }) {
  // await mongodb connection
  connection = await connect();

  // destructure request
  const { collection, _id, update } = await request.json();

  const doc = await connection
    .db()
    .collection(collection)
    .updateOne({ _id: ObjectId(_id) }, { $set: update });

  return { status: 200, body: doc };
}
