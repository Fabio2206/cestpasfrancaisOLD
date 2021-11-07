import { Role } from './role';

export class User {
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
