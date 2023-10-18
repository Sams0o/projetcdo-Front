export interface User {
  id?: number;
  nom: string;
  prenom: string;
  pseudo: string;
  biography: string;
  email: string;
  password?: string;
  password_confirm?: string;
  admin: boolean;
}
