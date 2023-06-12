function preencher() {
    const tbody = document.getElementById('tbody');
    const nomeValue = document.getElementById('nome-anime').value;
    const descValue = document.getElementById('desc-anime').value;
    if(nomeValue === '' || descValue === ''){
        alert('Nome ou descrição estão vazios')
        return
    }
    tbody.innerHTML+= `<tr><td>${nomeValue}</td><td>${descValue}</td></tr>`
    document.getElementById('nome-anime').value = '';
    document.getElementById('desc-anime').value = '';
}