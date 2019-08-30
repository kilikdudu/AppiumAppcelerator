"use strict";

const config = require('./config.js');

const EleType = {
  TextInput: 1,
  Button: 2
}

exports.EleType = EleType;

exports.getDeviceCapabilities = function() {
  var value = "";
  for (var index in process.argv) {
      var str = process.argv[index];
      if (str.indexOf("--plataforma") == 0) {
          value = str.split("=")[1];
      }
  }
  return (value == 'android' ? config.capabilities_android : config.capabilities_ios)
}

exports.findElement = async function(client, locator, type) {
  if(exports.getDeviceCapabilities().platformName === 'Android') {
    if(type && type == EleType.TextInput)
      return await client.$("//*[@content-desc='" + locator + ".']/android.widget.FrameLayout/android.widget.EditText");
    else
      return await client.$("//*[@content-desc='" + locator + ".']");
  } else {
      return await client.$("~" + locator);
  }
};

exports.getAlertText = async function(client) {
  if(exports.getDeviceCapabilities().platformName === 'Android') {
    let alerta = await client.getAlertText();
    return alerta.split("\n")[1];
  } else {
    return await client.getAlertText();
  }
};
