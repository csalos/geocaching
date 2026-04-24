//megtalált mozgó listájának lekérése
var xhrm = new XMLHttpRequest();
xhrm.open("GET", "https://api.geocaching.hu/xstat?userid=71532", true);
xhrm.onreadystatechange = function() {
	if(xhrm.readyState === 4 && xhrm.status === 200) {
    	let jános = JSON.parse(xhrm.responseText);
        jános.forEach(jsonMozgoMolyolo);
    }
}
xhrm.send();

//megtalált mozgók listájának átmolyolása
async function jsonMozgoMolyolo(láda) {
    try {
        //megtalálások lekérése: dátum és bejegyzés
        const response = await fetch(`https://api.geocaching.hu/logfinder?userid=71532&fields=date%2Cnotes&cacheid=`+láda.id);
        const jsn = await response.json();

		//új sor a táblázatban
		let tr = document.createElement("tr"); 
	    tr.style = "";
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

	    var finds = [];
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
	    document.getElementById("rowsMozgo").after(tr); 
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

      if (parts.length === 2) {
        console.log("Típus: Útvonal | Honnan: "+parts[0]+", Hova: "+parts[1]);
		finds.push( [ log.date, parts[0], parts[1] ] );
      } else {
        console.log("Típus: Helyszín | Hol: "+parts[0]);
		finds.push( [ log.date, parts[0] ] );
      }
    });
}
//------------------------------------------------
//------------------------------------------------
let arrMozgo = [ 
    [ 3825,   "FV", "Forrásvadász", [ ["2026.02.24", "Tókaji forrás", "Húsvét forrás"] ] ], 
    [ 1960, "KaKu", "Kálváriakutató", [ ["2026.01.27", "Kaposvár"] ] ], 
    [  212, "M001", "mobil_001", [
         ["2025.12.23", "Fonyód", "#GeoKari"],
         ["2026.04.19", "Badacsony", "#Walk44"] ] ], 
    [ 1248, "M002", "Kedvelt helyeink", [
         ["2025.12.06", "Orfű", "#Walk41"],
         ["2026.02.15", "Ságvár", "#Walk43"],
         ["2026.04.19", "Badacsony", "#Walk44"] ] ], 
    [ 4480, "CRUX", "Crux Viator, Útszéli kereszt", [ 
         ["2025.10.30", "Kisgyalán", "Szenna"],
         ["2025.12.06", "Orfű", "#Walk41"], 
         ["2025.12.31", "Somogyvár", "#GeoSzilveszter"],
         ["2026.02.15", "Ságvár", "#Walk43"],
         ["2026.04.19", "Badacsony", "#Walk44"] ] ],
    [ 4482,  "KAS", "Kastélykutató", [
         ["2024.07.18", "Várda"],
         ["2026.04.19", "Badacsony", "#Walk44"] ] ], 
    [ 6235, "TJEL", "Turistajelzések", [ ["2024.04.06", "Tókaji parkerdő", "Töröcskei tó"] ] ], 
    [ 5543, "EHAZ", "Erdei házak, kunyhók", [
         ["2023.08.12", "Várda"], 
         ["2026.02.15", "Ságvár", "#Walk43"] ] ], 
    [ 5081, "Time", "Napóra", [
         ["2023.05.20", "Kaposvár", "Hencse"], 
         ["2023.10.29", "Kaposvár"], 
         ["2025.12.06", "Orfű", "#Walk41"] ] ], 
    [ 1779,  "AKT", "Árpád-kori templomromok, templomok 4.0", [ ["2021.12.03", "Kaposszentjakab"] ] ],  
    [ 1458,   "PC", "Gécépécé (a HiTech mozgó)", [ ["2019.12.30", "Kaposvár", "Tura"] ] ], 
    [ 1784,   "TO", "Tóbarát", [
         ["2019.12.30", "Kaposvár", "Tura"],
         ["2026.04.19", "Badacsony", "#Walk44"] ] ], 
    [ 4773, "HIRE", "Híres emberek", [
         ["2019.08.17", "Kaposvár", "Kaposvár"],
         ["2026.04.19", "Badacsony", "#Walk44"] ] ], 
    [ 1012, "User", "User Hona", [
         ["2014.08.24", "Kaposvár", "Haza"], 
         ["2021.04.27", "Kaposvár", "Hetes"] ] ], 
    [ 3959, "FENT", "Fentről a világ (fotózz panorámát)", [
         ["2014.07.03", "Kaposvár"], 
         ["2026.02.15", "Ságvár", "#Walk43"],
         ["2026.04.19", "Badacsony", "#Walk44"] ] ], 
    [ 3889, "MKAT", "Magyarország katonái", [
         ["2014.05.27", "Kaposvár"], 
         ["2023.08.01", "Gölle"] ] ], 
    [  968, "Izgi", "Izgimozgi", [
         ["2014.04.20", "Kaposvár", "Kaposvár"], 
         ["2025.12.06", "Orfű", "#Walk41"],
         ["2026.04.19", "Badacsony", "#Walk44"] ] ], 
    [ 3806,  "KEM", "Kerékpáros mozgó", [ ["2014.04.19", "Kaposvár"] ] ], 
    [ 4856, "DDK2", "Rockenbauer Pál Dél-dunántúli Kéktúra", [ ["2014.04.10", "Szenna", "Szenna tető"] ] ], 
    [ 4456,  "MLM", "A malomnak nincsen köve", [ [ "2014.01.02", "Kaposvár"] ] ], 
    [ 1409, "SPIR", "Szellemjáró Geoláda", [
         ["2013.08.21", "Taszár", "Somogysárd"],
         ["2026.02.15", "Ságvár", "#Walk43"] ] ] 
];

let arrEvent = [ 
    [ 6755, "GN26", "Geo Nyuszi '26", "2026.04.03", "Kaposvár - Deseda"], 
    [ 0, [[6730,"MO02"], [6710,"MO15"], [6733,"MO17"], [6719,"MO01"], [6692,"MO10"], [6746,"MO11"]], "Megyei Óriások", "2026.03.21\n2026.03.21\n2026.04.10\n2026.04.10\n2026.04.10\n2026.04.10","Sasréti ősbükkös\nGyöngyöspusztai védett tölgyfasor\nKasztói őstölgyes\nIzsáki Csodafa\nKiskörei \"300\" éves tölgy\nA Nagykunság legidősebb tölgyfája"], 
    [ 6695, "2025", "Geoszilveszter 2025", "2025.12.31", "Somogyvár"], 
    [ 6694, "XM25", "Geokarácsony 2025", "2025.12.23", "Fonyód"], 
    [ 6682, "GM25", "Geo Miki '25", "2025.12.06", "Dombóvár"], 
    [ 4526, "Walk", "Gyalogtúra", "2025.03.02\n2025.12.06\n2026.02.15\n2026.04.19", "35.túra - Zselic\n41.túra - Orfű\n43.túra - Ságvár\n44.túra - Badacsony"], 
    [ 6604, "GN25", "Geo Nyuszi '25", "2025.04.20", "Kaposvár"], 
    [ 6562, "GM24", "Geo Miki '24", "2024.12.07", "Kaposvár"], 
    [ 6141, "KozM", "Közlekedési Múzeum az Északiban", "2024.10.11", "Budapest"],  
    [ 6334, "XM22", "Geokarácsony 2022", "2023.01.02", "Kaposvár"], 
    [ 5998, "MVK1", "Magyar Vöröskereszt - Jean-Henri Dunant szobra", "2021.10.12", "Budapest"], 
    [ 0, [[6047,"XX17"], [6031,"XX01"],[6044,"XX14"],[6035,"XX05"],[5239,"20ZS"]], "20 éves a geocaching.hu", "2021.07.23\n2021.08.16\n2021.10.09\n2025.09.30\n2025.10.23","Gunarasi parkerdő\nÉrsekcsanád\nÉrd - Papi földek\nSashalmi-erdő\nZselic"], 
    [ 5775, 2019, "Geoszilveszter 2019", "2019.12.30", "Kaposvár"], 
    [ 660, "WWed", "White Wedding - 42.esküvő", "2016.08.27", "Kaposvár"]
];

//------------------------------------------------
//------------------------------------------------
arrEvent.forEach((element) => addEvent(element));

function addEvent(arr) { 
    let tr = document.createElement("tr"); 
    tr.style = ""; 
    let td = document.createElement("td"); 
    if(arr[0]!==0) { 
        let a = document.createElement('a'); 
        a.href = 'https://geocaching.hu/caches.geo?id='+arr[0]; 
        a.appendChild(document.createTextNode("GC"+arr[1])); 
        td.appendChild(a); 
    } else { 
        let link = arr[1]; 
        for(let x=0; x<link.length; x++) { 
            let b = document.createElement('a'); 
            b.href = 'https://geocaching.hu/caches.geo?id='+link[x][0]; 
            b.appendChild(document.createTextNode("GC"+link[x][1])); 
            td.appendChild(b); 
            td.appendChild(document.createElement('br')); 
        } 
    } 
    tr.appendChild(td); 
    for(let i=2; i<5; i++) { 
        let td = document.createElement("td"); 
        let tx = document.createTextNode(arr[i]); 
        td.appendChild(tx); 
        tr.appendChild(td); 
    }
    document.getElementById("rowsEvent").after(tr);
}

const rows = document.querySelectorAll('#mozgo tr:nth-child(odd), #event tr:nth-child(odd)');

rows.forEach((row, index) => {
    row.style.backgroundColor = '#f8f8cf'; // Páratlan sorok színe
});
