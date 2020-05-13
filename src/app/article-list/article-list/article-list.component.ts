import { Component, OnInit } from '@angular/core';
import { ArtileService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article';

import * as algoliasearch from 'algoliasearch/lite';
import { QueryParameters } from 'algoliasearch';

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

  index = searchClient.initIndex('articles');

  list: Article[];

  constructor(private articleService: ArtileService) {
    this.index.search(this.saerchSetting).then((res) => {
      this.list = res.hits;
    });
  }

  visiable: boolean = true;
  moreSearch() {
    this.saerchSetting.page++;
    this.index.search(this.saerchSetting).then((res) => {
      this.list = this.list.concat(res.hits);
      this.visiable = res.hits.length ? true : false;
    });
  }

  ngOnInit(): void {}
}
