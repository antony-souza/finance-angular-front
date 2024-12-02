import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";

interface IChartInfo {
    labels: string[];
    data: number[];
}
@Injectable({
    providedIn: 'root'
})
export class ChartService {

    constructor(private readonly httpClient: HttpClient) { }

    getChartInfo() {
        return this.httpClient.get<IChartInfo>(`${environment.host}:${environment.port}/${environment.charts}`);
    }
}