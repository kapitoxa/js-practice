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

    async _postData(url, data) {
        const fullUrl = this._baseUrl + url;
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async getMenuItems() {
        return await this._getResource('/menu');
    }

    async placeOrder(data) {
        return await this._postData('/order', data);
    }
}