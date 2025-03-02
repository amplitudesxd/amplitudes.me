## what is this?

this is my personal website, hosted at [amplitudes.me](https://amplitudes.me).

though i've moved on as a person and a developer, the old version is still available under the [old](https://github.com/amplitudesxd/amplitudes.me/tree/old) branch of this repository if you'd still like to see it.

## how to run it yourself

### prerequisites

- [node.js](https://nodejs.org/) (preferably the latest lts version)
- [pnpm](https://pnpm.io/installation) (recommended) or npm or yarn
- basic command line knowledge

### local development

1. clone this repo

```bash
git clone https://github.com/amplitudesxd/amplitudes.me.git
cd amplitudes.me
```

2. install dependencies

```bash
pnpm install
```

3. set up spotify integration (optional)

- create a [spotify developer application](https://developer.spotify.com/dashboard/applications)
- get your client id and client secret
- create a `.dev.vars` file in the root directory with:

```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

- to obtain a refresh token, use the [spotify authorization guide](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/)

4. run development server

```bash
pnpm dev
```

5. open http://localhost:3000 in your browser

### deploying your own version

this site uses cloudflare pages for hosting. to deploy your own:

1. fork this repository
2. connect it to your [cloudflare pages](https://pages.cloudflare.com/) account
3. use these build settings:
   - build command: `pnpm run build`
   - output directory: `dist`
4. add the spotify environment variables in cloudflare pages settings:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`

alternatively, use the wrangler cli:

```bash
pnpm run deploy
```
