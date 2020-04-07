export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const fullUrl = this._apiBase + url;
        const resource = await fetch(fullUrl);
        if (!resource.ok) {
            throw new Error(`Could not fetch url ${fullUrl}, received ${resource.status}`);
        }
        return await resource.json();
    }

    getAllBooks = async () => {
        const result = await this.getResource('/books/');
        return result.map(this._transformBook);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }

    getAllCharacters = async () => {
        const result = await this.getResource('/characters?page=5&pageSize=10');
        return result.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const result = await this.getResource('/houses/');
        return result.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
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

    _transformHouse = (house) => {
        return {
            id: this._extractId(house.url),
            name: this._isSet(house.name),
            region: this._isSet(house.region),
            words: this._isSet(house.words),
            titles: this._isSet(house.titles),
            overlord: this._isSet(house.overlord),
            ancestralWeapons: this._isSet(house.ancestralWeapons)
        };
    }
    
    _transformBook = (book) => {
        return {
            id: this._extractId(book.url),
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
        return url.match(regexp)[1];
    }
}