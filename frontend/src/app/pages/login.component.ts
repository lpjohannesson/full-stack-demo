import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageContainerComponent } from './components/page-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'login',
  imports: [RouterOutlet, PageContainerComponent, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
}
