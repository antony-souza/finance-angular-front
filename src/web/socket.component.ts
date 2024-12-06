/* eslint-disable @typescript-eslint/no-explicit-any */
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

    joinRoom(room: string): void {
        this.socket.emit('joinStore', room);
    }

    emit(eventName: string, data: any): void {
        this.socket.emit(eventName, data);
    }

    on(eventName: string, callback: (data: any) => void): void {
        this.socket.on(eventName, callback);
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
