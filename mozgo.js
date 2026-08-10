//myUserId = geocaching.hu felhasználói azonosító

var tableMozgo = '<table width="100%" id="mozgo" style="white-space: pre;"><tr><th colspan="5">Mozgó ládák</th></tr><tr><th width="66px">Azonosító</th><th>Név</th><th width="75px">Mikor?</th><th width="100px">Honnan?</th><th width="100px">Hová?</th></tr><tr id="rowsMozgo"></tr></table>'
document.write(tableMozgo);

getMozgoList();

async function getMozgoList() {
    try {
        //megtalált mozgók listájának lekérése
        const response1 = await fetch("https://api.geocaching.hu/xstat?userid="+myUserId);
		if (!response1.ok) throw new Error("API 1.hívás sikertelen");
        const jsn1 = await response1.json();

		//megtalálások lekérése: láda azonosító, dátum, bejegyzés és a log típusa
		//egybe - hogy ne terheljük le a szervert a sok hívással
        const response2 = await fetch("https://api.geocaching.hu/logsbyuser?fields=cache_id%2Cdate%2Cnotes%2Clogtype&dir=asc&userid="+myUserId);
		if (!response2.ok) throw new Error("API 2.hívás sikertelen");
        const jsn2 = await response2.json();

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
var finds = [];
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

	let finds = logs.flatMap(kiíró);
	    
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
/*bejegyzésből kiszedni honnan/hová ment a láda
* @param log [object] - adott ládára leszűrt log bejegyzés
*/
function kiíró(log) {
	text = log.notes;	
    // A regex: megkeresi a ___ közötti részeket
    const regex = /___(.*?)___/g;

    // Az összes találat kinyerése
    //const matches = [...text.matchAll(regex)];
	const match = text.match(regex);

    /*matches.forEach(match => {
      const content = match[1];
      const parts = content.split('_');
	  const dátum = log.date.split(' ')[0].replace(/-/g, '.'); // dátum formátum: yyyy.mm.dd

      if (parts.length === 2) {
        //console.log("Típus: Útvonal | Honnan: "+parts[0]+", Hova: "+parts[1]);
		return [ dátum, parts[0], parts[1] ];
      } else {
        //console.log("Típus: Helyszín | Hol: "+parts[0]);
		finds.push( [ dátum, parts[0] ] );
      }
    });*/

	/*return matches.map(match => {
		const content = match[1];
		const parts = content.split('_');
		const dátum = log.date.split(' ')[0].replace(/-/g, '.'); // dátum formátum: yyyy.mm.dd

		if (parts.length === 2) {
			// console.log("Típus: Útvonal | Honnan: "+parts[0]+", Hova: "+parts[1]);
			return [dátum, parts[0], parts[1]];
		} else {
			//console.log("Típus: Helyszín | Hol: "+parts[0]);
			return [dátum, parts[0]];
		}
	});*/
	// ha üres lenne a notes -> ékelünk és szakítunk
	if (!match) return null;
	
	const content = match[1]; // A zárójelek közötti rész
	const parts = content.split('_');
	const dátum = log.date.split(' ')[0].replace(/-/g, '.'); // dátum formátum: yyyy.mm.dd

	if (parts.length === 2) {
		// console.log("Típus: Útvonal | Honnan: "+parts[0]+", Hova: "+parts[1]);
		return [dátum, parts[0], parts[1]];
	} else {
		//console.log("Típus: Helyszín | Hol: "+parts[0]);
		return [dátum, parts[0]];
	}
}
