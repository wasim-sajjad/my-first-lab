import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

// import 'rxjs/add/operator/map';

import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Book } from './book.model';

@Injectable()
export class BookService {

    constructor(protected http: Http) { }

    findAll(): Observable<Book[]> {
        return this.http.get(`${environment.backenAPIUrl}/library`).pipe(
            map((data) => {
                console.log('data: ', data);
                return <Book[]>data.json();
            })
        );

    }

    findOne(id): Observable<Book> {
        return this.http.get(`${environment.backenAPIUrl}/library/${id}`).pipe(
            map((data) => {
                console.log('data: ', data);
                return <Book>data.json();
            })
        );

    }

    // find(id: number) {
    //     return this.http.get(`${this.routeURL}/find/${id}`).map(data => {
    //         return data.json();
    //     });
    // }

    create(book: Book) {
        return this.http.post(`${environment.backenAPIUrl}/library`, book).pipe(
            map((data) => {
                console.log('data: ', data);
                return <Book>data.json();
            })
        );
    }

    // update(id: Number, user: User) {
    //     return this.__put(`${this.routeURL}/update/${id}`, user).map(data => {
    //         return data.json();
    //     }).catch(this.handleError);
    // }
    update(book, id) {
        return this.http.patch(`${environment.backenAPIUrl}/library/${id}`, book).pipe(
            map((data) => {
                return <Book>data.json();
            })
        );
    }

    // delete(id: Number) {
    //     return this.__delete(`${this.routeURL}/delete/${id}`).map(data => {
    //         return data.json();
    //     });
    // }

    delete(id) {
        return this.http.delete(`${environment.backenAPIUrl}/library/${id}`).pipe(
            map((data) => {
                return <Book>data.json();
            })
        );
    }

}
