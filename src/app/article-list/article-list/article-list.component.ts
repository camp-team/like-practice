import { Component, OnInit } from '@angular/core';
import { ArtileService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';

import * as algoliasearch from 'algoliasearch/lite';
import { QueryParameters } from 'algoliasearch';

const USER_ID = 'CCC';
const searchClient = algoliasearch(
  'AANOJQAMD9',
  'c23c437eaefd2e85366dc5afecdd5af6'
);

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  config = {
    indexName: 'articles',
    searchClient,
  };

  saerchSetting: QueryParameters = {
    query: '',
    page: 0,
    hitsPerPage: 10,
  };

  likeState = {};

  index = searchClient.initIndex('articles');

  list: Article[];
  likedArticleIds: string[];

  constructor(private articleService: ArtileService) {
    this.index.search(this.saerchSetting).then((res) => {
      this.list = res.hits;
    });

    this.articleService.getLikedArticleIds(USER_ID).then((res) => {
      this.likedArticleIds = res;
    });
  }

  visiable: boolean;
  canLoading: boolean = true;

  moreSearch() {
    this.visiable = true;
    this.saerchSetting.page++;
    this.index.search(this.saerchSetting).then((res) => {
      this.list = this.list.concat(res.hits);
      this.visiable = false;
      this.canLoading = !!res.hits.length;
    });
  }

  isLiked(articleId: string): boolean {
    if (this.likeState[articleId]) {
      return this.likeState[articleId].isLieked;
    } else {
      return this.likedArticleIds?.includes(articleId);
    }
  }

  like(articleId: string): Promise<void> {
    console.log(articleId);
    const index = this.list.findIndex((item) => item.id === articleId);
    this.list[index].likeCount++;
    this.likeState[articleId] = {
      isLieked: true,
    };
    return this.articleService.likeArticle(articleId, USER_ID);
  }

  unLike(articleId: string): Promise<void> {
    const index = this.list.findIndex((item) => item.id === articleId);
    this.list[index].likeCount--;
    this.likeState[articleId] = {
      isLieked: false,
    };
    return this.articleService.unLikeArticle(articleId, USER_ID);
  }
  ngOnInit(): void {}
}
