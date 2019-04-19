import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FirebaseAuthProvider} from "../auth/firebase-auth";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/observable/fromPromise";
import {flatMap} from "rxjs/operators";

interface Customer {
    name: string;
    email: string;
    photo: null | File;
}

/*
  Generated class for the CustomerHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerHttpProvider {

    constructor(
        public http: HttpClient,
        private firebaseAuth: FirebaseAuthProvider
    ) {
        console.log('Hello CustomerHttpProvider Provider');
    }

    create(data: Customer): Observable<any> {
        const formData = this.formDataToSend(data);
        return fromPromise(this.firebaseAuth.getToken())
            .pipe(
                flatMap(token => {
                    formData.append('token', token);
                    return this.http.post<{ token: string }>
                    ('http://localhost:8000/api/customers', formData)
                })
            );
    }

    private formDataToSend(data: Customer) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);

        if (data.photo) {
            formData.append('photo', data.photo);
        }

        return formData;
    }
}