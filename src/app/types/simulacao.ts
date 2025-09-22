import { Produto } from "./produto";

export interface Simulacao {
  id?: number;
  produto: Produto;
  valor: number;
  prazo: number;
}
