import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../types/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly api = 'http://localhost:3000/produtos'

  constructor(private http: HttpClient) { }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.api, produto)
  }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.api)
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.api}/${id}`)
  }

  editar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.api}/${produto.id}`, produto)
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
