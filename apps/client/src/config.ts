import TokenStorage from "./utils/token-storage"


const API_PORT = import.meta.env.VITE_API_PORT
const API_HOST = import.meta.env.VITE_API_URL
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT

console.warn("API_PORT=", API_PORT);
console.warn("API_URL=", API_HOST);
console.warn("ENVIRONMENT=", ENVIRONMENT);

const API_URL = `${API_HOST}:${API_PORT}`
console.warn("API=", API_URL);



const TOKEN_KEY = "authentication"
const tokenStorage = new TokenStorage(TOKEN_KEY)

export default {
    API_PORT,
    API_HOST,
    API_URL,
    ENVIRONMENT,
    tokenStorage
}