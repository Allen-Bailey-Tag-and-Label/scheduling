// imports
import { connect } from '@lib/mongodb';
import { verify } from '@lib/jwt';
import { signin } from '../signin'

let connection;

const getRoles = async () => await connection.db().collection('roles').find().toArray();
const getRoutes = async () => await connection.db().collection('routes').find().toArray();
const getUser = async (token) => {
  // verify jwt
  const { username } = await verify(token);

  return await signin({ username });
};

export async function post({ request }) {
  // await mongodb connection
  connection = await connect();

  // destructure request
  const { token } = await request.json();
  
  // get roles, routes & user
  let [ roles, routes, user ] = await Promise.all([getRoles(), getRoutes(), getUser(token)]);

  user.roles = user.roles.map(_id => {
    const role = roles.find(role =>{ 
      console.log({ _id, role})
      return role._id === _id 
    })
    console.log(role?._id)
    return role?._id
  })

  console.log(user.roles)

  return { status: 200, body: { roles, routes, user } }
}