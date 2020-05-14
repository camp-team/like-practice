import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const algoliasearch = require('algoliasearch');

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('articles');

export const addRecord = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onCreate((snap, context) => {
    const data = snap.data() as {
      id: string;
      title: string;
      body: string;
      public: boolean;
      createdAt: admin.firestore.Timestamp;
    };
    const value = {
      ...data,
      objectID: data.id,
      createdAt: data.createdAt.toMillis(),
    };
    return index.saveObject(value);
  });

export const updateRecord = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onUpdate((snap, context) => {
    const data = snap.after.data() as {
      id: string;
      title: string;
      body: string;
      public: boolean;
      createdAt: admin.firestore.Timestamp;
    };
    const value = {
      ...data,
      objectID: data.id,
    };
    return index.saveObject(value);
  });

export const deleteRecord = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onDelete((snap, context) => {
    const data = snap.data() as {
      id: string;
      title: string;
      body: string;
      public: boolean;
      createdAt: admin.firestore.Timestamp;
    };
    return index.deleteObject(data.id);
  });
