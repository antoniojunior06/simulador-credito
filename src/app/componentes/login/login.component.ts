import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    if(this.form.valid) {
      const {username, password} = this.form.value
      const sucess = this.authService.login(username, password);

      if(sucess) {
        this.router.navigate(['/listaAtividades']);
      }else {
        console.error('Login falhou');

      }
    }
  }

}
