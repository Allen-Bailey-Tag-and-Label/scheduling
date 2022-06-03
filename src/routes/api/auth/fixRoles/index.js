// imports
import { connect } from '@lib/mongodb';
import { ObjectId } from 'mongodb';

export async function get() {
  // await mongodb connection
  const connection = await connect();

  // get current roles
  const roles = await connection.db().collection('roles').find().toArray();

  // fix all routes
  await Promise.all(
    roles.map(async ({ _id, routes = [] }) => {
      routes = routes.map(({ _id: _routeId }) => ObjectId(_routeId));
      await connection.db().collection('roles').updateOne({ _id }, { $set: { routes } });
    })
  );

  // fix all safetyItems
  await Promise.all(
    roles.map(async ({ _id, safetyItems = [] }) => {
      safetyItems = safetyItems.map(({ _id: _safetyItemId }) => ObjectId(_safetyItemId));
      await connection.db().collection('roles').updateOne({ _id }, { $set: { safetyItems } });
    })
  );

  return { status: 200, body: {} };
}
