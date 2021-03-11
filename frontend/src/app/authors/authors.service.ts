import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author';
@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>('http://localhost:5000/authors');
  }

  addAuthor(authorData: Author) {
    return this.http.post('http://localhost:5000/authors/add', authorData);
  }

  getAuthorDetail(id: string): Observable<Author> {
    return this.http.get<Author>('http://localhost:5000/authors/' + id);
  }
  deleteAuthor(id: string) {
    return this.http.delete('http://localhost:5000/authors/' + id);
  }
  updateAuthor(id: string, authorData: Author) {
    return this.http.patch('http://localhost:5000/authors/' + id, authorData);
  }
}
