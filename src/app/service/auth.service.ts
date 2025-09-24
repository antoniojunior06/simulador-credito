import { Injectable } from '@angular/core';
import { Usuario } from '../types/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioLogado: Usuario | null = null;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    // Mock de usuários
    const usuariosMock: Usuario[] = [
      { username: 'admin', role: 'admin' },
      { username: 'cliente', role: 'cliente' }
    ];

    // Mock de senhas
    if(username === 'admin' && password === '123') {
      this.usuarioLogado = usuariosMock[0];
      return true;
    }

    if(username === 'cliente' && password === '123') {
      this.usuarioLogado = usuariosMock[1];
      return true;
    }

    return false;
  }

  logout(): void {
    this.usuarioLogado = null;
    this.router.navigate(['/login']);
  }

  get usuario(): Usuario | null {
    return this.usuarioLogado;
  }

  isAdmin(): boolean {
    return this.usuarioLogado?.role === 'admin';
  }

  isCliente(): boolean {
    return this.usuarioLogado?.role === 'cliente';
  }

  isLogado(): boolean {
    return this.usuarioLogado !== null;
  }

}
