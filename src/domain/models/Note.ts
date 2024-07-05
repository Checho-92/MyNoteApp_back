export interface Note {
  id_nota?: number;
  id_usuario: number;
  nombre: string;
  fecha?: Date;
  estado: string;
  contenido: string;
}
