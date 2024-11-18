
let translations = {}
let translationsImp = {}
const p = document.getElementById('resultado')
const button = document.querySelector('#calcular');

let resultadoPeso = '';

let test = {}

const setLanguage = (language) => {
    translationsImp = translations[language];
    if (translations[language]) {

        const navTitle = document.querySelector('#navTitle');
        const cardTHeaderTitle = document.querySelector('#cardTHeaderTitle');
        const cardTitle = document.querySelector('#cardTitle');
        const weigth = document.getElementById('peso');
        const heigth = document.getElementById('altura');
        const labelWeigth = document.querySelector('#labelWeigth')
        const labelHeigth = document.querySelector('#labelHeigth')
        const buttonCalc = document.querySelector('#calcular')
        const invalidFeedbackWeigth = document.querySelector('#invalidFeedbackWeigth')
        const invalidFeedbackHeigth = document.querySelector('#invalidFeedbackHeigth')
        const languageSelected = document.querySelector('#languageSelected');
        const metaTitle = document.querySelectorAll('title')[0]


        navTitle.innerHTML = translationsImp.title;
        cardTHeaderTitle.innerText = translationsImp.cardTHeaderTitle;
        cardTitle.innerHTML = translationsImp.cardTitle;
        weigth.placeholder = translationsImp.placeholderWeigth;
        heigth.placeholder = translationsImp.placeholderHeigth;
        labelWeigth.innerText = translationsImp.labelWeigth;
        labelHeigth.innerText = translationsImp.labelHeigth;
        buttonCalc.text = translationsImp.buttonCalc;
        invalidFeedbackWeigth.innerText = translationsImp.invalidFeedbackWeigth;
        invalidFeedbackHeigth.innerText = translationsImp.invalidFeedbackHeigth;
        languageSelected.innerHTML = translationsImp.languageSelected;
        metaTitle.innerText = translationsImp.cardTHeaderTitle;
    } else {
        console.log('Country does not exits')
    }
}


function calcular(reset) {
    let peso = document.getElementById('peso').value;
    let altura = document.getElementById('altura').value;
    if (!reset) {
        validate()
    }
    if (peso && altura && peso >= 1 && altura >= 1) {

        peso = peso.replace(',', '.');
        altura = altura.replace(',', '.');
        const imc = IMC(peso, altura)
        printIMC(imc)
    } else {

    }

}
document.querySelector('#countriesDrop').childNodes
    .forEach(e => e.addEventListener('click', () => {
        const countryName = e.firstChild.id;
        if (countryName) {
            setLanguage(countryName)
            calcular(true)
        }
    }))

button.addEventListener('click', function () {
    calcular();
})

document.querySelectorAll('#peso, #altura').forEach((e) => {
    e.addEventListener('keypress', function (event) {
        if (event.key === "Enter") {
            calcular();
        }
    })
})

document.querySelector('.alert-button-result')
    .addEventListener('click', () => {
        const collapse = document.querySelector('#collapseExample')
        document.querySelector('.alert-result').style.display = 'none';
        document.querySelectorAll('form')[0].reset();
    })

const IMC = (peso, altura) => {
    return (peso / (altura * altura)).toFixed(2);
}

const printIMC = (imc) => {
    const resultDiv = document.querySelector('.alert-result');
    p.classList.remove('baixo-peso', 'peso-normal', 'sobrepeso', 'obesidade')
    resultDiv.classList.remove('alert-warning', 'alert-success', 'alert-danger')
    resultDiv.style.display = 'none';

    if (imc) {
        let pesoType = ''
        resultadoPeso = ''
        if (imc < 18.5) {
            p.classList.add('baixo-peso')
            resultDiv.classList.add('alert-warning')
            pesoType = `${translationsImp.weightTranslate['LOW']} <i class="bi bi-x-circle-fill"></i>`;
            resultadoPeso = 'LOW'
        }
        if (imc >= 18.5 && imc <= 24.99) {
            p.classList.add('peso-normal')
            resultDiv.classList.add('alert-success')
            pesoType = `${translationsImp.weightTranslate['NORMAL']} <i class="bi bi-check-circle-fill"></i>`;
            resultadoPeso = 'NORMAL'
        }
        if (imc >= 25 && imc <= 29.99) {
            p.classList.add('sobrepeso')
            resultDiv.classList.add('alert-warning')
            pesoType = `${translationsImp.weightTranslate['OVERWEIGHT']} <i class="bi bi-exclamation-circle-fill"></i>`;
            resultadoPeso = 'OVERWEIGHT'
        }
        if (imc >= 30) {
            p.classList.add('obesidade')
            resultDiv.classList.add('alert-danger')
            pesoType = `${translationsImp.weightTranslate['OBESE']} <i class="bi bi-x-circle-fill"></i>`
            resultadoPeso = 'OBESE'
        }
        const imcTitle = translationsImp.imcTitle;
        resultDiv.style.display = 'block';
        const iconCopy = `<i class="bi bi-clipboard ms-auto" id="clipboard-copy" role="button" data-toggle="tooltip" data-placement="top" title="${translationsImp.copyTooltip}"></i>`
        document.querySelector('#collapseTextExample').innerHTML = iconCopy + translationsImp.weightDescription[resultadoPeso];
        p.innerHTML = `<span style="color:black">${imcTitle} </span> ${imc} <strong style="color:black;">${pesoType} </strong>`;

        document.querySelector('#clipboard-copy').addEventListener('click', function (e) {
            const copyText = document.querySelector('#collapseTextExample p').innerText;
            navigator.clipboard.writeText(copyText);
            e.target.classList.remove('bi-clipboard');
            e.target.classList.add('bi-check-lg');
            e.target.title = translationsImp.copiedTooltip;
            e.target.dataset = {
                toggle: 'tooltip', placement:'top'
            }
            setTimeout(() => {
                e.target.classList.remove('bi-check-lg');
                e.target.classList.add('bi-clipboard');
                e.target.title = translationsImp.copyTooltip
            }, 2000)
        })
    }


}


function validate() {
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('click', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
            event.preventDefault()
        }, false)
    })

}

async function fetchTranslations() {
    try {
        const response = await fetch('./db/translates.json');
        const data = await response.json();
        translations = data;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}
document.addEventListener("DOMContentLoaded", async function (event) {
    await fetchTranslations()
    setLanguage('pt')
    document.querySelector("object.emb");
    checkBrowser();
});

function checkBrowser() {

    const browsers = {
        Firefox: 'bi-browser-firefox',
        Chrome: 'bi-browser-chrome',
        Safari: 'bi-browser-safari'
    }
    let icon = document.querySelector('.icon-browser')
    if (navigator.userAgent.indexOf("Chrome") > -1) {
        icon.classList.add(browsers.Chrome)
        icon.style.display = 'block';
        return;
    }
    if (navigator.userAgent.indexOf("Firefox") > -1) {
        icon.classList.add(browsers.Firefox)
        icon.style.display = 'block';
        return;
    }

    if (navigator.userAgent.indexOf("Safari") > -1) {
        if (!(navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") > -1)) {
            icon.classList.add(browsers.Safari)
            icon.style.display = 'block';
        }
    }
    else {
        icon.style.display = 'none';
    }

    console.log(navigator.userAgent)

}
