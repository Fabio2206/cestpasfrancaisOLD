import { Role } from './role';

export class User {
  id: number;
  sexe: string = "";
  prenom: string = "";
  nom: string = "";
  email: string = "";
  motDePasse: string = "";
  acceptCond?: boolean;
  avatar: string;
  role: Role;
  date?: Date;
  token?: string;
}
