// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite'; // Import this!
// import path from "path";

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(), // Add this to the plugins array!
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import path from 'path';

// export default defineConfig({
//   // Point this to the folder containing your images
//   publicDir: 'public', 
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   // Ensure the build output is handled correctly for deployment
//   build: {
//     outDir: 'dist',
//     emptyOutDir: true,
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  
  root: 'client',
 
  publicDir: 'public', 
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
     
      "@": path.resolve(__dirname, "./client/src"),
    },
  },
  build: {
   
    outDir: '../dist',
    emptyOutDir: true,
  },
});