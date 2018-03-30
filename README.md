[![Logo](logo.png)](https://indigocore.org)

# IndigoCore

[Stratumn](https://stratumn.com)'s open-source JavaScript libraries to create Indigo applications and networks.

[![npm](https://img.shields.io/npm/v/@indigocore/agent.svg)](https://www.npmjs.com/package/@indigocore/agent)
[![Build Status](https://semaphoreci.com/api/v1/stratumn/js-indigocore/branches/master/badge.svg)](https://semaphoreci.com/stratumn/js-indigocore)
[![codecov](https://codecov.io/gh/stratumn/js-indigocore/branch/master/graph/badge.svg)](https://codecov.io/gh/stratumn/js-indigocore)

---

This repository contains javascript libraries to build [Proof of Process Networks](https://proofofprocess.org) using [IndigoCore](https://indigocore.org).

To get started, visit the [IndigoCore website](https://indigocore.org) and download the [SDK](https://indigocore.org/documentation/v0.2.0/getting-started/install).

---

## Development

This multi-package repository (monorepo) is managed by [Lerna](https://github.com/lerna/lerna) to streamline development and testing of cross libraries changes. Make sure you've read Lerna documentation before starting.
Lerna is configured to use [`yarn`](https://yarnpkg.com/en/) for dependency management. Make sure you have it installed.

Install dependencies:

```
yarn
yarn bootstrap
```

Run tests:

```
yarn test
yarn lint
```

Publish dependencies:

```
lerna publish
```

