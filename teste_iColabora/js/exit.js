window.onbeforeunload = confirmExit;
function confirmExit() {
	if (document.getElementById("form-task").value != "") {
		return "Deseja realmente sair desta página?";
	}
}