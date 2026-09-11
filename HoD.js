/////////////////////////////////////////////////////
//
//    Felhasználói oldalon szöveg részek elrejtése
//
/////////////////////////////////////////////////////

// Megkeressük a DIV-et
var divStats = document.getElementById("divStats");

// Gomb létrehozása
var btn = document.createElement("button");
btn.style.height = "22px";
btn.style.width = "100%";
btn.id = "HoD_button";
btn.onclick = HoD; // Gombnyomásra lefut a HoD függvény
btn.innerHTML = (divStats.style.display == "none")?"Kinyit":"Becsuk";

// Gomb beszúrása a script elé
if (document.currentScript) {
    document.currentScript.parentNode.insertBefore(btn, document.currentScript);
}

// Felhasználói oldalon elhelyezett DIV elem elrejtése, vagy megmutatása
function HoD() {
	btn.innerHTML = (divStats.style.display == "none")?"Becsuk":"Kinyit";
	divStats.style.display = (divStats.style.display == "none")?"":"none";
}
