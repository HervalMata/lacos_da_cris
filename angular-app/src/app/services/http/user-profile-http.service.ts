import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import {User} from "../../model";
import {map} from "rxjs/operators";

interface Profile {
    name?: string;
    email?: string;
    password?: string;
    photo?: File | false | null;
    token?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserProfileHttpService {

    private bsseUrl = `${environment.api.url}/profile`;
    private token = this.authService.getToken();

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
    }

    get(id: number): Observable<User> {
        return this.http.get<{ data: User }>(`${this.bsseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
            .pipe(
                map(response => response.data)
            );
    }

    update(data: Profile): Observable<User> {
        const formData = this.formDataToSend(data);

        return this.http.post<{ data: User }>(this.bsseUrl, formData)
            .pipe(
                map(response => response.data)
            );
    }

    private formDataToSend(data: Profile) {
        const dataKeys = Object.keys(data);

        this.deletePhotoKey(dataKeys);

        const formData = new FormData();
        for (const key of dataKeys) {
            if (data[key] !== '' && data[key] !== null) {
                formData.append(key, data[key])
            }
        }

        if (data.photo instanceof File) {
            formData.append('photo', data.photo);
        }

        if (data.photo === null) {
            formData.append('remove_photo', '1');
        }

        formData.append('_method', 'PATCH');
        return formData;
    }

    private deletePhotoKey(array) {
        array.splice(array.indexOf('photo'), 1);
    }
}
