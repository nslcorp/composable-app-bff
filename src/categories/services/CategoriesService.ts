import { Category } from "../../types";

export abstract class CategoriesService {
  abstract fetchAll(): Promise<any>;
}