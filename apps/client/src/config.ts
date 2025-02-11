import TokenStorage from "./utils/token-storage"


const API_PORT = import.meta.env.VITE_API_PORT
const API_URL = import.meta.env.VITE_API_URL
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT

!API_PORT && console.error("env variable not set: API_PORT");
!API_URL && console.error("env variable not set: API_BASE_URL");
!ENVIRONMENT && console.error(ENVIRONMENT, "env variable not set: ENVIRONMENT");

const TOKEN_KEY = "authentication"
const tokenStorage = new TokenStorage(TOKEN_KEY)

export default {
    API_PORT,
    API_URL,
    ENVIRONMENT,
    tokenStorage
}