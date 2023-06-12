const url = 'https://vanilla-js-testing-default-rtdb.firebaseio.com/animes.json'
function preencher() {
    const tbody = document.getElementById('tbody');
    // tbody.innerHTML+= `<tr><td>One Piece</td><td>1100</td></tr>`
    const nomeInput= document.getElementById('nome-anime').value;
    const descInput= document.getElementById('desc-anime').value;
    const data ={
        nome: nomeInput,
        desc: descInput,
    }   
    fetch(url,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resposta => resposta.json())
    .then(data=>{
      console.log(data)
      PopularTabela(data);
    })
    .catch(erro=>console.error(erro))
}
async function PopularTabela(){
    const resultado = await fetch(url);
    const resultadoConvertido =  await resultado.json();
    const arr = Object.entries(resultadoConvertido).map(([id,values])=>({id,...values}));
    const tableBody = document.getElementById("tbody");
    tableBody.innerHTML = gerarTableRows(arr);
}
function gerarTableRows(array){
    return array.map((item,index)=> `
        <tr>
            <td>${item.nome}</td>
            <td>${item.desc}</td>
        </tr>
    `).join('');
}
PopularTabela();