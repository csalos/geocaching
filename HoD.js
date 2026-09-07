/////////////////////////////////////////////////////
//
//    Felhasználói oldalon szöveg részek elrejtése
//
/////////////////////////////////////////////////////

// Megkeressük a DIV-et
var divStats = document.getElementById("divStats");

// Gomb létrehozása
var btn = document.createElement("button");
btn.style.height = "100%";
btn.style.width = "100%";
btn.id = "HoD_button";
btn.onclick = HoD; // Gombnyomásra lefut a HoD függvény
btn.innerHTML = "Statisztika "+ ((divStats.style.display == "none")?"kinyitása":"összecsukása");

// Beszúrás a script elé
if (document.currentScript) {
    document.currentScript.parentNode.insertBefore(btn, document.currentScript);
}

// Felhasználói oldalon elhelyezett DIV elem elrejtése, vagy megmutatása
function HoD() {
	btn.innerHTML = "Statisztika "+ ((divStats.style.display == "none")?"összecsukása":"kinyitása");
	divStats.style.display = (divStats.style.display == "none")?"":"none";
}
