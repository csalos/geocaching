
document.write("<button style='height: 100%; width: 100%' onclick='HoD()' id='HoD_button'></button>");

// Az adott névvel ellátott DIV elemet lehet macerálni
var divStats = document.getElementById("divStats");
var btn = document.getElementById("HoD_button");

/*
/* Gomb felirat inicializálása  
*/
window.onload = init();
function init() {
	btn.innerHTML = "Statisztika "+ ((divStats.style.display == "none")?"kinyitása":"összecsukása");
}
/*
/* Felhasználói oldalon elhelyezett DIV elem elrejtése, vagy megmutatása
*/
function HoD() {
	btn.innerHTML = "Statisztika "+ ((divStats.style.display == "none")?"összecsukása":"kinyitása");
	divStats.style.display = (divStats.style.display == "none")?"":"none";
}
