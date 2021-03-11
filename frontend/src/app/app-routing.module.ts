import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'books/detail/:id', component: BookDetailComponent },
  { path: 'books/add', component: FormComponent },
  { path: 'books/update/:id', component: FormComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors/add', component: AuthorFormComponent},
  { path: 'authors/update/:id', component: AuthorFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
