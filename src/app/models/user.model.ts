import { Experience } from './experience';
export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  pseudo: string;
  biography: string;
  email: string;
  password?: string;
  password_confirm?: string;
  admin?: boolean;
  experiences: Experience[];
}
