import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../service/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

}
