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
    return this.http.get<Book[]>(
      'https://6043423ca20ace001728de6e.mockapi.io/api/books'
    );
  }

  addBook(bookData: Book) {
    return this.http.post(
      'https://6043423ca20ace001728de6e.mockapi.io/api/books',
      bookData
    );
  }

  getBookDetail(id): Observable<Book> {
    return this.http.get<Book>(
      'https://6043423ca20ace001728de6e.mockapi.io/api/books/' + id
    );
  }
  deleteBook(id) {
    return this.http.delete(
      'https://6043423ca20ace001728de6e.mockapi.io/api/books/' + id
    );
  }
  updateBook(id, bookData) {
    return this.http.put(
      'https://6043423ca20ace001728de6e.mockapi.io/api/books/' + id,
      bookData
    );
  }
}
