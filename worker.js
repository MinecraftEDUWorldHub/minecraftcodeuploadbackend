export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/upload') {
      const { name, code } = await request.json();
      await env.WORLD_CODES.put(name, code);
      return new Response('Uploaded', { status: 200 });
    }

    if (request.method === 'GET' && url.pathname === '/worlds') {
      const list = await env.WORLD_CODES.list();
      const keys = {};
      for (const entry of list.keys) {
        const val = await env.WORLD_CODES.get(entry.name);
        keys[entry.name] = val;
      }
      return new Response(JSON.stringify(keys), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};
