import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/books';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:5000/posts');
  }

  addBook(bookData: Book) {
    return this.http.post('http://localhost:5000/posts', bookData);
  }

  getBookDetail(id: string): Observable<Book> {
    return this.http.get<Book>('http://localhost:5000/posts/' + id);
  }
  deleteBook(id: string) {
    return this.http.delete('http://localhost:5000/posts/' + id);
  }
  updateBook(id: string, bookData: Book) {
    return this.http.patch('http://localhost:5000/posts/' + id, bookData);
  }
}
