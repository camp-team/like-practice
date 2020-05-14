export { addRecord, updateRecord, deleteRecord } from './algolia.function';
export { like, unLike } from './like.function';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
