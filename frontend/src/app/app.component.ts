import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostComponent } from './components/post.component';
import { BackendService } from './services/backend-service';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatButtonModule, MatToolbarModule, PostComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Post[] | null = null;

  constructor(private service: BackendService) {}

  async ngOnInit() {
    this.posts = await this.service.getPosts();
  }
}
