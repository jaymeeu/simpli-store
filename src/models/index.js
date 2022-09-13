// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Order, Cart, User, Item } = initSchema(schema);

export {
  Order,
  Cart,
  User,
  Item
};