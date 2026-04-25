//myUserId = geocaching.hu felhasználói azonosító

document.write('<object id="megyeterkep" data="megye.svg" type="image/svg+xml">Sajnos a böngésződ nem támogatja az SVG-t.</object>');
 
let zöld = ["Győr-Moson-Sopron", "Fejér", "Heves", "Csongrád-Csanád"];
let sárga = ["Veszprém", "Baranya", "Pest", "Békés", "Borsod-Abaúj-Zemplén"];
let narancs = ["Zala", "Tolna", "Komárom-Esztergom", "", "Jász-Nagykun-Szolnok", "Szabolcs-Szatmár-Bereg"];
let kék = ["Vas", "Somogy", "Budapest", "Nógrád", "Hajdú-Bihar"];

var megyeStat = [];

let pacman = true;
let color = false;
               
megyeStatLekérése();

async function megyeStatLekérése() {
	try {
		//megyei statisztika lekérése
    	const response = await fetch("https://api.geocaching.hu/mstat?userid="+myUserId);
	    const jsn = await response.json();
	
		for (const elem of jsn) {
			await jsonMolyolo(elem);
	  	}
		
		switch(getParam) {
	  		case "noWtr": 
	  			rejt(svgBelseje, "folyók");
	  			break;
	  		case "none": 
	  			rejt(svgBelseje, "folyók");
	  		case "noRd": 
	  			rejt(svgBelseje, "úthálózat");
	  			break;
		}
		svgManipulator();
	} catch (hiba) {
		console.error("Hiba a lekérésnél:", hiba);
	}
}

function jsonMolyolo(elem) {
	console.log(elem.terulet +": "+ elem.F);
  // megtalált/összes*100%
  megyeStat.push([elem.terulet, elem.F/elem.S*100]);
}

function rejt(svgBelseje, what) {
	svgBelseje.getElementById(what).style.display = "none";
}

function svgManipulator() {
	const svgObjektum = document.getElementById('megyeterkep');
	const svgBelseje = svgObjektum.contentDocument;
	
	for (const régió of megyeStat) {
		let megye = régió[0];
		let percent = parseFloat(régió[1]);

		if(percent < 0.1) { continue; } 
		
		let pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
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
		
		if(pacman) {
			let start = "M 100 100 L 100 200 A 100 100, 0, ";
			let end = " Z";
			let rad = percent * 3.6 * (Math.PI / 180);
			let x = Math.sin(rad)*100 + 100;
			let y = Math.cos(rad)*100 + 100;

			let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
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
		} else if(color) {
			cr = [15,  0,  0, 15];
			cg = [15, 15,  0,  8];
			cb = [ 0,  0, 15,  0];
			
			red = Math.ceil(cr[c] * (100 - percent) / 100);
			grn = Math.ceil(cg[c] * (100 - percent) / 100);
			blu = Math.ceil(cb[c] * (100 - percent) / 100);
			
			console.log("#" + red.toString(16) +""+ grn.toString(16) +""+ blu.toString(16));
		
			let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			circle.id = megye + "_circle";
			circle.setAttribute("cx", 100);
			circle.setAttribute("cy", 100);
			circle.setAttribute("r", 100);
			circle.setAttribute("fill", "#" + red.toString(16) +""+ grn.toString(16) +""+ blu.toString(16));
			circle.setAttribute("stroke", "black");
			circle.setAttribute("strokeWidth", 0);
			circle.setAttribute("transform", "translate(-50 -50)");
		
			pattern.appendChild(circle);
		}
		
		svgBelseje.getElementById("defs").appendChild(pattern);
	}
}
