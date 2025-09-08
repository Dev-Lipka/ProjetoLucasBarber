const pup = require("puppeteer");

const url = "https://whatsagenda.com.br/barber-shop-carioca";
const date = "11-9-2025"; // não pode ter 0, erro com tratamento interno e sem acesso no código original

//Seletores
const loadingSelector = ".sk-ball-spin-clockwise.ng-star-inserted"; // Seletor loading da página -> "espiral bolinha de carregando"
const buttonVejaMais = "#categItemVertical0 button"; //Seletor do botão "VejaMais"
const cabeloBarba = "#servRadio02"; //Seleciona Cabelo e Barba no site
const barbeiro = "#prestRadio_1"; //Seleciona o Barbeiro LUKE
const buttonDate = ".dateSelectionBtn"; //Botão de data
const selectDate = `[aria-label="${date}"]`; //Seleciona a Data
const buttonHorario = "#btnChooseHora0"; //Botão que apar horário
const classeBotoesHorarios = ".chooseHorarioBtn"; //Classe que contem todos os botões de seleção de horarios

(async () => {
  let browser; //garante que com erro e sem erro no "finaly" o processo seja encerrado, sem processo zumbi
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
    await waitAndClick(page, cabeloBarba, "Seleção Cabelo e Barba");
    await waitAndClick(page, barbeiro, "Seelção do Barbeiro");
    await waitAndClick(page, buttonDate, "Abriu o calendário");
    await waitAndClick(page, selectDate, `Selecionou a Data(${date})`);

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

//  --- Função auxiliar ---

async function waitAndClick(page, selector, logMessage) {
  await page.waitForSelector(selector);
  await page.click(selector);
  console.log(`Ação concluída: ${logMessage}`);
}
