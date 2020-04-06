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
    async getAllBooks() {
        const result = await this.getResource('/books"');
        return result.map(this._transformBook);
    }
    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    async getAllCharacters() {
        const result = await this.getResource('/characters?page=5&pageSize=10');
        return result.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    async getAllHouses() {
        const result = await this.getResource('/houses');
        return result.map(this._transformHouse);
    }
    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }
    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        };
    }
    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words:  house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        };
    }
    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        };
    }
}