//myUserId = geocaching.hu felhasználói azonosító
import {xstat,  logsbyuser} from 'https://csalos.github.io/geocaching/apiCall.js';

var tableMozgo = '<table width="100%" id="mozgo" style="white-space: pre;"><tr><th colspan="5">Mozgó ládák</th></tr><tr><th width="66px">Azonosító</th><th>Név</th><th width="75px">Mikor?</th><th width="100px">Honnan?</th><th width="100px">Hová?</th></tr><tr id="rowsMozgo"></tr></table>'
document.write(tableMozgo);

getMozgoList();

function getMozgoList() {
    try {
        //megtalált mozgók listájának lekérése
        const jsn1 = await xstat(myUserId);

		//megtalálások lekérése: láda azonosító, dátum, bejegyzés és a log típusa
		//egybe - hogy ne terheljük le a szervert a sok hívással
        const jsn2 = await logsbyuser(myUserId);

		for(const láda of jsn1) {
			// megtalálásokból leszűrjük az adott mozgóhoz tartozókat, ha a bejegyzés típusa "1" - azaz "megtalált" 
			const talalatok = jsn2.filter(elem => elem.cache_id === láda.id && elem.logtype==="1");
			//majd ez végig molyoljuk
            jsonMozgoMolyolo(láda, talalatok);
        }
		//táblázat kiszínezése
		const rows = document.querySelectorAll('#mozgo tr:nth-child(odd), #event tr:nth-child(odd)');
		
		rows.forEach((row, index) => {
		    row.style.backgroundColor = '#f8f8cf'; // Páratlan sorok színe
		});
	} catch (hiba) {
        console.error("Hiba a lekérésnél:", hiba);
	}
}
/*megtalált mozgók listájának átmolyolása
* @param láda [object] - adott mozgóhoz tartozó adatok (név, azonosító)
* @param logs [array of object] - adott ládára leszűrt log bejegyzések
*/
function jsonMozgoMolyolo(láda, logs) {
	//új sor a táblázatban
	let tr = document.createElement("tr"); 
	//láda azonosító és link
	let tdLink = document.createElement("td"); 
	let a = document.createElement('a'); 
	a.href = 'https://geocaching.hu/caches.geo?id='+láda.id; 
	a.appendChild(document.createTextNode(láda.waypoint)); 
	tdLink.appendChild(a); 
	tr.appendChild(tdLink);
	
	//láda neve
	let tdName = document.createElement("td"); 
	let txName = document.createTextNode(láda.nickname); 
	tdName.appendChild(txName); 
	tr.appendChild(tdName);

	let finds = logs.map(kiíró);

	//mikor, honnan, hová
	let f = ["", "", ""];
	for(let i=0; i<finds.length; i++) {
		f[0] = f[0].concat(finds[i][0], (finds.length>1)?"\n":"");
		f[1] = f[1].concat(finds[i][1], (finds.length>1)?"\n":"");
		f[2] = f[2].concat(finds[i][2]??"Maradt", (finds.length>1)?"\n":"");
	}
	for(let j=0; j<3; j++) { 
		let td = document.createElement("td"); 
		let tx = document.createTextNode(f[j]); 
		td.appendChild(tx); 
		tr.appendChild(td); 
	} 
	document.getElementById("rowsMozgo").before(tr); 
}
/*bejegyzésből kiszedi honnan/hová ment a láda
* @param log [object] - adott ládára leszűrt log bejegyzés
* ___Honnan_Hova___ (ekkor tovább lett víve)
* ___Hol___ (ekkor maradt a mozgó a helyén)
*/
function kiíró(log) {
	text = log.notes;	
    // A regex: megkeresi a ___ közötti részeket
    const regex = /___(.*?)___/;

    // Az első találat kinyerése
	// ...csak az elsőre vagyunk kíváncsiak
	// hiába volt vki buzgó-mócsing és írt többet 
    const match = text.match(regex);
	
	const dátum = log.date.split(' ')[0].replace(/-/g, '.'); // dátum formátum: yyyy.mm.dd
	
	// ha üres lenne a notes
	// vagy nincs benne a "hely" marker
	//		-> ékelünk és szakítunk
	if (match === null) return [dátum, "", ""];

	const content = match[1];
	const parts = content.split('_');

	if (parts.length === 2) {
		//console.log("Típus: Útvonal | Honnan: "+parts[0]+", Hova: "+parts[1]);
		return [dátum, parts[0], parts[1]];
	} else {
		//console.log("Típus: Helyszín | Hol: "+parts[0]);
		return [dátum, parts[0]];
	}
}
