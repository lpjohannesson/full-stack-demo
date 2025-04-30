import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Post } from '../models/post';
import { BackendService } from '../services/backend-service';
import { PostComponent } from './components/post.component';
import { PageContainerComponent } from './components/page-container.component';

@Component({
  selector: 'home',
  imports: [RouterOutlet, PageContainerComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts: Post[] | null = null;

  constructor(private service: BackendService) {}

  async ngOnInit() {
    this.posts = await this.service.getPosts();
  }
}
