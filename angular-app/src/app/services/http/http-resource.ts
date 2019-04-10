import {Observable} from "rxjs";

export interface SearchParams {
    page?: number;
    all?: any;
}

export interface HttpResource<T> {

    list(serchParams: SearchParams): Observable<{ data: Array<T>, meta: any }>;

    get(id: number): Observable<T>;

    create(data: T): Observable<T>;

    update(id: number, data: T) : Observable<T>;

    destroy(id: number): Observable<any>;
}