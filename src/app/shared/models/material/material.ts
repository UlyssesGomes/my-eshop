import { ProductType } from "../../enums/product-type";
import { ProductSize } from "../product-size/product-size";

export class Material {
    id?: number;
    name?: string;
    type?: ProductType;
    quantity?: number;
    productsSize?: ProductSize;
}