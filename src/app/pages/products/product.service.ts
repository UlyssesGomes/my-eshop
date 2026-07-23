import { Injectable } from '@angular/core';

import { Product } from '../../shared/models/product/product';
import { ServiceCore } from '../../shared/services/service-core';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ServiceCore<Product> {
  protected override getEndpoint(): string {
    return 'products';
  }  
}
