function doClick(e) {
	if($.TextField1.value == "123.456.789-01" && $.TextField2.value == "123456" ) {
		alerta("Sucesso");
	} else {
		alerta("Falhou");
	}
}
$.index.open();

function doEsqueci(e){
	if($.TextField1.value)
		alerta("Sua nova senha foi enviada para o seu email.");
	else
		alerta("Preencha o cpf primeiro.");
}

function alerta(mensagem) {
	var dialog = Ti.UI.createAlertDialog({
    message: mensagem,
    ok: 'ok',
		title: "Alerta"
  });
  dialog.show();
}
