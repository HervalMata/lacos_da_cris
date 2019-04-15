import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, ProductPhoto} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductPhotoHttpService {

    private baseUrl = `${environment.api.url}`;
    private token = window.localStorage.getItem('token');

    constructor(private http: HttpClient) {
    }

    list(productId: number): Observable<{ product: Product, photos: ProductPhoto[] }> {
        return this.http.get<{ data: any }>(this.getBaseUrl(productId))
            .pipe(
                map(response => response.data)
            )
    }

    create(productId: number, files: FileList): Observable<{ product: Product, photos: ProductPhoto[] }> {
        const formData = new FormData();
        const filesArray = Array.from(files);

        filesArray.forEach((file) => {
            formData.append('photos[]', file);
        });

        return this.http.post<any>(this.getBaseUrl(productId), formData);
    }

    update(productId: number, photoId: number, file: File): Observable<ProductPhoto> {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('_method', 'PUT');


        return this.http.post<any>(this.getBaseUrl(productId, photoId), formData)
            .pipe(
                map(response => response.data)
            );
    }

    destroy(productId: number, photoId: number) {
        return this.http.delete(this.getBaseUrl(productId, photoId), {
            headers: {
                'Authorization' : `Bearer ${this.token}`
            }
        });
    }

    private getBaseUrl(productId: number, photoId: number = null): string {
        let baseUrl = `${this.baseUrl}/products/${productId}/photos`;
        if (photoId) {
            baseUrl += `/${photoId}`;
        }
        return baseUrl;
    }


}
