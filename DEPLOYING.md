# Deploying

Merging to `dev` runs CI, and if the build passes, the `deploy` job pushes to
Heroku and verifies the app serves its built bundle. Nothing deploys from a
pull request.

Heroku builds the app itself. The Node buildpack installs dependencies, runs
`npm run build`, prunes devDependencies, then runs the `Procfile`:

```
web: serve -s build -l $PORT
```

`serve` is in `dependencies`, not `devDependencies`, precisely because Heroku
prunes the latter after the build.

## One-time setup

### GitHub

**Settings > Secrets and variables > Actions**

| Kind | Name | Value |
|---|---|---|
| Secret | `HEROKU_API_KEY` | `heroku authorizations:create` output |
| Variable | `HEROKU_APP_NAME` | The Heroku app name |
| Variable | `HEROKU_APP_URL` | The app's full `https://` URL, no trailing slash |

### Heroku config vars

```sh
heroku config:set --app "$APP" REACT_APP_API_BASE_URL='https://<the-api-host>'
```

**This has to be a Heroku config var, not a GitHub one.** Create React App
inlines `REACT_APP_*` variables into the bundle at build time, and the build
happens on Heroku. Setting it in GitHub Actions would have no effect on what
users receive.

No trailing slash: the app builds URLs as `${BASE_URL}/getAllUsers`.

If it is unset, `src/config.js` falls back to the backend URL hardcoded there,
which is probably not what a given environment wants.

## Before the first deploy

The `Procfile` in this repo previously read `web: node ./App.js`, a file that
does not exist here — it had been copied from the backend. This app has
therefore never deployed successfully from it. Expect the first deploy to be
a genuine first deploy.

The API it talks to is also currently down, so a successful deploy of this
dashboard will still show empty charts until the backend has a database. See
the backend repo's `DEPLOYING.md`.

## Rolling back

```sh
heroku releases --app "$APP"
heroku rollback --app "$APP"
```
