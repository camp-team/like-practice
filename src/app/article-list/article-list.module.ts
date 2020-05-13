import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListRoutingModule } from './article-list-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { VisibleDirective } from './visible.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ArticleListComponent, VisibleDirective],
  imports: [CommonModule, ArticleListRoutingModule, MatProgressSpinnerModule],
})
export class ArticleListModule {}
