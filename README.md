# Pokésearch

Simple web service to search for and save favourite Pokémon.

## Core technologies

* Reactjs
* Redux
* TypeScript
* TypeScript + Express backend

![Favourite Pokemon](https://i.imgur.com/XT097eX.png "Favourite Pokémon")

## Getting up and running

### Docker (least steps!)
You can run the service in any environment that supports docker, it has no external dependencies
and can be run with the following:

```bash
# in the pokesearch repository
docker build -t pokesearch .
docker run -p 6060:6060 pokesearch
```

There are also published docker image releases available on request.

### Running locally
You can run the code locally on any machine with `node` isntalled.

```bash
# in the pokesearch repository
npm install
npm run build:app && npm run build:server
npm start
```

### Testing methodology
[/test/README.md](/test/README.md)

## Proposed improvements with additional time
* Happy path end to end journey testing across both the frontend and the backend (using [Cypress](https://www.cypress.io/))
* React router for managing internal Reactjs app state, allowing for deep linking and a
cleaner abstraction
* Accessibility audit on all componenets, reviewing visual and page reader clarity
* CSP to ensure image resources are only loaded from trusted sources
* More robust server side sessions for syncing user state outside of their current browser session
* Server side rendering to optimise for page load speed and completeness, this could only work
if user sessions were considered (requires extending current webpack build configuration)
* Styles lifted into a modular SCSS build that avoids duplication and repition

## Known issues
* `localStorage` is implemented as an sync with async ability proof of concept,
however `localStorage` has no ability to namespace elements, if the local domain
running the server (on the users machine) has entries in local storage they will
be picked up by the redux store on initial load
