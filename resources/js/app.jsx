import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // 1. Get a map of all possible pages in your directory
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}');

        // 2. Normalize the requested name to lowercase for a match attempt
        const normalizedName = `./Pages/${name}.jsx`.toLowerCase();

        // 3. Find the key on the actual disk that matches the normalized name
        const matchedKey = Object.keys(pages).find((key) => {
            return key.toLowerCase() === normalizedName ||
                   key.toLowerCase() === `./Pages/${name}.tsx`.toLowerCase();
        });

        // 4. Resolve using the correctly-cased key found on disk
        if (!matchedKey) {
            throw new Error(`Inertia Page not found: ${name}`);
        }

        return resolvePageComponent(matchedKey, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
