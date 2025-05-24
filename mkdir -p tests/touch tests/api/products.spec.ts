import { test, expect, request, APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://serverest.dev';

async function obterToken(request: APIRequestContext): Promise<string> {
  const loginResponse = await request.post(`${BASE_URL}/login`, {
    data: {
      email: 'fulano@qa.com',
      password: 'teste'
    }
  });

  expect(loginResponse.status()).toBe(200);
  const body = await loginResponse.json();
  return body.authorization;
}

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

test('GET /produtos - cada item deve ter nome, preco, descricao e quantidade', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/produtos`);
  const { produtos } = await response.json();

  const primeiro = produtos[0];
  expect(primeiro).toHaveProperty('nome');
  expect(primeiro).toHaveProperty('preco');
  expect(primeiro).toHaveProperty('descricao');
  expect(primeiro).toHaveProperty('quantidade');
});

test('POST /login - deve autenticar com sucesso e retornar token', async ({ request }) => {
  const token = await obterToken(request);
  expect(token).toBeTruthy();
});

test('POST /produtos - deve criar produto com token de admin', async ({ request }) => {
  const token = await obterToken(request);
  const timestamp = Date.now();

  const response = await request.post(`${BASE_URL}/produtos`, {
    data: {
      nome: `Café com deus pai ${timestamp}`,
      preco: 100,
      descricao: 'Café super faturado',
      quantidade: 1
    },
    headers: {
      Authorization: token
    }
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.message).toContain('Cadastro realizado com sucesso');
});

test('POST /produtos - deve falhar ao tentar criar produto com nome já existente', async ({ request }) => {
  const token = await obterToken(request);

  const produto = {
    nome: 'Produto duplicado teste',
    preco: 50,
    descricao: 'Primeiro cadastro',
    quantidade: 1
  };

  await request.post(`${BASE_URL}/produtos`, {
    data: produto,
    headers: { Authorization: token }
  });

  const respostaDuplicada = await request.post(`${BASE_URL}/produtos`, {
    data: produto,
    headers: { Authorization: token }
  });

  expect(respostaDuplicada.status()).toBe(400);
  const body = await respostaDuplicada.json();
  expect(body.message).toContain('Já existe produto com esse nome');
});
