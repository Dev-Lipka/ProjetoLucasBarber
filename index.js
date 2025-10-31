const pup = require("puppeteer");

const url = "https://whatsagenda.com.br/barber-shop-carioca";
const date = "3-3-2026"; // não pode ter 0, erro com tratamento interno e sem acesso no código fonte

//Seletores
const servicos = ".form-check-input"; //seleciona todos os servicos
const loadingSelector = ".sk-ball-spin-clockwise.ng-star-inserted"; // Seletor loading da página -> "espiral bolinha de carregando"
const buttonVejaMais = "#categItemVertical0 button"; //Seletor do botão "VejaMais"
const barbeiro = "#prestRadio_1"; //Seleciona o Barbeiro LUKE
const buttonDate = ".dateSelectionBtn"; //Botão de data
const selectDate = `[aria-label="${date}"]`; //Seleciona a Data
const buttonHorario = "#btnChooseHora0"; //Botão que apar horário
const classeBotoesHorarios = ".chooseHorarioBtn"; //Classe que contem todos os botões de seleção de horarios

(async () => {
  let browser; //garante que com erro e sem erro no "finaly" o processo seja encerrado, sem processo zumbi
  const mes = await getMonthYear(date, 1);
  const ano = await getMonthYear(date, 2);
  try {
    browser = await pup.launch({ headless: true }); // abre o navegador || headless(escondido) defalut:true(pode deixar sem)
    const page = await browser.newPage(); //abre uma nova guia
    await page.goto(url); //vai para a pagina especificada na url

    console.log("Aguardando o loading da página desaparecer...");

    // Espera o seletor desaparecer.
    await page.waitForSelector(loadingSelector, {
      hidden: true, //hiden é escondido
      timeout: 40000,
    });

    console.log("Loading desapareceu! Página pronta para a próxima ação.");

    //Chama a função auxiliar e faz a selação na página
    await waitAndClick(page, buttonVejaMais, "Botão Veja Mais");
    await selectService(page, servicos, "Seleção Cabelo e Barba");
    await waitAndClick(page, barbeiro, "Seelção do Barbeiro");
    await waitAndClick(page, buttonDate, "Abriu o calendário");
    await selectClick(page, 1, mes, "Selecionou mês");
    await selectClick(page, 2, ano, "Selecionou ano");
    await waitAndClick(page, selectDate, `Selecionou a Data(${date})`);
    console.log(`teste função pega mes é ${mes} e ano ${ano}`);

    //Verifica se tem horário e seleciona todos os botões de horários, depois extrai os valores para dentro de um array
    try {
      await page.waitForSelector(buttonHorario, { timeout: 4000 });
      const pegaValores = await page.$$(classeBotoesHorarios);

      const horarios = [];
      for (const hora of pegaValores) {
        horarios.push(await hora.evaluate((el) => el.textContent.trim()));
      }

      console.log("Horários disponíveis:", horarios);
    } catch (error) {
      console.log("Sem horários disponíveis para esta data."); //se não tiver horário ele da erro, dizendo que não tem horário
    }
  } catch (e) {
    console.error(
      "Ocorreu um erro na execução principal. Verifique o screenshot",
      e
    ); //caso tenha um erro central aqui ele cai

    // Tirar um print do erro para ver onde deu erro
    if (browser) {
      const page = (await browser.pages())[0];
      await page.screenshot({ path: "erroCapturado.png" });
    }
  } finally {
    //garante que o processo seja encerrado
    if (browser) {
      await browser.close();
      console.log("Navegador Fechado!!!");
    }
  }
})();

//  --- Funções auxiliares ---

async function waitAndClick(page, selector, logMessage) {
  await page.waitForSelector(selector);
  await page.click(selector);
  console.log(`Ação concluída: ${logMessage}`);
}
async function selectService(page, servicos, logMessage) {
  const seleciona = await page.$$(servicos);
  await seleciona[2].click();
  console.log(`Ação concluída: ${logMessage}`);
}

async function selectClick(page, index, value, logMessage) {
  const seletorSelect = `select.form-select:nth-of-type(${index})`;
  const valueSelect = value;

  await page.select(seletorSelect, valueSelect);

  console.log(`Ação concluída: ${logMessage}`);
}
async function getMonthYear(date, index) {
  const partes = date.split("-");
  let value = "";
  if (index === 1) {
    value = partes[1];
  } else if (index === 2) {
    value = partes[2];
  } else {
    console.log("Deu algum erro!");
  }
  return value;
}
