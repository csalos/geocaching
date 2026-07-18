
document.write("<button style='height: 100%; width: 100%' onclick='HoD(this)'>Kinyit</button>");

var sh= false;
function HoD(btn) {
	if(sh) {
		divStat.style.display = "none";
		btn.innerHTML = "Kinyit";
		sh = false;
    } else {
		divStat.style.display = "";
		btn.innerHTML = "Összecsuk";
		sh = true;
    }
}
