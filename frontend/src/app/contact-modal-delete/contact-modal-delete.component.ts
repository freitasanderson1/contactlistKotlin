import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ContatoService} from "../../services/contact.service";
import { Contato } from '../../models/contact.model'
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-contact-modal-delete',
  standalone: true,
  templateUrl: './contact-modal-delete.component.html',
  styleUrls: ['./contact-modal-delete.component.scss'],
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule]
})
export class ContactModalDeleteComponent {

  contact: Contato = { id: 0, nome: '', email: '', telefone: '', dataNascimento:'', imagem: '', imageUrl: () => '' };


  constructor(
    public dialogRef: MatDialogRef<ContactModalDeleteComponent>,
    private contatoService: ContatoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contact = data.contact || {};
    console.log(`Esta aqui: ${this.contact.id}`)
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  deleteContact(event: Event) {
    event.stopPropagation();
    console.log(this.contact.nome)
    this.contatoService.deleteContato(this.contact.id).subscribe(() => {
    }, error => {
      console.error('Erro ao excluir contato:', error);
    });
  }

}
