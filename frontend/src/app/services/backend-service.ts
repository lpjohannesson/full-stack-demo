import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from  '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class BackendService {
    private http = inject(HttpClient);
    private tokenName = "access-token";

    register(email: string, password: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const body = {
                email: email,
                password: password
            };
    
            try {
                await firstValueFrom(this.http.post<any>('/api/register', body));
                resolve();
            }
            catch (err: any) {
                reject(Object.values(err.error.errors));
            }
        });
    }

    login(email: string, password: string): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const body = {
                email: email,
                password: password
            };
    
            try {
                const response = await firstValueFrom(this.http.post<any>('/api/login', body));
                localStorage.setItem(this.tokenName, response.accessToken);

                resolve();
            }
            catch (err) {
                reject();
            }
        });
    }

    logOut(): void {
        return localStorage.removeItem(this.tokenName);
    }

    isLoggedIn(): boolean {
        if (typeof window === 'undefined') {
            return false;
        }

        return localStorage.getItem(this.tokenName) != undefined;
    }

    getPosts(): Promise<Post[]> {
        return firstValueFrom(this.http.get<Post[]>('/api/Post'));
    }
}