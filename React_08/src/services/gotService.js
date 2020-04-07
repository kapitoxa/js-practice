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

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char.url),
            name: this._isSet(char.name),
            gender: this._isSet(char.gender),
            born: this._isSet(char.born),
            died: this._isSet(char.died), 
            culture: this._isSet(char.culture)
        };
    }

    _transformHouse(house) {
        return {
            name: this._isSet(house.name),
            region: this._isSet(house.region),
            words: this._isSet(house.words),
            titles: this._isSet(house.titles),
            overlord: this._isSet(house.overlord),
            ancestralWeapons: this._isSet(house.ancestralWeapons)
        };
    }
    
    _transformBook(book) {
        return {
            name: this._isSet(book.name),
            numberOfPages: this._isSet(book.numberOfPages),
            publiser: this._isSet(book.publiser),
            released: this._isSet(book.released)
        };
    }
    
    _isSet(data) {
        if (data) {
            return data;
        } else {
            return 'Unknown';
        }
    }

    _extractId(url) {
        const regexp = /\/(\d+)$/;
        return url.match(regexp)[0];
    }
}