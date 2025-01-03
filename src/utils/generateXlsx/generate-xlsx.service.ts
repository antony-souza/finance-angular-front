import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class GenerateXlsxService {
    constructor(private httpClient: HttpClient) { }

    storeId = localStorage.getItem('store_id');

    generateExcel(router: string, filename:string) {
        this.httpClient
            .get(`${environment.apiProd}/${router}/${this.storeId}`, { responseType: 'blob' })
            .subscribe((response) => {
                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${filename}.xlsx`;
                a.click();
                window.URL.revokeObjectURL(url);
            });
    }
}