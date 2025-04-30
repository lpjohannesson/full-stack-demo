import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Post } from '../../models/post';

@Component({
  selector: 'post',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './post.component.html'
})
export class PostComponent {
  @Input() post: Post;
}
