import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GenericSearchService {

    constructor(private readonly httpClient: HttpClient) {}

    storeId = localStorage.getItem('store_id');

    genericBaseSearch<T>(router:string, search: string):Observable<T> {
       return this.httpClient.get<T>(`${environment.apiProd}/${router}/${this.storeId}/${search}`)
    }
    
}