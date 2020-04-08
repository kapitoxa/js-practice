export default class RestoService {
    constructor() {
        this._baseUrl = 'http://localhost:3001';
    }

    async _getResource(url) {
        const fullUrl = this._baseUrl + url;
        const resource = await fetch(fullUrl);
        if (!resource.ok) {
            throw new Error(`Could not fetch url ${fullUrl}, received ${resource.status}`);
        }
        return await resource.json();
    }

    async getMenuItems() {
        return await this._getResource('/menu');
    }
}