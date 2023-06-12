// JavaScript
let idAtual = 0;

function generateUUID() {
  var values = new Uint8Array(16);
  crypto.getRandomValues(values);
  values[6] = (values[6] & 0x0f) | 0x40; 
  values[8] = (values[8] & 0x3f) | 0x80; 
  var hexValues = Array.from(values, function(byte) {
    return ('0' + byte.toString(16)).slice(-2);
  });
  var uuid = [
    hexValues.slice(0, 4).join(''),
    hexValues.slice(4, 6).join(''),
    hexValues.slice(6, 8).join(''),
    hexValues.slice(8, 10).join(''),
    hexValues.slice(10, 16).join('')
  ].join('-');
  return uuid;
}

function preencher() {
  const tbody = document.getElementById('tbody');
  const nomeValue = document.getElementById('nome-anime').value;
  const descValue = document.getElementById('desc-anime').value;
  idAtual = generateUUID();
  if (nomeValue === '' || descValue === '') {
    alert('Nome ou descrição estão vazios');
    return;
  }
  tbody.innerHTML += `<tr><td>${idAtual}</td><td>${nomeValue}</td><td>${descValue}</td><td><button onclick="deleteItem()">Deletar este anime</button></td></tr>`;
  document.getElementById('nome-anime').value = '';
  document.getElementById('desc-anime').value = '';
}