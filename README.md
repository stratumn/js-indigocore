# Stratumn Agent

**DEPRECATED**: we are moving away from this agent model and trying to push
more utilities client-side (especially cryptographic schemes that require the
user's private key). You should use [stratumn/js-core](https://github.com/stratumn/js-core)
to build Proof-of-Process applications.
We are working on tutorials on our [website](https://developer.stratumn.com).

[Stratumn](https://stratumn.com)'s open-source JavaScript libraries to create p2p applications and networks.

[![npm](https://img.shields.io/npm/v/@stratumn/agent.svg)](https://www.npmjs.com/package/@stratumn/agent)
[![Build Status](https://semaphoreci.com/api/v1/stratumn/agent/branches/master/badge.svg)](https://semaphoreci.com/stratumn/agent)
[![codecov](https://codecov.io/gh/stratumn/agent/branch/master/graph/badge.svg)](https://codecov.io/gh/stratumn/agent)

---

This repository contains javascript libraries to build [Proof of Process Networks](https://proofofprocess.org).

To get started, visit the [developer website](https://developer.stratumn.com).

---

## Development

This multi-package repository (monorepo) is managed by [Lerna](https://github.com/lerna/lerna) to streamline development and testing of cross libraries changes. Make sure you've read Lerna documentation before starting.
Lerna is configured to use [`yarn`](https://yarnpkg.com/en/) for dependency management. Make sure you have it installed.

Install dependencies:

```bash
yarn
yarn bootstrap
```

Run tests:

```bash
yarn test
yarn lint
```

Publish dependencies:

```bash
lerna publish
```
