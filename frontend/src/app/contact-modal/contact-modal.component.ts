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

  constructor(
    private contatoService: ContatoService,
    public dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contact = data.contact || {};
  }

  onSave() {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;

    if (this.contact.imagem) {
      this.contact.imagem = this.selectedFile;
    }

    if (this.contact.id) {
      this.contatoService.updateContato(this.contact.id, this.contact).pipe(
        first()
      ).subscribe(response => {
        this.dialogRef.close(this.contact);
        this.isSaving = false;
      }, error => {
        console.error('Erro ao atualizar contato:', error);
        this.isSaving = false;
      });
    } else {
      this.contatoService.addContato(this.contact).pipe(
        first()
      ).subscribe(response => {
        this.dialogRef.close(this.contact);
        this.isSaving = false;
      }, error => {
        console.error('Erro ao atualizar contato:', error);
        this.isSaving = false;
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files ? input.files[0] : null;

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.contact.imagem = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
