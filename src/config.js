// Base URL for the FAFH API.
//
// Set REACT_APP_API_BASE_URL to override. Create React App inlines
// REACT_APP_* variables at build time, so this is a build-time choice, not a
// runtime one — a deployment needs the variable set when `npm run build` runs.
//
// Leaving it as an empty string makes requests same-origin, which is what
// local development wants: src/setupProxy.js forwards them to the API on
// port 5050. See .env.example.
//
// This used to be three commented-out lines that developers edited by hand,
// which is how one call site ended up pointing at a different backend than
// the rest of the app.
export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ?? "https://fafh-backend-app-1afeb5c32da1.herokuapp.com";
