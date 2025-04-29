import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from  '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BackendService {
    private http = inject(HttpClient);

    getPosts() {
        return firstValueFrom(this.http.get('/api/Post', { responseType: 'json' }));
    }
}