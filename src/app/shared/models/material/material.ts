import { ProductColorEnum } from "../../enums/product-color";
import { ProductType } from "../../enums/product-type";
import { ProductSize } from "../product-size/product-size";

export class Material {
    id?: number;
    name?: string;
    type?: ProductType;
    color?: ProductColorEnum;
    quantity?: number;
    productsSize?: ProductSize;
}