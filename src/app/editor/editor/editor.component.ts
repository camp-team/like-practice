import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtileService } from 'src/app/services/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
    public: [false],
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArtileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.articleService.createArticle(this.form.value).then(() => {
      this.snackBar.open(' 作成しました', null);
    });
  }
}
