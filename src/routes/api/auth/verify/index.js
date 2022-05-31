// imports
import { verify } from '@lib/jwt';
import { signin } from '../signin';

export async function post({ request }) {
  // destructure request
  let { token } = await request.json();

  try {
    // verify token
    const { username } = await verify(token);

    // get token
    ({ token } = await signin({ username }));

    return { status: 200, body: { token } }
  } catch (message) {
    return { status: 400, body: { message } }
  }
}