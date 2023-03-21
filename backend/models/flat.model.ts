import { Table, Column, Model, HasMany } from 'sequelize-typescript'

export interface Flat {
    name: string;
    url: string;
}

@Table
export class Flats extends Model implements Flat {

  @Column 
  name: string;

  @Column
  url: string;
} 