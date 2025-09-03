# ProjetoLucasBarber

Projeto com foco em ser minha primeira experiencia real com programação como foco em um problema real, onde sera criado um sistema de agendamento moderno em cima de um sistema legado, para futuramente ser completamente migrado e evoluido para mobile.

# 📋 Roadmap do Projeto – Bot de Agendamento Barbearia

## 🔹 Semana 1 – Fundamentos

- [x] Instalar Node.js
- [x] Criar repositório no GitHub
- [x] Fazer “Hello World” em Node.js
- [ ] Estudar como funciona o `package.json`
- [ ] Revisar lógica de programação

---

## 🔹 Semana 2 – Web Scraping básico

- [ ] Instalar Puppeteer (`npm install puppeteer`)
- [ ] Criar script que abre o navegador e acessa o site da barbearia
- [ ] Fazer bot pegar **título da página** e mostrar no console (primeiro teste)
- [ ] Navegar até a página de agendamento
- [ ] Extrair horários disponíveis (mesmo que em formato de texto simples)

---

## 🔹 Semana 3 – Fluxo de Agendamento

- [ ] Criar script que seleciona um serviço (ex: corte de cabelo)
- [ ] Preencher nome e telefone fictício
- [ ] Confirmar o agendamento (teste)
- [ ] Capturar a mensagem de confirmação do site

---

## 🔹 Semana 4 – Criar a API

- [ ] Instalar Express (`npm install express`)
- [ ] Criar servidor básico (`GET /ping` retorna "pong")
- [ ] Endpoint `GET /horarios?data=YYYY-MM-DD` que chama o bot e retorna JSON
- [ ] Endpoint `POST /agendar` que chama o bot para confirmar horário

---

## 🔹 Semana 5 – Interface para cliente

- [ ] Criar site simples com HTML + CSS + JS
- [ ] Formulário para escolher data → consumir `/horarios`
- [ ] Mostrar lista de horários disponíveis
- [ ] Formulário com nome e telefone → enviar para `/agendar`
- [ ] Mostrar mensagem de confirmação na tela

---

## 🔹 Semana 6 – Hospedagem

- [ ] Subir API no **Render** ou **Railway**
- [ ] Subir frontend no **Netlify** ou **Vercel**
- [ ] Testar fluxo completo na nuvem (cliente → API → site da barbearia)

---

## 🔹 Semana 7+ – Evolução

- [ ] Criar banco de dados SQLite para salvar agendamentos
- [ ] Criar painel para barbeiro ver lista de agendamentos
- [ ] Desligar scraping e usar só seu sistema novo

---

## Resumo do que já foi feito

- Instalado Node.js v lts
