import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { Observable } from "rxjs";

export interface IChartInfo {
    name: string;
    quantity_sold: number
    total_billed: number;
}
@Injectable({
    providedIn: 'root'
})
export class ChartService {
    
    storeId = localStorage.getItem('store_id') as string;
    constructor(private readonly httpClient: HttpClient) { }

    getChartInfo(): Observable<IChartInfo[]> {
        return this.httpClient.get<IChartInfo[]>(`${environment.host}:${environment.port}/${environment.salesAll}/${this.storeId}`);
    }
}