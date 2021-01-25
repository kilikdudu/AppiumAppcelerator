"use strict";

const webdriverio = require("webdriverio");
const assert = require('chai').assert;
const config = require('../config.js');
const util = require('../util.js');

const opts = {
  port: config.porta,
  capabilities: util.getDeviceCapabilities(),
  reporters: [
        // Like this with the default options, see the options below
        'cucumberjs-json',

        // OR like this if you want to set the folder and the language
        [ 'cucumberjs-json', {
                jsonFolder: './tmp/new/',
                language: 'en',
            },
        ],
    ]
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
    const fieldCpf = await util.findElement(client, "Preencha o cpf", util.EleType.TextInput);
    await fieldCpf.setValue(config.cpf);

    let element = await util.findElement(client, "Esqueci a senha");
    await element.click();

    assert.equal(await util.getAlertText(client), 'Sua nova senha foi enviada para o seu email.');
  });

  it('Esqueci a senha - tratamento de erro', async function () {
    const fieldCpf = await util.findElement(client, "Preencha o cpf", util.EleType.TextInput);
    await fieldCpf.setValue("");

    let element = await util.findElement(client, "Esqueci a senha");
    await element.click();

    assert.equal(await util.getAlertText(client), 'Preencha o cpf primeiro.');
  });

});
