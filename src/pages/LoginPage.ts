import { Page } from '@playwright/test';

export class LoginPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.goto('https://front.serverest.dev/login');
  }

  async preencherEmail(email: string) {
    await this.page.fill('input[data-testid="email"]', email);
  }

  async preencherSenha(senha: string) {
    await this.page.fill('input[data-testid="senha"]', senha);
  }

  async clicarEmEntrar() {
    await this.page.click('button[data-testid="entrar"]');
  }

  async clicarEmCadastrar() {
    await this.page.click('a[data-testid="cadastrar"]');
  }

  async logar(email: string, senha: string) {
    await this.preencherEmail(email);
    await this.preencherSenha(senha);
    await this.clicarEmEntrar();
  }

  async obterMensagemToaster() {
  const toast = await this.page.waitForSelector('.toast-message', {
    state: 'visible',
    timeout: 5000
  });
  return toast;
  }
  
async obterMensagemDeErro() {
  const alerta = await this.page.waitForSelector('div[role="alert"]', {
    state: 'visible',
    timeout: 5000
  });
  return await alerta.textContent();
}

}
