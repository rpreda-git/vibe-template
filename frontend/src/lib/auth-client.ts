import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"


export const authClient = createAuthClient({
    //baseURL: import.meta.env.VITE_AUTH_URL, //Not needed as long as auth api is running on the same origin through the reverse proxy.
    plugins: [
        adminClient(),
    ]
})