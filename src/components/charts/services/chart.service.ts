import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { Observable } from "rxjs";

export interface IChartInfo {
    total_billed: number;
    Product: {
        name: string;
    }
}
@Injectable({
    providedIn: 'root'
})
export class ChartService {

    constructor(private readonly httpClient: HttpClient) { }

    getChartInfo(): Observable<IChartInfo[]> {
        return this.httpClient.get<IChartInfo[]>(`${environment.host}:${environment.port}/${environment.salesAll}/afc29f8c-de19-4879-ad2c-347f8e07bda3`);
    }
}