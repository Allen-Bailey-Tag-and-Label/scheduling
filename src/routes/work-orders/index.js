import { connect } from '@lib/mongodb';

export async function get() {
  // await mongodb connection
  const connection = await connect();

  // find all open orders
  const [openOrders, routings] = await Promise.all(
    ['open-orders', 'routing-sequences'].map(
      async (collection) => await connection.db().collection(collection).find().toArray()
    )
  );

  return { status: 200, body: { openOrders, routings } };
}
