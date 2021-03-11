import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { BooksComponent } from './books/books.component';
import { FormComponent } from './form/form.component';
import { AuthorsComponent } from './authors/authors.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './module/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotToastModule } from '@ngneat/hot-toast';
import { FooterComponent } from './footer/footer.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksComponent,
    FormComponent,
    AuthorsComponent,
    FooterComponent,
    BookDetailComponent,
    LoginComponent,
    RegisterComponent,
    AuthorFormComponent,
    AuthorDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HotToastModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
