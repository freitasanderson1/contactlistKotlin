import { Component, Inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Contato } from '../../models/contact.model'
import { ContatoService } from '../../services/contact.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule]
})
export class ContactModalComponent {
  contact: Contato = { id: 0, nome: '', email: '', telefone: '', dataNascimento:'', imagem: '', imageUrl: () => '' };
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isSaving = false;
  imgSrc = '';

  constructor(
    private contatoService: ContatoService,
    public dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contact = data.contact || {};

    this.contact.imagem ? this.imgSrc = this.contact.imageUrl(): this.imgSrc = '';
  }

  onSave(event: Event) {
    event.stopPropagation();

    if (this.isSaving) {
      return;
    }

    this.isSaving = true;


    if(this.selectedFile){
      this.contact.imagem = this.selectedFile
    } else {

    }

    const request$ = this.contact.id
      ? this.contatoService.updateContato(this.contact.id, this.contact)
      : this.contatoService.addContato(this.contact);

    request$.subscribe({
      next: response => {
        this.dialogRef.close(this.contact);
      },
      error: error => {
        console.error('Erro ao salvar contato:', error);
      }
    });
  }

  onCancel(event: Event) {
    event.stopPropagation();
    this.dialogRef.close();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files ? input.files[0] : null;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
