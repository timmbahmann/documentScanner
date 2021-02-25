# documentScanner

![Netlify](https://img.shields.io/netlify/3edc2894-f701-4ac5-953d-ac9c64ddd473?logo=netlify&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/timmbahmann/documentScanner/ci?style=flat-square&logo=github)

![Jest](https://img.shields.io/badge/Jest-%E2%9C%93-brightgreen?logo=jest&style=flat-square)
![Nuxt](https://img.shields.io/badge/Nuxt-%E2%9C%93-brightgreen?logo=nuxt.js&style=flat-square)
![Storybook](https://img.shields.io/badge/Storybook-%E2%9C%93-brightgreen?logo=storybook&style=flat-square)
![Chromatic](https://img.shields.io/badge/Chromatic-%E2%9C%93-brightgreen?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADB/VeXAAAEBklEQVRIDa1WbWyURRB+Zt72elRAUKgBUUpEKV9KFEUhkUQh0UDUplbqF4nyCwJ+lkRQIE2jiYgQMYEfFArGAgGRoDYgxg8wwRpFMRUUArYmeDGKVHoF2pLbcXav+9691yvxB5vc7e58PDM7OzvzEi4z5MnRI0xn6mGBzCLBTSAZ7sSFEkI4RaBGjgd7qOHk6b5gKB9DqsYMN92dNSA8I4Ign4ynESEFQT3H4ito+/GEp/u5lwGpHPWQScn76vUAL/R/Zj1NkgN6ina2fJQtHzGQqih9DpA16jVnC7n16NtAd80Eursg338OtB7rJaKnMQC9GOxqXeuZoQHnuTG784Lf/SC4eh1IEeyQlEZlwzLIZ1s9TjhbI8xc7k/iPHUxt2HJ57mq0q3TFFUyIEEAenY5MGhoSPMLi+FCrPdoac6AvdBIzCfcA37rE/B7P4FfrQd+/gZm8WzI0SaPA4rFgZsngV/ZAF75MVA2OeRZLJckSqF0Kl5qVcvpbBk3BbxsSxogVNED/PIdzCZNrOtuBM1dCioZAfPuy6Cps0B33AfpughTOxdQOTtsdnG8sJRdnntwZfBjz/cCdwpj7wS/qQkyaTrM8jkw21ZBOi9YlhtU1A9cPt9vbUQDi832EYVUuxh6vduKSpgDuxXobcj5dkcjZvCMOeDV+4BzZ4GmvepR1jMpucHJ+T+LXWBfaOb6lNVyDJJsg9lYA3T8C1zStPxqF6hiIWhGldOVQ42QIwdAjy4CJk71eJCc1LXYlKoYmVRn+4dSVw8BivuD56kBo+nYtA9UuQhmyxvAn7+74NKwUtDTS9w9eD059w/Ma5VA4jdPsvfQURDu/OKqgeDXPwANvAZy+AtHJT16sHg9TMNKNaBheqLaS7tZjhyE0XeBi+cjdLspgBYuzZFbPIfsJSt43lGs1SMr5pJogdlcC7S3gV94BziTgFm1IKOq2AW2KmqxyhgoHZcR6GMlF5KQnWs1fHtBVZqq9z7iXrkMGBzRsNisRaoxQj3zR2Sbu5EfvoR56QEgVgResx88vTwsIfg7qmux2dVzW3J7hvlwHaS702+j87XD3Kumx6vB+qN4cci3OmaHhqlnpB9asCeoaT7bvmLsIJvAtzueeiHHD4NGlumldUBO/AieNtuxLI3GT4FsX+0MwRqw93X6pHvVyC4lwCbe0dLgymO6wXT9GqlHPZ5gcAl4/degwiJPSVfT/Q2QOi14eYaGJsmxojLbgFyxcwvbLFw9z9Fo+wtSX+tAQ44KSvOhcJu9sBiu8fR0N3cCL3DZhjNqPGjy/UBhDPLtp8CpZq8WzmkH+2g4XupKt8xerdF2Ihc/oE49CrPLO5A7WxkNQ53TyenHVjYSolzlK/HZ8h9yr6sVWc3m6gAAAABJRU5ErkJggg==&style=flat-square)

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

1. create feature branch
2. write Jest Unit tests in `tests`-folder
3. write Component in `components`-folder
4. write Story in `stories`-folder to develop in sandbox
5. commit often
6. if ready, make pull request to master
7. CI will run. Check state on GitHub and UI changes on Chromatic.
8. when problems occur resolve them with more commits on the same branch
9. if everything went fine accept pull request and merge
10. website will be automatically deployed on Netlif

### On Push/Pull Request on master

Everything is tied together with GitHub Actions in `.github`

- Linting with eslint
- Unit tests with Jest
- Publish Storybook to Chromatic and run UI (Snapshot) tests
- Show everything in GitHub
- If everything is alright (and pull request ist accepted) deploy everything to Netlify

voilà: [https://heuristic-ride-57d384.netlify.app/](https://heuristic-ride-57d384.netlify.app/)
