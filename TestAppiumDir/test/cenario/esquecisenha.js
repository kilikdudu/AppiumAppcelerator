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
    await fieldCpf.setValue("123.456.789-01");

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
