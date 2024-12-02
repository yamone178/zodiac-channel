import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Zodiac_Channel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>  {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
      },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
   
        <App {...props} />
   
    );
    },
    progress: false
    // progress: {
    //     color: '#4B5563',

    // },
});
