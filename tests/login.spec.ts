import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

let login: LoginPage;


test.describe('Testes de Login - Serverest', () => {

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.goto();
  });

  test('Cenário 1 – Login com sucesso [CRÍTICO]', async () => {
    // Credenciais válidas: fulano@qa.com / teste (base limpa diariamente)
    await login.logar('fulano@qa.com', 'teste');
    await expect(login.page).toHaveURL('https://front.serverest.dev/admin/home');
  });

  test('Cenário 2 – Tentativa de login com e-mail inválido [ALTA]', async () => {
  await login.logar('naoexiste@teste.com', 'senhaqualquer');
  const mensagemErro = await login.obterMensagemDeErro();
  expect(mensagemErro).toContain('Email e/ou senha inválidos');
});

test('Cenário 3 – Tentativa de login com senha inválida [ALTA]', async () => {
  await login.logar('fulano@qa.com', 'senhaerrada');
  const mensagemErro = await login.obterMensagemDeErro();
  expect(mensagemErro).toContain('Email e/ou senha inválidos');
});

test('Cenário 4 – Tentativa de login com campos obrigatórios vazios [MÉDIA]', async () => {
  await login.clicarEmEntrar();
  const mensagemErro = await login.obterMensagemDeErro();
  expect(mensagemErro).toContain('Email é obrigatório');
});


  test('Cenário 5 – Link para registro de novo usuário [BAIXA]', async () => {
    await login.clicarEmCadastrar();
    await expect(login.page).toHaveURL('https://front.serverest.dev/cadastrarusuarios');
  });
});



/*import { test, expect} from '@playwright/test'

test('nao deve logar com senha incoreta', async ({ page }) => {
    await page.goto('https://login-app-qacademy.vercel.app/');
    const title = page.locator('.App-header p')
    await expect(title).toHaveText('Login')

    await page.fill('input[placeholder$=usuário]', 'qa')
    await page.fill('input[placeholder^=senha]', 'cademi')
    await page.click('button >> text=Entrar')

    const target = page.locator('.toast-message div[role=status]')
    await expect(target).toHaveText('Oops! Credenciais inválidas :(')

    // temporario
    // await page.waitForTimeout(1500)
    // const contentPage  = await page.content()

    // const fs = require('fs')
    // fs.writeFileSync('temp.html', contentPage)
})
*/
