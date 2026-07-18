
document.write("<button style='height: 100%; width: 100%' onclick='HoD(this)'>Kinyit</button>");

var sh= false;
var divStats = document.getElementById("divStats");
function HoD(btn) {
	if(sh) {
		divStats.style.display = "none";
		btn.innerHTML = "Statisztika kinyitása";
		sh = false;
    } else {
		divStats.style.display = "";
		btn.innerHTML = "Statisztika összecsukása";
		sh = true;
    }
}
