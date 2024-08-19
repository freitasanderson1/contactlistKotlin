import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { ContatoService } from '../../services/contact.service';
import { ContatoMethods } from '../../models/contact.model';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { ContactModalDeleteComponent} from "../contact-modal-delete/contact-modal-delete.component";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
})

export class ContactListComponent{
  contatos: ContatoMethods[] = [];
  searchQuery: string = '';

  constructor(private contatoService: ContatoService,private dialog: MatDialog) {
    this.loadContatos();
  }

  loadContatos(query: string = ''): void {
    if (query){
      this.contatoService.getContatoByParam(query).subscribe((data) => {
        this.contatos = data;
      });
    }
    else{
      this.contatoService.getContatos().subscribe((data) => {
        this.contatos = data;
      });
    }
  }

  search(): void {
    this.loadContatos(this.searchQuery);
  }
  openDeleteDialog(contact?: ContatoMethods): void {
    const dialogRef = this.dialog.open(ContactModalDeleteComponent, {
      width: '500px',
      data: { contact: contact }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.contatoService.updateContato(result.id, result).subscribe(() => this.loadContatos());
        } else {
          this.contatoService.addContato(result).subscribe(() => this.loadContatos());
        }
      }
    });
  }
  openModal(contact?: ContatoMethods): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '500px',
      data: contact || { id: 0, nome: '', email: '', telefone: '', dataNascimento: '', image: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.contatoService.updateContato(result.id, result).subscribe(() => this.loadContatos());
        } else {
          this.contatoService.addContato(result).subscribe(() => this.loadContatos());
        }
      }
    });
  }
  editContato(contato: any) {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      data: { contact: contato },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContatos();
      }
    });
  }


}
