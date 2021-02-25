# documentScanner

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# run component sandbox storybook
$ npm run storybook

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Pipeline

### Workflow

- create feature branch
- write Jest Unit tests in `tests`-folder
- write Component in `components`-folder
- write Story in `stories`-folder to develop in sandbox
- commit often
- if ready, make pull request to master
- CI will

### On Push/Pull Request on master

Everything is tied together with GitHub Actions in `.github`

- Linting with eslint
- Unit tests with Jest
- Publish Storybook to Chromatic and run UI (Snapshot) tests
- Show everything in GitHub
- If everything is alright (and pull request ist accepted) deploy everything to Netlify

voilà: [https://heuristic-ride-57d384.netlify.app/](https://heuristic-ride-57d384.netlify.app/)
