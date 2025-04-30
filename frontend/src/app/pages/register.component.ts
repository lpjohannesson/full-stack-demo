import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor(private service: BackendService) {}

  async submit() {
    console.log(await this.service.register(this.email, this.password));
  }
}
