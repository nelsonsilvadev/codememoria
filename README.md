# Code Memoria

<img src="https://codememoria.com/logo-github.png" alt="Code Memoria - Logo">

A dynamic and user-friendly web application for searching, favoriting and rating GitHub repositories using the GitHub API.

> There's a lot of notes within the source code, search for `Notes:`

### How to Set Everything Up (assuming Node and Yarn/npm are installed)

- Open your terminal `:)`
- Clone the repository
  - `git clone https://github.com/nelsonsilvadev/codememoria.git`
- Enter to the repository directory
  - `cd codememoria`
- Install all the dependencies
  - `yarn install` or `npm install`
- Get your **GitHub Access Token**
  - [https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- Set your **GitHub Access Token** in the `.env` file
  - `REACT_APP_GITHUB_ACCESS_TOKEN=""`
- To start everything up
  - `yarn start` or `npm run start`
- Open your browser to explore GitHub repositories
  - [http://localhost:3000/](http://localhost:3000/)

### Development Notes

#### Features Highlights

- **React Context API for Features**: Implemented a custom React Context API to manage states such as favorites, providing a seamless global state management across the application.
- **Local Storage for Token Persistence**: Utilized local storage to persist GitHub access tokens, ensuring user convenience by retaining session state across page reloads.
- ...

#### Issues and Resolutions

- **Handling Token Expiry and Incorrect Tokens**: Developed a mechanism to detect expired or incorrect tokens, prompting users to update their token via a dialog, thus ensuring uninterrupted access.
- **Managing Local Storage for Token Updates**: Addressed challenges in updating the Apollo client when the token in local storage changed, ensuring consistent and accurate data fetching.
- ...

> See all features, issues and resolutions on the **Notes** page - [http://localhost:3000/notes](http://localhost:3000/notes).

### Random Thoughts

- Considering adding pagination for the favorites list to manage a large number of repositories more efficiently.
- Thinking about a more accurate GitHub token validation, possibly by querying the GitHub API instead of just using a RegEx.
- Experimented with a light/dark mode, but decided to prioritize other features first.
- Planning to add Jest tests for thorough coverage and reliability.
- Need to clean up some residual code from the initial project setup.
- Bought a domain and created a logo, giving the project a more professional feel.
- A footer might be added later for better navigation and information display.
- Thinking about implementing a 404 page for a more polished user experience.
- Considering enhancing accessibility features, though it wasn't the main focus initially.
- SEO optimization wasn't a primary concern during development but should be considered in future updates.

### Reminder

- Remember, don't get too caught up trying to favorite all the repositories in the world.
