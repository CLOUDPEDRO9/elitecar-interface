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