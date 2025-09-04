const pup = require("puppeteer");

const url = "https://whatsagenda.com.br/barber-shop-carioca";
const date = "18-9-2025";

(async () => {
  const browser = await pup.launch();
  const page = await browser.newPage();

  await page.goto(url);
  try {
    console.log("Aguardando o loading da página desaparecer...");

    // Seletor loading
    const loadingSelector = ".sk-ball-spin-clockwise.ng-star-inserted";

    // Espera o seletor desaparecer.
    await page.waitForSelector(loadingSelector, {
      hidden: true,
      timeout: 30000,
    });

    console.log("Loading desapareceu! Página pronta para a próxima ação.");

    // #######################################################
    //código automação ->

    //clicar no botão
    await page.waitForSelector("#categItemVertical0 button");
    await page.click("#categItemVertical0 button");
    console.log("Clicou no botão Veja Mais");

    //seleciona o serviço
    await page.waitForSelector("#servRadio02");
    await page.click("#servRadio02");
    console.log("Selecionou o serviço");

    //seleciona o barbeiro
    await page.waitForSelector("#prestRadio_1");
    await page.click("#prestRadio_1");
    console.log("Selecionou o barbeiro");

    //seleciona a data
    await page.waitForSelector(".dateSelectionBtn");
    await page.click(".dateSelectionBtn");
    await page.waitForSelector(`[aria-label="${date}"]`);
    await page.click(`[aria-label="${date}"]`);
    console.log("Selecionou a data");

    //mostra os horários disponíveis
    //espera carregar os horarios, esperando o loading sumir
    await page.waitForSelector("#btnChooseHora0");

    const horarios = await page.evaluate(() => {
      // Esse código é executado no ambiente do navegador.
      // Ele é o mesmo código que você testou no console.
      const elementos = document.querySelectorAll(".chooseHorarioBtn");

      // Extrai o texto e retorna um array.
      return Array.from(elementos).map((el) => el.textContent.trim());
    });

    console.log("Horários disponíveis:", horarios);
    // #######################################################
  } catch (e) {
    console.error(
      "O elemento de loading não desapareceu no tempo esperado || ou ocorreu outro erro:"
    );

    // Tirar um print do erro
    await page.screenshot({ path: "erro_loading_infinito.png" });
  }

  await browser.close();
})();
