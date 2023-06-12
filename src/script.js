function preencher() {
    const tbody = document.getElementById('tbody');
    const nomeValue = document.getElementById('nome-anime').value;
    const descValue = document.getElementById('desc-anime').value;
    tbody.innerHTML+= `<tr><td>${nomeValue}</td><td>${descValue}</td></tr>`
}