export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResource(url) {
        const fullUrl = this._apiBase + url;
        const resource = await fetch(fullUrl);
        if (!resource.ok) {
            throw new Error(`Could not getch url ${fullUrl}, received ${resource.status}`);
        }
        return await resource.json();
    }
    getAllBooks() {
        return this.getResource('/books"');
    }
    getBook(id) {
        return this.getResource(`/books/${id}`);
    }
    getAllCharacters() {
        return this.getResource('/characters?page=5&pageSize=10');
    }
    getCharacter(id) {
        return this.getResource(`/characters/${id}`);
    }
    getAllHouses() {
        return this.getResource('/houses');
    }
    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }
}