<a name="readme-top"></a>
<div align="center">
    <!-- CONTRIBUTORS -->
    <a href="https://github.com/ElCapitanSponge/tysql/graphs/contributors">
        <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/ElCapitanSponge/tysql">
    </a>
    <!-- FORKS -->
    <a href="https://github.com/ElCapitanSponge/tysql/network/members">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/ElCapitanSponge/tysql">
    </a>
    <!-- STARS -->
    <a href="https://github.com/ElCapitanSponge/tysql/stargazers">
        <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ElCapitanSponge/tysql">
    </a>
    <!-- ISSUES -->
    <a href="https://github.com/ElCapitanSponge/tysql/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/ElCapitanSponge/tysql">
    </a>
    <!-- PULL REQUESTS -->
    <a href="https://github.com/ElCapitanSponge/tysql/pulls">
        <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/ElCapitanSponge/tysql">
    </a>
    <!-- LICENSE -->
    <a href="https://github.com/ElCapitanSponge/tysql/blob/master/LICENSE">
        <img alt="GitHub" src="https://img.shields.io/github/license/ElCapitanSponge/tysql">
    </a>
</div>
<br />
<div align="center">
    <h1 align="center">
        TySQL
    </h1>
    <h4 align="center">
        (TypeScript SQL)
    </h4>
    <p align="center">
        An awesome utility to make working with MySQL databases within TypeScript/JS projects simpler
    </p>
    <a href="https://github.com/ElCapitanSponge/tysql/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/ElCapitanSponge/tysql/issues/new">Request Feature</a>
</div>

<!-- ABOUT THE PROJECT -->
# About The Project

This was born out of the desire to have robust module for managing and working with mysql databases across a range of various applications without having to rewrite the code or perform some copy pasta.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
# Getting Started

## Installation

To install the package run the following command.

```sh
npm install @elcapitansponge/tysql
```

Upon installation, TySQL leverages `.env` to handle the connection configuration and details.

### Configuration File

The configurations all have a `db__` prefix.

The names of the configurations are familiar if you have used mysql connections before. This is reflected in the example of the `.env` file is bellow (Sample template can be located at [Sample .env](https://github.com/ElCapitanSponge/tysql/blob/main/samples/.env)):

```env
db__host: 'localhost'
db__user: 'usr'
db__password: 'pass'
db__port: 3306
db__schema: 'schema'
```

## Example code

An example of useable typescript code can be found [here](https://github.com/ElCapitanSponge/tysql/blob/main/test/ts/index.ts)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
# Roadmap

See the [open issues](https://github.com/ElCapitanSponge/tysql/issues) for a full list of proposed features (and known issues).
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CODE_OF_CONDUCT -->
# Code of Conduct
See [`CODE_OF_CONDUCT`](https://github.com/ElCapitanSponge/tysql/blob/main/CODE_OF_CONDUCT.md) for more information.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
# Contributing
See [`CONTRIBUTING`](https://github.com/ElCapitanSponge/tysql/blob/main/CONTRIBUTING.md) for more information.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
# License
Distributed under the MIT License. See [`LICENSE`](https://github.com/ElCapitanSponge/tysql/blob/main/LICENSE) for more information.
<p align="right">(<a href="#readme-top">back to top</a>)</p>