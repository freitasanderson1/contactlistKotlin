import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Contato, ContatoMethods } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:4200/api/contatos';

  constructor(private http: HttpClient) { }

  getContatos(): Observable<ContatoMethods[]> {
    return this.http.get<Contato[]>(this.apiUrl).pipe(
      map(contatos => contatos.map(contato => this.toContatoMethods(contato)))
    );
  }

  getContatoByParam(query: string = ''): Observable<ContatoMethods[]> {
    // console.log(`URL: ${this.apiUrl}/search?search=${query}`)
    return this.http.get<Contato[]>(this.apiUrl+'/search?search='+query).pipe(
      map(contatos => contatos.map(contato => this.toContatoMethods(contato)))
    );
  }

  addContato(contato: Contato): Observable<ContatoMethods> {
    const formData = new FormData();
    formData.append('nome', contato.nome);
    formData.append('email', contato.email);
    formData.append('telefone', contato.telefone);

    if (contato.imagem) {
      formData.append('imagem', contato.imagem);
    }

    if (contato.dataNascimento) {
      contato.dataNascimento = new Date(contato.dataNascimento).toISOString().split('T')[0];
      formData.append('dataNascimento', contato.dataNascimento);
    }

    return this.http.post<Contato>(this.apiUrl, formData).pipe(
      map(contato => this.toContatoMethods(contato))
    );
  }

  updateContato(id: number, contato: Contato): Observable<ContatoMethods> {
    const formData = new FormData();
    formData.append('nome', contato.nome);
    formData.append('email', contato.email);
    formData.append('telefone', contato.telefone);

    if (contato.imagem) {
      formData.append('imagem', contato.imagem);
    }

    if (contato.dataNascimento) {
      contato.dataNascimento = new Date(contato.dataNascimento).toISOString().split('T')[0];
      formData.append('dataNascimento', contato.dataNascimento);
    }

    return this.http.put<Contato>(`${this.apiUrl}/${id}`, formData).pipe(
      map(contato => this.toContatoMethods(contato))
    );
  }

  deleteContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private toContatoMethods(contato: Contato): ContatoMethods {
    return new ContatoMethods(
      contato.id,
      contato.nome,
      contato.email,
      contato.telefone,
      contato.imagem || '',
      contato.dataNascimento || '',
    );
  }
}
