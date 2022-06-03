// imports
import { populate } from '@lib/mongodb';
import { verify } from '@lib/jwt';
import { signin } from '../signin';

export async function post({ request }) {
  // destructure request
  const { token } = await request.json();

  // get username from token
  const { username } = await verify(token);

  // get user
  const user = await signin({ username });

  // populate user roles
  user.roles = await Promise.all(
    user.roles.map(async (_id) => await populate({ _id, collection: 'roles' }))
  );

  // get unique route and populate results
  const routes = await Promise.all(
    [...new Set(...user.roles.map(({ routes }) => routes))].map(
      async (_id) => await populate({ _id, collection: 'routes' })
    )
  );

  return { status: 200, body: { routes } };
}
