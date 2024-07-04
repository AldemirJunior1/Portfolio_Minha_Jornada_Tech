const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.getElementById("contact-form");
const submitBtn = document.querySelector(".formcontato__botao");

const nomeInput = document.getElementById("insert--name");
const emailInput = document.getElementById("insert--email");
const assuntoInput = document.getElementById("insert--subject");
const mensagemInput = document.getElementById("insert--message");

const publicKey = "RmgKIqpaQJUrgryfQ";
const serviceId = "service_eayp3rs";
const templateId = "template_hoymqhj";

emailjs.init(publicKey);

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    submitBtn.innerText = "Espere um momento";

    const listaRespostas = {
        nome: nomeInput.value,
        email: emailInput.value,
        assunto: assuntoInput.value,
        mensagem: mensagemInput.value
    };

    emailjs.send(serviceId, templateId, listaRespostas).then(() => {
        submitBtn.innerText = "Mensagem enviada com sucesso";
        
        nomeInput.value = "";
        emailInput.value = "";
        assuntoInput.value = "";
        mensagemInput.value = "";
    }, (error) => {
        console.log(error);
        submitBtn.innerText = "Algo deu errado";
    });

    console.log(listaRespostas);
});

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

const tiposDeErro = ['valueMissing', 'typeMismatch', 'patternMismatch', 'tooShort'];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    assunto: {
        valueMissing: "O campo de assunto não pode estar vazio.",
        tooShort: "O assunto precisa ter pelo menos 5 caracteres."
    },
    mensagem: {
        valueMissing: "O campo de mensagem não pode estar vazio.",
        tooShort: "A mensagem precisa ter pelo menos 10 caracteres."
    }
};

function verificarCampo(campo) {
    let mensagem = "";
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    });
    const mensagemErro = campo.nextElementSibling;
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
