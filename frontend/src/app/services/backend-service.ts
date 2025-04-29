import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from  '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class BackendService {
    private http = inject(HttpClient);

    getPosts(): Promise<Post[]> {
        return firstValueFrom(this.http.get<Post[]>('/api/Post', { responseType: 'json' }));
    }
}