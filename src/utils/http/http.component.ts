/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

@Injectable({
    providedIn: 'root' 
})
export class HttpApiComponent {
    baseUrl = `${environment.host}:${environment.port}`;

    constructor(private readonly httpClient: HttpClient) {}

    genericHttpRequest<T>(endpoint: string, method: HttpMethod, withAuth: boolean, body?: any) {
        let headers: HttpHeaders = new HttpHeaders(); 

        if (withAuth) {
            const token = localStorage.getItem("token");

            if (token) {
                headers = headers.set("Authorization", `Bearer ${token}`);
            }
        }

        if (body && !(body instanceof FormData)) {
            headers = headers.set("Content-Type", "application/json");
        }

        return this.httpClient.request<T>(method, `${this.baseUrl}/${endpoint}`, {body, headers });
    }
}
