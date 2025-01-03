import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environment/environment";
import { Observable } from "rxjs";

export interface IChartInfo {
    productName: string;
    quantitySold: number
    totalBilled: number;
}
@Injectable({
    providedIn: 'root'
})
export class ChartService{

    storeId: string | null = null;
    constructor(private httpClient: HttpClient) { 
        this.storeId = localStorage.getItem('store_id') as string;
    }

    getChartInfo(): Observable<IChartInfo[]> {
        return this.httpClient.get<IChartInfo[]>(`${environment.apiProd}/${environment.productbilling}/${this.storeId}`);
    }
}