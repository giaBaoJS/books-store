import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'books/detail/:id', component: BookDetailComponent },
  { path: 'add', component: FormComponent },
  { path: 'update/:id', component: FormComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
