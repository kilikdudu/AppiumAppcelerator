"use strict";

const webdriverio = require("webdriverio");
const assert = require('chai').assert;
const config = require('../config.js');

const opts = {
  port: config.porta,
  capabilities: config.capabilities
};


describe('Testes de login', function () {
  let client;

  beforeEach(async function () {
    client = await webdriverio.remote(opts);
  });

  afterEach(async function () {
    await client.deleteSession();
  });

  it('Login correto', async function () {
    const fieldCpf = await client.$("~Preencha o cpf");
    await fieldCpf.setValue(config.cpf);

    const fieldSenha = await client.$("~Preencha a senha");
    await fieldSenha.setValue(config.senha);

    let element = await client.$("~Entrar");
    await element.click();

    assert.equal(await client.getAlertText(), 'Sucesso');
  });

  it('Login incorreto', async function () {
    const fieldCpf = await client.$("~Preencha o cpf");
    await fieldCpf.setValue(config.cpf);

    const fieldSenha = await client.$("~Preencha a senha");
    await fieldSenha.setValue(config.senha + "01");

    let element = await client.$("~Entrar");
    await element.click();

    assert.equal(await client.getAlertText(), 'Falhou');
  });

});
