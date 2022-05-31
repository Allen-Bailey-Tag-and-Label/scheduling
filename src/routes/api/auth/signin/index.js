import bcrypt from 'bcryptjs';
import { sign } from '@lib/jwt';
import { connect } from '@lib/mongodb';

const signin = async ({ password, username }) => {
  // await mongodb connection
  const connection = await connect();

  // find user in db
  const user = await connection.db().collection('users').findOne({ username: {$regex: new RegExp(username, 'i')}})

  // check if user === null
  if (user === null) throw 'Credentials could not be verified.  Please try again.';

  // compare password if provided
  if (password !== undefined && !bcrypt.compareSync(password, user.password)) throw 'Credentials could not be verified.  Please try again.';

  // destructure user
  const { firstName, lastName, on, roles } = user;

  // get jwt token
  const token = await sign({ firstName, lastName, username, on, roles });

  return { ...user, token };
}

export async function get() {
  return { status: 200, body: {}}
}

export async function post({ request }) {
  // destructure request
  const { password, username } = await request.json();

  try {
    const { on, token } = await signin({ password, username })

    return { status: 200, body: { on, token } };
  } catch (message) {
    return { status: 401, body: { message } }
  }
}

export { signin };