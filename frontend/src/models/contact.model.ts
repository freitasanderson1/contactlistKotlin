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
        var imgName = ''
        this.imagem?.includes('backend/uploads/') ? imgName = this.imagem.replace('backend/uploads/',''): imgName = ''
      return `http://localhost:4200/media/${imgName}`;
    }
  }
