<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Login to Upload</title>
  <style>
    body { font-family: sans-serif; background: #eef; padding: 40px; }
    form { background: white; padding: 20px; border-radius: 10px; max-width: 400px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    label { display: block; margin-top: 10px; font-weight: bold; }
    input { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }
    button { margin-top: 15px; padding: 10px 20px; background: #38a; color: white; border: none; border-radius: 5px; cursor: pointer; }
    .result { margin-top: 15px; font-weight: bold; text-align: center; }
  </style>
</head>
<body>

  <form id="login-form">
    <h2>Login to Upload World</h2>

    <label for="user">Username</label>
    <input type="text" id="user" required>

    <label for="pass">Password</label>
    <input type="password" id="pass" required>

    <button type="submit">Login</button>

    <div class="result" id="result"></div>
  </form>

  <script>
    document.getElementById('login-form').addEventListener('submit', async function(event) {
      event.preventDefault();
      const user = document.getElementById('user').value.trim();
      const pass = document.getElementById('pass').value.trim();
      const result = document.getElementById('result');

      if (!user || !pass) {
        result.textContent = 'Please fill in both fields.';
        return;
      }

      const res = await fetch("https://minecrafteduhubauth.minecraftworld.worker.io/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass })
      });

      if (!res.ok) {
        result.textContent = "❌ Login failed.";
        result.style.color = "red";
        return;
      }

      const data = await res.json();
      if (data.valid && data.token) {
        localStorage.setItem("auth_token", data.token);
        window.location.href = "upload.html";
      } else {
        result.textContent = "❌ Invalid credentials.";
        result.style.color = "red";
      }
    });
  </script>

</body>
</html>
