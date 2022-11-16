export class Recipe{
    id: number;
    name: String;
    category: String;
    instructions: String;
    filename: String;
    author: {
        id: number;
    }

    constructor(id: number, name: string, instructions: String, category: String, filename: String, author: any){
        this.id = id;
        this.name = name;
        this.instructions = instructions;
        this.category = category;
        this.filename = filename;
        this.author = author;
    }
}