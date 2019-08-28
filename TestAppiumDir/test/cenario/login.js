"use strict";

const webdriverio = require("webdriverio");
const assert = require('chai').assert;

const opts = {
  port: 4723,
  capabilities: {
    platformName: "iOS",
    platformVersion: "12.4",
    deviceName: "iPhone 6s Plus",
    app: "/Users/carlos/Documents/Appcelerator_Studio_Workspace/AppiumAppcelerator/build/iphone/build/Products/Debug-iphonesimulator/AppiumAppcelerator.app",
    automationName: "xcuitest"
  }
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
    await fieldCpf.setValue("123.456.789-01");

    const fieldSenha = await client.$("~Preencha a senha");
    await fieldSenha.setValue("123456");

    let element = await client.$("~Entrar");
    await element.click();

    assert.equal(await client.getAlertText(), 'Sucesso');
  });

  it('Login incorreto', async function () {
    const fieldCpf = await client.$("~Preencha o cpf");
    await fieldCpf.setValue("123.456.789-01");

    const fieldSenha = await client.$("~Preencha a senha");
    await fieldSenha.setValue("1234568");

    let element = await client.$("~Entrar");
    await element.click();

    assert.equal(await client.getAlertText(), 'Falhou');
  });

});
