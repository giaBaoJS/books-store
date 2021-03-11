import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorsService } from '../authors.service';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
})
export class AuthorFormComponent implements OnInit {
  id: string;
  isUpdate = false;
  errors = '';
  authorForm: FormGroup;
  constructor(
    private authorService: AuthorsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toast: HotToastService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if (this.id !== null) this.isUpdate = true;
  }

  ngOnInit() {
    this.authorForm = this.formBuilder.group({
      name: [null, Validators.required],
      dob: [null, Validators.required],
      nationality: [null, Validators.required],
      story: [null, Validators.required],
    });
    if (this.isUpdate) this.getAuthorDetail();
  }

  getAuthorDetail() {
    this.authorService.getAuthorDetail(this.id).subscribe((value) => {
      this.authorForm.patchValue(value);
    });
  }
  onSubmit(authorData: Author) {
    if (this.authorForm.invalid) {
      return;
    }
    if (!this.isUpdate) {
      this.authorService
        .addAuthor(authorData)
        .pipe(
          this.toast.observe({
            loading: 'Pending...',
            success: 'Add Author Success',
            error: this.errors,
          })
        )
        .subscribe(
          () => {
            this.router.navigateByUrl('/authors');
          },
          (err) => (this.errors = err.error.message)
        );
    }
    else{
      this.authorService
      .updateAuthor(this.id,authorData)
      .pipe(
        this.toast.observe({
          loading: 'Pending...',
          success: 'Updated Author Success',
          error: this.errors,
        })
      )
      .subscribe(
        () => {
          this.router.navigateByUrl('/authors');
        },
        (err) => (this.errors = err.error.message)
      );
    }
  }
}
