const AUTH_URL = "https://minecrafteduhubauth.minecraftworld.workers.dev/password/authorize
async function verifyToken(token) {
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });

  if (!res.ok) return false;

  const data = await res.json();
  return data.valid === true;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/upload') {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response("Missing or invalid Authorization header", { status: 401 });
      }

      const token = authHeader.slice(7);
      const isValid = await verifyToken(token);

      if (!isValid) {
        return new Response("Unauthorized", { status: 403 });
      }

      const { name, code } = await request.json();
      if (!name || !code) {
        return new Response("Invalid payload", { status: 400 });
      }

      await env.WORLD_CODES.put(name, code);
      return new Response("Uploaded", { status: 200 });
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
}
