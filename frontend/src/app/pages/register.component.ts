import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PageContainerComponent } from './components/page-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BackendService } from '../services/backend-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  imports: [RouterOutlet, PageContainerComponent, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent {
  email: string;
  password: string;
  
  errors = signal<string[]>([]);

  constructor(private service: BackendService, private router: Router) {}

  async submit() {
    try {
      await this.service.register(this.email, this.password);
      await this.service.login(this.email, this.password);
      this.router.navigate(["/"]);
    }
    catch (errors: any) {
      this.errors.update(_ => errors);
    }
  }
}
