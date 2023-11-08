import { Category } from './category';
import { Country } from './country';

export interface Experience {
  id?: number;
  title: string;
  description: string;
  city: string;
  publication_date: Date;
  travel_date: Date;
  countries: Country[];
  categories: Category[];
}
