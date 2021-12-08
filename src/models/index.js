// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ROI } = initSchema(schema);

export {
  ROI
};