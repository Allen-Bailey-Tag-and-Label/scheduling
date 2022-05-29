import { connect } from '@lib/mongodb';
import { excelDateToJSDate } from '@lib/utilities';

export async function post({ request }) {
  // await mongodb connection
  const connection = await connect();

  // destructure request
  const { openOrders, routings } = await request.json();

  // remove total row from open orders
  openOrders.pop();

  await Promise.all(
    openOrders.map(async (openOrder) => {
      const query = {
        orderNumber: openOrder.orderNumber,
        lineNumber: openOrder.lineNumber
      };
      const options = {
        upsert: true
      };

      // sanitize dates
      ['orderDate', 'originalDate', 'rescheduleDate'].map(
        (key) => (openOrder[key] = excelDateToJSDate(openOrder[key]))
      );

      await connection
        .db()
        .collection('open-orders')
        .updateOne(query, { $set: openOrder }, options);
    }),
    routings.map(async (routing) => {
      const query = {
        woNumber: routing.woNumber,
        operationSequence: routing.operationSequence
      };
      const options = {
        upsert: true
      };

      // sanitize dates
      ['dateMoved', 'orderDate', 'requestDate'].map(
        (key) => (routing[key] = excelDateToJSDate(routing[key]))
      );

      // sanitize numbers
      ['businessUnit', 'orderNumber', 'operationStatus', 'woStatus'].map(
        (key) => (routing[key] = +routing[key])
      );

      await connection
        .db()
        .collection('routing-sequences')
        .updateOne(query, { $set: routing }, options);
    })
  );

  return { status: 200, body: { success: true } };
}
