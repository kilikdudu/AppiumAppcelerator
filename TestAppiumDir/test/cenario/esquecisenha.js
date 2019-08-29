"use strict";

const webdriverio = require("webdriverio");
const assert = require('chai').assert;
const config = require('../config.js');

const opts = {
  port: config.porta,
  capabilities: config.capabilities
};


describe('Testes de esqueci a senha', function () {
  let client;

  beforeEach(async function () {
    client = await webdriverio.remote(opts);
  });

  afterEach(async function () {
    await client.deleteSession();
  });

  it('Esqueci a senha correto', async function () {
    const fieldCpf = await client.$("~Preencha o cpf");
    await fieldCpf.setValue(config.cpf);

    let element = await client.$("~Esqueci a senha");
    await element.click();

    assert.equal(await client.getAlertText(), 'Sua nova senha foi enviada para o seu email.');
  });

  it('Esqueci a senha - tratamento de erro', async function () {
    const fieldCpf = await client.$("~Preencha o cpf");
    await fieldCpf.setValue("");

    let element = await client.$("~Esqueci a senha");
    await element.click();

    assert.equal(await client.getAlertText(), 'Preencha o cpf primeiro.');
  });

});
