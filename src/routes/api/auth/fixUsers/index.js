// imports
import { connect } from '@lib/mongodb';

export async function get() {
  // await mongodb connection
  const connection = await connect();

  // find roles
  const roles = await connection.db().collection('roles').find().toArray();

  // find users
  const users = await connection.db().collection('users').find().toArray();

  // fix all user roles
  await Promise.all(
    users.map(async (user) => {
      // fix number fields
      ['ennisId', 'extension'].map((key) => (user[key] = +user[key]));

      // fix dates
      ['hireDate'].map((key) => (user[key] = new Date(+user[key])));

      // fix roles
      user.roles = user.roles.map((name) => roles.find((role) => name === role.name)._id);

      await connection.db().collection('users').updateOne({ _id: user._id }, { $set: user });
    })
  );

  return { status: 200, body: {} };
}
