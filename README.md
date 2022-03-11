# 🦁 Edge Functions Benchmark
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![Vercel](https://img.shields.io/badge/vercel-hosting-9cf)](https://edge-functions-benchmark.vercel.app/)

A benchmark for edge functions on Vercel.

This application runs a benchmark to compare:
- Computations ran and returned by an edge network
- Computations ran and returned by a typical cloud network

## 📄 Scripts

Run any of the following scripts using `yarn`:

```
yarn <script>
```

| Script | Description                                                          |
|--------|----------------------------------------------------------------------|
| build  | Build the Next.js application, ready to be ran with `start`          |
| clean  | Remove linter output files                                           |
| dev    | Start the Next.js application in hot-reloading mode, for development |
| fix    | Automatically fix all linting issues in files                        |
| lint   | Check all files, reporting them to the console                       |
| start  | Start the Next.js application in production mode, requires `build`   |

### 🙋‍♂️ Don't have Yarn?

Install it using npm.

```
npm install --global yarn
```

## ⚙️ Environment Variables

**Do not push sensitive keys to GitHub**. You should follow [Next.js' Guide](https://nextjs.org/docs/basic-features/environment-variables) for environment variables.

This includes:

- **.env.local**: Use a `.env.local` file for any sensitive keys. These should not be pushed to GitHub.
- **.env**: Use a `.env` file for any application configuration that can be safely committed to GitHub, such as a `PORT` value.

### 🌐 Exposing Environment Variables to the Browser

By default, Next.js will only load environment variables in the Node.js environment and not load them in the browser.

It may be the case that, in some circumstances, it is necessary to load these values in the browser. To do this, prefix the environment variable with `NEXT_PUBLIC_`:

```env
NEXT_PUBLIC_ANALYTICS_ID=foo
```

### 🔨 Environment variables used in this application

Use this table to store and describe the environment variables used in your application so that others can maintain your application.

| Key             | Description                                    | Required |
|-----------------|------------------------------------------------|----------|
| PORT            | The port that the application runs on.         | No       |
| NEXT_PUBLIC_FOO | An example value.                              | No       |
