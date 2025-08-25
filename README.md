# Laundry Bill PWA

A simple Progressive Web App for generating laundry bills.

## Local Testing

To test this application locally:

1. Use a simple HTTP server like Python's built-in server:
   ```
   python -m http.server 8000
   ```
   Then access the app at http://localhost:8000

2. Alternatively, you can open the `index.html` file directly in your browser.

Note: Some PWA features like installation require HTTPS, which is not available in local testing.

## Deployment Options for Full PWA Features

### Option 1: GitHub Pages (Free & Easy)

1. Create a GitHub account if you don't have one
2. Create a new repository
3. Upload all files from this project
4. Go to Settings > Pages
5. Enable GitHub Pages from the main branch
6. Your site will be available at https://[username].github.io/[repository]

### Option 2: Netlify (Free & Easy)

1. Create a Netlify account at [netlify.com](https://www.netlify.com/)
2. Drag and drop your project folder to the Netlify dashboard
3. Your site will be deployed with a random URL
4. You can set a custom domain if desired

### Option 3: Firebase Hosting (Free)

1. Create a Firebase account
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Run `firebase login`
4. Run `firebase init` and select Hosting
5. Run `firebase deploy`

## Testing PWA Installation

After deploying to an HTTPS service:

1. Open the deployed site in Chrome/Edge on desktop or mobile
2. You should see an install button in the address bar
3. On mobile, use "Add to Home Screen" option in the browser menu

## Development Notes

- The service worker provides offline functionality
- The manifest.json enables installation as an app
- Any updates to the app require redeploying
