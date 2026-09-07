
document.write("<button style='height: 100%; width: 100%' onclick='HoD(this)'>Statisztika kinyitása</button>");

// Az adott névvel ellátott DIV elemet lehet macerálni
var divStats = document.getElementById("divStats");
/*
/* Felhasználói oldalon elhelyezett DIV elem elrejtése, vagy megmutatása
* @param btn [button] - a kinyitó és becsokú gomb  
*/
function HoD(btn) {
	if(divStats.style.display == "none") {
		divStats.style.display = "";
		btn.innerHTML = "Statisztika összecsukása";
    } else {
		divStats.style.display = "none";
		btn.innerHTML = "Statisztika kinyitása";
    }
}
