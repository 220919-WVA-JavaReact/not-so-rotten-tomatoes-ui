export class Recipe{
    id: number;
    name: String;
    category: String;
    instructions: String;
    filename: String;

    constructor(id: number, name: string, instructions: String, category: String, filename: String){
        this.id = id;
        this.name = name;
        this.instructions = instructions;
        this.category = category;
        this.filename = filename;
    }
}