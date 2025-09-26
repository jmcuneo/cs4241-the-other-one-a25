import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    plugins: [svelte()],
    server: {
        proxy: {
            // forward API/auth routes to your existing Express app
            '/api': 'http://localhost:3000',
            '/auth': 'http://localhost:3000'
        }
    }
})
