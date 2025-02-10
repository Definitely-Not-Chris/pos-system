


export default class TokenStorage {
    constructor(public key: string) {
        this.key = key;
    }

    save(token: string) {
        localStorage.setItem(this.key, token);
    }

    get() {
        return localStorage.getItem(this.key);
    }

    reset() {
        localStorage.removeItem(this.key);
    }
}
