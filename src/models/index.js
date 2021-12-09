// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserInfo, ROI } = initSchema(schema);

export {
  UserInfo,
  ROI
};