import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private socket: Socket;

    constructor() {
        this.socket = io(`${environment.host}:${environment.port}`);
    }

    // Enviar mensagem para o servidor
    emit(eventName: string, data: any): void {
        this.socket.emit(eventName, data);
    }

    // Receber resposta do servidor
    on(eventName: string, callback: (data: any) => void): void {
        this.socket.on(eventName, callback);
    }

    // Desconectar do WebSocket
    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
