import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from  '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class BackendService {
    private http = inject(HttpClient);

    register(email: string, password: string): Promise<any> {
        const body = {
            email: email,
            password: password
        };

        return firstValueFrom(this.http.post<any>('/api/register', body));
    }

    login(email: string, password: string): Promise<any> {
        const body = {
            email: email,
            password: password
        };

        return firstValueFrom(this.http.post<any>('/api/login', body));
    }

    getPosts(): Promise<Post[]> {
        return firstValueFrom(this.http.get<Post[]>('/api/Post'));
    }
}