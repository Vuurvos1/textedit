# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Inspector

To enable the Svelte inspector while in development mode you can press `windows + shift` now you can easily inspect elements and move to the coresponding files inside the editor

```sql
-- auto update updated_at column when data is updated
create trigger handle_updated_at before update on notes
  for each row execute procedure moddatetime (updated_at);
```
