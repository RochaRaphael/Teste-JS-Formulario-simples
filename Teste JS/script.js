const formDados1 = document.querySelector(".containerGabarito");
const formDados2 = document.querySelector(".containerResposta");
const formDados3 = document.querySelector(".containerCorrige");
const setButton = document.querySelector(".setButton");
const correctButton = document.querySelector(".correctButton");
const form = document.querySelector("#formResposta");

setButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    const formCompleted = {};

    formData.forEach((value, key) => {
        formCompleted[key] = value;
    });

    localStorage.setItem('formCompleted', JSON.stringify(formCompleted));
});

correctButton.addEventListener('click', async (event) => {
    event.preventDefault();
    await compara();
});

async function mostraDados(){
    try{

        const busca = await fetch("https://server.omnion.com.br:10005/api/Cliente/ListarClienteDocAnon/44462965078");
        if (busca.ok){
            const dados = await busca.json(); 
            
            formDados1.innerHTML += `
                <p>Nome: <strong>${dados.cargoDescricao}</strong></p>
                <p>Status: <strong>${dados.status}</strong></p>
                <p>Verdadeiro ou falso: <strong>${dados.atualizarEndereco}</strong></p>
                <p>FlagEmail: <strong>${dados.flagEmail}</strong></p>
            `
        }
        else {
            console.error("Erro ao buscar vídeo:", busca.status);
        }
    }
    catch(error){
        formDados1.innerHTML = `<p> Houve um erro ao carregar os dados: ${error}</p>`
    }
}

async function compara(){
    try{
        
        const busca = await fetch("https://server.omnion.com.br:10005/api/Cliente/ListarClienteDocAnon/44462965078");
        if (busca.ok){
            const dados = await busca.json(); 
            
            const correctAnswers = {
                fName: dados.cargoDescricao,
                fStatus: dados.status,
                fVerdadeiro: dados.atualizarEndereco,
                fFlag: dados.flagEmail
            }
            
        
            const answers = localStorage.getItem('formCompleted');

            if (answers) {
                const differences = [];

                Object.keys(correctAnswers).forEach(key => {
                    if (correctAnswers[key] !== answers[key]) {
                        differences.push(`${key}: esperado ${correctAnswers[key]}, recebido ${answers[key]}`);
                    }
                });

                if (differences.length === 0) {
                    console.log("BÃO");
                } else {
                    console.log("Respostas diferentes:", differences.join("; "));
                }
            } else {
                console.log("Nenhuma resposta salva");
            }
        }
        else {
            console.error("Erro ao buscar vídeo:", busca.status);
        }
        
    }
    catch(error){
        formDados.innerHTML = `<p> Houve um erro ao carregar os dados: ${error}</p>`
    }
}

compara();
mostraDados();

(async () => {
    try {
        //const busca = await fetch("http://localhost:10005/api/Cliente/ListarClienteDocAnon/44462965078");
        const busca = await fetch("https://server.omnion.com.br:10005/api/Cliente/ListarClienteDocAnon/44462965078");
        if (busca.ok) {
            const video = await busca.json(); // Obtenha o objeto JSON
            console.log(video); // Exiba o objeto JSON no console

            // Acesse diretamente o campo "cargo" do objeto
            if (video.cargo == 86263) {
                console.log("Deu bom");
            } else {
                console.log("Deu ruim");
            }
        } else {
            console.error("Erro ao buscar vídeo:", busca.status);
        }
    } catch (error) {
        console.error("Erro ao buscar vídeo:", error);
    }
})();
