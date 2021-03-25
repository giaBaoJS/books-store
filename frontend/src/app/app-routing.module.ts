import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { FormComponent } from './form/form.component';
import { RoleGuardService } from './role-guard-service.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  {
    path: 'books/detail/:id',
    component: BookDetailComponent,
  },
  {
    path: 'books/add',
    component: FormComponent,
    canActivate: [RoleGuardService],
  },
  {
    path: 'books/update/:id',
    component: FormComponent,
    canActivate: [RoleGuardService],
  },
  { path: 'authors', component: AuthorsComponent },
  {
    path: 'authors/detail/:id',
    component: AuthorDetailComponent,
    canActivate: [RoleGuardService],
  },
  {
    path: 'authors/add',
    component: AuthorFormComponent,
    canActivate: [RoleGuardService],
  },
  {
    path: 'authors/update/:id',
    component: AuthorFormComponent,
    canActivate: [RoleGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
