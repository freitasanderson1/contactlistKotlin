export interface Contato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    imagem?: any;
    dataNascimento?: string;
    imageUrl(): string;
  }

  export class ContatoMethods implements Contato {
    constructor(
      public id: number,
      public nome: string,
      public email: string,
      public telefone: string,
      public imagem?: string,
      public dataNascimento?: string,
    ) { }

    imageUrl(): string {
      if(this.imagem?.includes('backend/uploads/')){
        return `media/${this.imagem.replace('backend/uploads/','')}`
      } else{
        return ''
      }
    }
  }
