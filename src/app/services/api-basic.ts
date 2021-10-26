import { isArray } from 'rxjs/internal/util/isArray';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiBasic {
  public user:any
  public base_url = localStorage.getItem('base_url')
  public base_image_url = localStorage.getItem('base_image_url')
  public base_cargas_masivas = localStorage.getItem('base_cargas_masivas')
}
