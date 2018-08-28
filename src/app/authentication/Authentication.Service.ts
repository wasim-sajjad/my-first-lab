import {User} from './register/user.model';
import { Injectable } from '@angular/core';
//import {Logger} from './signin/logger.model';
import { Observable } from 'rxjs';
import {Http} from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Logger } from './signin/logger.model';
//import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService{
    constructor(protected http: Http,
    private router: Router) { }

    signin(logger: Logger) {
        return this.http.post(`${environment.backenAPIUrl}/login`, logger).pipe(
            map(
                (data) => {
               
               // console.log('data: ', data);



                //console.log('data: ', data);

                const userData = data.json();
                const token = userData.token;
                localStorage.setItem('token', token);
                // 
                //return <User>userData;



                //const userData = data.json();
                //this.router.navigate(['/']);
                    //const signinToken = userData.tokens[0].token;
                    //localStorage.setItem('token', signinToken);
                    //return <User>userData;
                    
                return <User>userData;
            })
        );
    }

    
    create(user: User) {
            return this.http.post(`${environment.backenAPIUrl}/register`, user).pipe(
                map(
                    (data) => {
                        
                        //const userData = data.json();
                        //this.router.navigate(['/']);
                           // const signinToken = userData.tokens[0].token;
                            //localStorage.setItem('token', signinToken);
                            // this.router.navigate(['/books']);
                            ///return <User>userData;
                            
                        //return <User>data.json();
                })
            );
        }
        isAuthenticated(){
            return localStorage.getItem('token') != null;
        }
        logout(){
            localStorage.removeItem('token');
           this.router.navigate(['/signin'])
        }
    }
