async function enviaFormulario() {
    const clienteDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "cpf": Number(document.querySelectorAll("input")[1].value),
        "telefone": Number(document.querySelectorAll("input")[2].value)
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/cliente", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });
    
        if(!respostaServidor.ok) {
            throw new Error("Erro ao enviar os dados para o respostaServidor. Contate o administrador do sistema");
        }
    
        alert("Cliente cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

async function recuperarListaClientes() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/clientes");

        if(!respostaServidor.ok) {
            throw new Error('Erro ao comunicar com o servidor.');
        }
        const listarDeClientes = await respostaServidor.json();
        criarTabelasClientes(listarDeClientes)
    } catch (error) {
        console.log('erro ao se comunicar com o servidor');
        console.log(error);
    }
}

// Função para preencher a tabela com os dados recebidos
function criarTabelasClientes(clientes) {
    const tabela = document.getElementById('clienteTableBody');

    clientes.forEach(cliente => {
        
        const row = document.createElement('tr');

        const id = document.createElement('td');
        id.textContent = cliente.idCliente;
        
        const nome = document.createElement('td');
        nome.textContent = cliente.nome;

        
        const cpf = document.createElement('td');
        cpf.textContent = cliente.cpf;

        
        const telefone = document.createElement('td');
        telefone.textContent = cliente.telefone;

        const tdAcoes = document.createElement('td');
        
        const iconAtualizar = document.createElement('img'); // Cria o elemento <img>
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; // Define o caminho da imagem
        iconAtualizar.alt = 'Ícone de edição'; // Texto alternativo para acessibilidade


        const iconExcluir = document.createElement('img'); // Cria o elemento <img>
        iconExcluir.src = 'assets/icons/trash-fill.svg'; // Define o caminho da imagem
        iconExcluir.alt = 'Ícone de excluir'; // Texto alternativo para acessibilidade


        row.appendChild(id);
        row.appendChild(nome);
        row.appendChild(cpf);
        row.appendChild(telefone);
        tdAcoes.appendChild(iconAtualizar); // Adiciona o <img> dentro da célula <td>
        row.appendChild(tdAcoes); // Adiciona a célula de imagem à linha
        tdAcoes.appendChild(iconExcluir); // Adiciona o <img> dentro da célula <td>


        tabela.appendChild(row)
    });
}