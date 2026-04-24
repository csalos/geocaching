//myUserId = geocaching.hu felhasználói azonosító

var table = '<table width="100%" id="mozgo" style="white-space: pre;"><tr><th colspan="5">Mozgó ládák</th></tr><tr><th width="66px">Azonosító</th><th>Név</th><th width="75px">Mikor?</th><th width="100px">Honnan?</th><th width="100px">Hová?</th></tr><tr id="rowsMozgo"></tr></table>'
document.write(table);

//megtalált mozgó listájának lekérése
var xhrm = new XMLHttpRequest();
xhrm.open("GET", "https://api.geocaching.hu/xstat?userid="+myUserId, true);
xhrm.onreadystatechange = async function() {
	if(xhrm.readyState === 4 && xhrm.status === 200) {
    	let jános = JSON.parse(xhrm.responseText);
        //jános.forEach(jsonMozgoMolyolo);
		//megvár hogy feldolgozza a találatokat
		for(const láda of jános) {
            await jsonMozgoMolyolo(láda);
        }
		//táblázat kiszínezése
		const rows = document.querySelectorAll('#mozgo tr:nth-child(odd), #event tr:nth-child(odd)');
		
		rows.forEach((row, index) => {
		    row.style.backgroundColor = '#f8f8cf'; // Páratlan sorok színe
		});
    }
}
xhrm.send();

//megtalált mozgók listájának átmolyolása
var finds = [];
async function jsonMozgoMolyolo(láda) {
    try {
        //megtalálások lekérése: dátum és bejegyzés
        const response = await fetch("https://api.geocaching.hu/logfinder?userid="+myUserId+"&fields=date%2Cnotes&cacheid="+láda.id);
        const jsn = await response.json();

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

	    finds = [];
        jsn.forEach(kiíró);
	    
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
    } catch (hiba) {
        console.error("Hiba a lekérésnél:", hiba);
	}
}
//bejegyzésből kiszedni honnan/hová ment a láda
function kiíró(log) {
	text = log.notes;	
    // A regex: megkeresi a ___ közötti részeket
    const regex = /___(.*?)___/g;

    // Az összes találat kinyerése
    const matches = [...text.matchAll(regex)];

    matches.forEach(match => {
      const content = match[1];
      const parts = content.split('_');
	  const dátum = log.date.split(' ')[0].replace(/-/g, '.'); // dátum formátum: yyyy.mm.dd

      if (parts.length === 2) {
        console.log("Típus: Útvonal | Honnan: "+parts[0]+", Hova: "+parts[1]);
		finds.push( [ dátum, parts[0], parts[1] ] );
      } else {
        console.log("Típus: Helyszín | Hol: "+parts[0]);
		finds.push( [ dátum, parts[0] ] );
      }
    });
}
