import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Article } from '../interfaces/article';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ArtileService {
  constructor(private db: AngularFirestore) {}

  getArticle(id: String): Observable<Article> {
    return this.db.doc<Article>(`'articles/${id}'`).valueChanges();
  }

  updateArticle(article: Article): Promise<void> {
    return this.db.doc<Article>(`'articles/${article.id}'`).update(article);
  }

  createArticle(article: Omit<Article, 'id' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();
    return this.db.doc<Article>(`'articles/${id}'`).set({
      id,
      createdAt: firestore.Timestamp.now(),
      ...article,
    });
  }

  deleteArticle(id: String): Promise<void> {
    return this.db.doc<Article>(`'articles/${id}'`).delete();
  }
}
