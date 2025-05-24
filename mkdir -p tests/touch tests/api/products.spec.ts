import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://serverest.dev';

test('GET /produtos - deve listar produtos com sucesso', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/produtos`);
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.produtos)).toBe(true);
  expect(body.produtos.length).toBeGreaterThan(0);
});

test('POST /produtos - deve retornar erro ao tentar criar produto sem token', async ({ request }) => {
  const produto = {
    nome: 'Produto API Playwright',
    preco: 100,
    descricao: 'Criado via teste Playwright',
    quantidade: 5
  };

  const response = await request.post(`${BASE_URL}/produtos`, {
    data: produto
  });

  expect(response.status()).toBe(401);
  const body = await response.json();
  expect(body.message).toContain('Token de acesso ausente');
});
