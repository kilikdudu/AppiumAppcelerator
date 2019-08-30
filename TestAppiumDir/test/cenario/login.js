"use strict";

const webdriverio = require("webdriverio");
const assert = require('chai').assert;
const config = require('../config.js');
const util = require('../util.js');

const opts = {
  port: config.porta,
  capabilities: util.getDeviceCapabilities()
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
    const fieldCpf = await util.findElement(client, "Preencha o cpf", util.EleType.TextInput);
    await fieldCpf.setValue(config.cpf);

    const fieldSenha = await util.findElement(client, "Preencha a senha", util.EleType.TextInput);
    await fieldSenha.setValue(config.senha);

    let element = await util.findElement(client, "Entrar");
    await element.click();

    assert.equal(await util.getAlertText(client), 'Sucesso');
  });

  it('Login incorreto', async function () {
    const fieldCpf = await util.findElement(client, "Preencha o cpf", util.EleType.TextInput);
    await fieldCpf.setValue(config.cpf);

    const fieldSenha = await util.findElement(client, "Preencha a senha", util.EleType.TextInput);
    await fieldSenha.setValue(config.senha + "01");

    let element = await util.findElement(client, "Entrar");
    await element.click();

    assert.equal(await util.getAlertText(client), 'Falhou');
  });

});
