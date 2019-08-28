function doClick(e) {
	if($.TextField1.value == "123.456.789-01" && $.TextField2.value == "123456" ) {
		alert("Sucesso");
	} else {
		alert("Falhou");
	}
}
$.index.open();

function doEsqueci(e){
	if($.TextField1.value)
		alert("Sua nova senha foi enviada para o seu email.");
	else
		alert("Preencha o cpf primeiro.");
}
