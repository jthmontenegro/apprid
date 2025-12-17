const output = document.getElementById('output');

document.getElementById('btnMysql').addEventListener('click', async () => {
  output.textContent = 'Conectando a MySQL...';

  const res = await fetch('/api/demo/mysql');
  const data = await res.json();

  output.textContent = JSON.stringify(data, null, 2);
});

document.getElementById('btnMongo').addEventListener('click', async () => {
  output.textContent = 'Conectando a MongoDB...';

  const res = await fetch('/api/demo/mongo');
  const data = await res.json();

  output.textContent = JSON.stringify(data, null, 2);
});
