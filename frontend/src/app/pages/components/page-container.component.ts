import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-container',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent {}
