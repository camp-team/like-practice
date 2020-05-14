import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const like = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/likeUsers/{uid}')
  .onCreate((snap, context) => {
    return admin
      .firestore()
      .doc(`articles/${context.params.articleId}`)
      .update('likeCount', admin.firestore.FieldValue.increment(1));
  });

export const unLike = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/likeUsers/{uid}')
  .onDelete((snap, context) => {
    return admin
      .firestore()
      .doc(`articles/${context.params.articleId}`)
      .update('likeCount', admin.firestore.FieldValue.increment(-1));
  });
