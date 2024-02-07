import { ingredient } from "../shared/ingredient.model";

export class recipies{
    public name:string;
    public description:string;
    public imagepath:string;
    public ingredients_used:ingredient[] = [];

    constructor(name:string,description:string,imagepath:string,ingredients:ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagepath = imagepath;
        this.ingredients_used = ingredients;
    }
}