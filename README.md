# Movie App (Angular 17 + TailwindCSS + TMDb API)

A simple movie browsing application built with **Angular 17** and **TailwindCSS**, powered by [The Movie Database (TMDb)](https://www.themoviedb.org/) API.  
Users can search, browse popular and recommended movies, view details, and check ratings.

---

## 🛠 Requirements

- **Node.js**: v18.x or v20.x (recommended: **v20**)
- **npm**: v9+
- **Angular CLI**: v17  
   Install globally if not already:

  ```bash
  npm install -g @angular/cli@17
  ```

1. Clone the repository

   git clone https://github.com/yourusername/movie-app.git
   cd movie-app

2. Install dependencies

   npm install

3. Configure TMDb API Key

   Create a free account at The Movie Database.
   Generate an API Key from your account settings.

   Open src/environments/environment.ts and add your key:

   export const environment = {
   production: false,
   tmdbApiKey: 'YOUR_TMDB_API_KEY_HERE'
   tmdbBaseUrl: "https://api.themoviedb.org/3",
   };

4. Run the app locally
   npm run start

   App will be available at: http://localhost:4200

5. Build for production
   npm run build

Author

Your Name Artur Tsarukyan (https://github.com/ArtTs77)
