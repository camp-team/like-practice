import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Article } from '../interfaces/article';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ArtileService {
  constructor(private db: AngularFirestore) {}

  getLikedArticleIds(uid: string): Promise<string[]> {
    return this.db
      .collectionGroup<{
        uid: string;
        articleId: string;
      }>('likeUsers', (ref) => ref.where('uid', '==', uid))
      .valueChanges()
      .pipe(
        map((res) => res.map((item) => item.articleId)),
        take(1)
      )
      .toPromise();
  }

  getArticleByID(id: String): Observable<Article> {
    return this.db.doc<Article>(`articles/${id}`).valueChanges();
  }

  getArticles(): Observable<Article[]> {
    return this.db.collection<Article>('articles').valueChanges();
  }

  updateArticle(article: Article): Promise<void> {
    return this.db.doc<Article>(`articles/${article.id}`).update(article);
  }

  createArticle(article: Omit<Article, 'id' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    return this.db.doc<Article>(`articles/${id}`).set({
      id,
      createdAt: firestore.Timestamp.now(),
      likeCount: 0,
      ...article,
    });
  }

  deleteArticle(id: String): Promise<void> {
    return this.db.doc<Article>(`articles/${id}`).delete();
  }

  likeArticle(articleId: string, uid: string): Promise<void> {
    return this.db.doc(`articles/${articleId}/likeUsers/${uid}`).set({
      uid,
      articleId,
    });
  }

  unLikeArticle(articleId: string, uid: string): Promise<void> {
    return this.db.doc(`articles/${articleId}/likeUsers/${uid}`).delete();
  }
}
