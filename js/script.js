const input = document.querySelector('input[name=tarefa]')
const btn = document.querySelector('#botao')
const lista = document.querySelector('#lista')

let card = document.querySelector('.card')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function redenrizarTarefas(){
    //Limpar a listagem de itens antes de renderizar novamente a tela

    lista.innerHTML = ''
    for(tarefa of tarefas){
        
        //Criar o item da lista
        let itemLista = document.createElement('li')

        //Adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action')

        //Adicionar evento de clique no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this)
        }

        //Criar texto
        let itemTexto = document.createTextNode(tarefa)

        //Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto)

        //adicionar o item da lista na lista
        lista.appendChild(itemLista)
    }
}

//Executando a função para renderizar as tarefas
redenrizarTarefas()

btn.onclick = function(){
    let novaTarefa = input.value

    if(novaTarefa !== ''){
        tarefas.push(novaTarefa)

        //Executando a função para renderizar as tarefas
        redenrizarTarefas()
    
        //Limpar o input
        input.value = ''
        
        //Limpar mensagens de erro (sapns)
        removerSpans()

        //Salva os novos dados no banco de dados
        salvarDadosNoStorage()
    } else{
        removerSpans()

    
        let span = document.createElement('span')
        span.setAttribute('class', 'alert alert-warning')

        let msg = document.createTextNode('Você precisa infromar a tarefa!')

        span.appendChild(msg)

        card.appendChild(span)
    }

    function removerSpans(){
       
        let spans = document.querySelectorAll('span')

        for (let i = 0; i < spans.length; i++) {
            card.removeChild(spans[i])
            
        }
    }


}

function deletarTarefa(target){
    //Remove a tarefa do array
    tarefas.splice(tarefas.indexOf(target.textContent), 1)

    //Renderizar a tela com a tarefa excluida
    redenrizarTarefas()

    //Salva os novos dados no banco de dados
    salvarDadosNoStorage()

}

function salvarDadosNoStorage(){
    //Todo navegador web possui esta capacidade
    localStorage.setItem('tarefas', JSON.stringify(tarefas))

}
