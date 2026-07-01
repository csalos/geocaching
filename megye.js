//myUserId = geocaching.hu felhasználói azonosító

document.write('<object id="megyeterkep" type="image/svg+xml" width="100%" height="474px">Sajnos a böngésződ nem támogatja az SVG-t.</object>');
 

let zöld = ["Zala", "Fejér", "Csongrád-Csanád", "Borsod-Abaúj-Zemplén"];
let sárga = ["Vas", "Somogy", "Komárom-Esztergom", "Budapest", "Bács-Kiskun", "Heves", "Hajdú-Bihar"];
let narancs = ["Győr-Moson-Sopron", "Baranya", "Nógrád", "Jász-Nagykun-Szolnok", "Szabolcs-Szatmár-Bereg"];
let kék = ["Veszprém", "Tolna", "Pest", "Békés"];

var megyeStat = [];

if (typeof getPart == "undefined") {
    var getPart = "";
}
if (typeof getStyle == "undefined") {
    var getStyle = "pacman";
}

window.addEventListener('load', function() {
	megyeStatLekérése();
});

async function megyeStatLekérése() {
	try {
		//megyei statisztika lekérése
    	const response = await fetch("https://api.geocaching.hu/mstat?userid="+myUserId);
    	const svgObjektum = await fetch("https://csalos.github.io/geocaching/megye.svg")
    		.then(response => response.text())
    		.then(svgText => {
		
		        // Beillesztés egy konténerbe
		        document.getElementById("megyeterkep").innerHTML = svgText;
		
		        // Már elérhető az SVG
		        const svgBelseje = document.querySelector("#megyeterkep svg");
		
		        console.log(svgObjektum);
				console.log(svgBelseje);
		    });
		
	    const jsn = await response.json();
	
		for (const elem of jsn) {
			console.log(elem.terulet +": "+ elem.F);
			// megtalált/összes*100%
			megyeStat.push([elem.terulet, elem.F/elem.S*100]);
	  	}
		svgManipulator(svgObjektum);
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

	switch(getPart) {
	  	case "Rd": 
	  		rejt(svgBelseje, "folyók");
	  		break;
	  	case "none": 
	  		rejt(svgBelseje, "folyók");
	  	case "Wtr": 
	  		rejt(svgBelseje, "úthálózat");
	  		break;
	}
	switch(getStyle) {
		case "color":
	  		//mutat(svgBelseje, "százalék");
	  		break;
	}
	
	for (const régió of megyeStat) {
		let megye = régió[0];
		let percent = parseFloat(régió[1]);

		if(percent < 0.1) { continue; } 
		
		let pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		pattern.id= megye + "_pattern";
		pattern.setAttribute("viewBox", "0,0,200,200");
		pattern.setAttribute("width", "200%");
		pattern.setAttribute("height", "200%");
		
		let c = 0;
		switch (true) {
			case narancs.includes(megye): c++;
			case kék.includes(megye): c++;
			case zöld.includes(megye): c++;
			case sárga.includes(megye): break;
		}
		
		if(getStyle == "pacman") {
			let start = "M 100 100 L 100 200 A 100 100, 0, ";
			let end = " Z";
			let rad = percent * 3.6 * (Math.PI / 180);
			let x = Math.sin(rad)*100 + 100;
			let y = Math.cos(rad)*100 + 100;

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
			cr = [ 0, 15, 15,  0];
			cg = [ 0,  0, 15,  8];
			cb = [15, 15,  0, 15];
			
			red = 15 - Math.ceil(cr[c] * percent / 100);
			grn = 15 - Math.ceil(cg[c] * percent / 100);
			blu = 15 - Math.ceil(cb[c] * percent / 100);
		
			let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			circle.id = megye + "_circle";
			circle.setAttribute("cx", 100);
			circle.setAttribute("cy", 100);
			circle.setAttribute("r", 110);
			circle.setAttribute("fill", "#" + red.toString(16) +""+ grn.toString(16) +""+ blu.toString(16));
			circle.setAttribute("stroke", "black");
			circle.setAttribute("strokeWidth", 0);
			circle.setAttribute("transform", "translate(-50 -50)");
		
			pattern.appendChild(circle);
		}
		
		svgBelseje.getElementById("defs").appendChild(pattern);
	}
}
