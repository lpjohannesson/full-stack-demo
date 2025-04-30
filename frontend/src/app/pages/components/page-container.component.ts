import { Component, Inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { BackendService } from '../../services/backend-service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'page-container',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, RouterLink],
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent {
  isLoggedIn = signal(false);

  constructor(private service: BackendService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn.update(_ => this.service.isLoggedIn());
  }

  logOut() {
    this.service.logOut();
    this.isLoggedIn.update(_ => false);
    
    this.router.navigate(["/"]);
  }
}
