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
  await Promise.all(users.map(async user => {
    const userRoles = user.roles.map(userRole => roles.find(role => userRole === role.name)._id)
    await connection.db().collection('users').updateOne({ _id: user._id }, { $set: { roles: userRoles }})
  }));

  return { status: 200, body : {} }
}