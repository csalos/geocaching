//myUserId = geocaching.hu felhasználói azonosító

(function() {

let zöld = ["Zala", "Fejér", "Csongrád-Csanád", "Borsod-Abaúj-Zemplén"];
let sárga = ["Vas", "Somogy", "Komárom-Esztergom", "Budapest", "Bács-Kiskun", "Heves", "Hajdú-Bihar"];
let narancs = ["Győr-Moson-Sopron", "Baranya", "Nógrád", "Jász-Nagykun-Szolnok", "Szabolcs-Szatmár-Bereg"];
let kék = ["Veszprém", "Tolna", "Pest", "Békés"];

var megyeStat = [];

// 1. Megkeressük a jelenleg futó script elemet és a paramétereket
const script = document.currentScript;
const urlGet = new URL(script.src).searchParams;

const myUserId = urlGet.get("myUserId") || "0";
const getWater = urlGet.get("getWater") || "1";
const getRoads = urlGet.get("getRoads") || "1";
const getRails = urlGet.get("getRails") || "0";
const getStyle = urlGet.get("getStyle") || "pacman";

// 2. Létrehozzuk az új DIV elemet
const terkep = document.createElement('div');
terkep.id = 'megyeterkep';
terkep.width = '100%';
terkep.height = '474px';
terkep.innerHTML = 'Sajnos a böngésződ nem támogatja az SVG-t.';

// 3. Beszúrjuk a DIV-et a script tag elé
if (script && script.parentNode) {
    script.parentNode.insertBefore(terkep, script);
}
	
megyeStatLekérése();
async function megyeStatLekérése() {
	try {
		//megyei statisztika lekérése
    	const {getRecord} = await import('https://csalos.github.io/geocaching/apiCall.js');

		const jsn = await getRecord("megye", myUserId);

		megyeStat = jsn.map(elem => [elem.terulet, elem.F / elem.S * 100]);
		
    	const svgObjektum = await fetch("https://csalos.github.io/geocaching/megye.svg")
    		.then(response => response.text())
    		.then(svgText => {
		
		        // Beillesztés egy konténerbe
		        terkep.innerHTML = svgText;

		        // Már elérhető az SVG
		        const svgBelseje = document.querySelector("#megyeterkep svg");
				svgManipulator(svgBelseje);
		    });
	} catch (hiba) {
		console.error("Hiba a lekérésnél:", hiba);
	}
}

function rejt(svgBelseje, what) {
	svgBelseje.getElementById(what).style.display = "none";
}
function mutat(svgBelseje, what) {
	svgBelseje.getElementById(what).style.display = "";
}

function svgManipulator(svgBelseje) {

	if(getWater == "0")	rejt(svgBelseje, "folyók");
	if(getRoads == "0")	rejt(svgBelseje, "úthálózat");
	
	switch(getStyle) {
		case "color":
	  		mutat(svgBelseje, "százalék");
	  		break;
	}
	
	for (const régió of megyeStat) {
		let megye = régió[0];
		let percent = parseFloat(régió[1]);

		if(percent < 0.1) { continue; } 

		const megyeBox = svgBelseje.getElementById(megye).getBBox();
		const offsetX = megyeBox.x - 200 + (megyeBox.width / 2);
		const offsetY = megyeBox.y - 200 + (megyeBox.height / 2);

		console.log(megye);
		console.log(megyeBox);
		
		let c = 0;
		switch (true) {
			case narancs.includes(megye): c++;
			case kék.includes(megye): c++;
			case zöld.includes(megye): c++;
			case sárga.includes(megye): break;
		}

		var pattern;
		
		if(getStyle == "pacman") {
			let start = "M 100 100 L 100 200 A 100 100, 0, ";
			let end = " Z";
			let rad = percent * 3.6 * (Math.PI / 180);
			let x = Math.sin(rad)*100 + 100;
			let y = Math.cos(rad)*100 + 100;

			pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
			pattern.id= megye + "_pattern";
			pattern.setAttribute("viewBox", "0,0,200,200");
			pattern.setAttribute("width", "200%");
			pattern.setAttribute("height", "200%");

			let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			path.id = megye + "_path";
			path.setAttribute("d", start + ((percent>50)?"1":"0") + ", 0, " + x + " " + y + end);
			path.setAttribute("style", "fill: url(#RG"+c+")");
			path.setAttribute("stroke", "black");
			path.setAttribute("strokeWidth", 0);
			path.setAttribute("transform", "translate(-50 -50)");

			if(percent > 99.9) { 
				path.setAttribute("d", "M 100 200 A 100 100, 0, 0, 0, 100 0 A 100 100, 0, 0, 0, 100 200 Z");
			}
			pattern.appendChild(path);
		} else if(getStyle == "color") {
		
			pattern = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
			pattern.id = megye + "_pattern";
			pattern.setAttribute("xlink:href", "#RG"+c);
			pattern.setAttribute("cx", offsetX);
			pattern.setAttribute("cy", offsetY);
			pattern.setAttribute('fx', offsetX);
			pattern.setAttribute('fy', offsetY);
			pattern.setAttribute("r", 2000);
			pattern.setAttribute("gradientTransform", "matrix(1,0,0,1.0483257,0,-615.11595)");
			pattern.setAttribute("gradientUnits", "userSpaceOnUse");
		}
		
		svgBelseje.getElementById("defs").appendChild(pattern);
	}
}

})();
