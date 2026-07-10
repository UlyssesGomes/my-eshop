import { Injectable } from '@angular/core';

import { Material } from '../../shared/models/material/material';
import { ServiceCore } from '../../shared/services/service-core';

@Injectable({
  providedIn: 'root'
})
export class MaterialService extends ServiceCore<Material> {
  protected override getEndpoint(): string {
    return 'materials';
  }  
}
