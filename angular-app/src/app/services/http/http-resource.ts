import {Observable} from "rxjs";

export interface SearchParams {
    page?: number;
    all?: any;
    search?: string;
    sort?: {
        column: string;
        sort: string;
    }
}

export class SearchParamsBuilder {
    constructor(private serchParams: SearchParams) {}

    makeObject() : any {
        const sParams: any = {
            page: this.serchParams.page + "",
        };
        if (this.serchParams.all) {
            sParams.all = 1;
            delete sParams.page;
        }
        if (this.serchParams.search && this.serchParams.search !== '') {
            sParams.search = this.serchParams.search;
        }
        if (this.serchParams.sort) {
            const sortSymbol = this.serchParams.sort.sort === 'desc' ? '-' : '';
            const columnName = this.serchParams.sort.column;
            sParams.sort = `${sortSymbol}${columnName}`;
        }
        return sParams;
    }
}

export interface HttpResource<T> {

    list(serchParams: SearchParams): Observable<{ data: Array<T>, meta: any }>;

    get(id: number): Observable<T>;

    create(data: T): Observable<T>;

    update(id: number, data: T) : Observable<T>;

    destroy(id: number): Observable<any>;
}