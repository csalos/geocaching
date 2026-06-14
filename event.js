var tableEvent = '<table width="100%" id="event" style="white-space: pre;"><tr><th colspan="4">Esemény ládák</th></tr><tr><td colspan="4"><button style="height: 100%; width: 100%" onclick="HoDEvent(this)">Kinyit</button></td></tr><tbody id="tbEvent" style="display: none"><tr><th width="66px">Azonosító</th><th>Név</th><th width="75px">Mikor?</th><th width="100px">Hol?</th></tr><tr id="rowsEvent"></tr></tbody></table>';
document.write(tableEvent);

var tbEvent = document.getElementById("tbEvent");

var shE = false;
function HoDEvent(btn) {
	if(shE) {
		tbEvent.style.display = "none";
		btn.innerHTML = "Kinyit";
		shE = false;
    } else {
		tbEvent.style.display = "";
		btn.innerHTML = "Összecsuk";
		shE = true;
    }
}

let arrEvent = [ 
    [ 6767, "50FV", "L. Geocaching Fesztivál és Verseny", "2026.05.16", "Sasrét"], 
    [ 0, [[6709, "25ZS"], [6712, "25TL"], [6722, "25UV"]], "Jubileumi körtúra", "2026.05.01\n2026.06.13\n2026.06.13", "Zselic + Kapos völgye\nSzekszárdi dombság\nÜvegesek útja - Mecsek"],
    [ 6755, "GN26", "Geo Nyuszi '26", "2026.04.03", "Kaposvár - Deseda"], 
    [ 0, [[6730,"MO02"], [6710,"MO15"], [6733,"MO17"], [6719,"MO01"], [6692,"MO10"], [6746,"MO11"], [6689,"MO23"]], "Megyei Óriások", "2026.03.21\n2026.03.21\n2026.04.10\n2026.04.10\n2026.04.10\n2026.04.10\n2026.06.13","Sasréti ősbükkös\nGyöngyöspusztai védett tölgyfasor\nKasztói őstölgyes\nIzsáki Csodafa\nKiskörei \"300\" éves tölgy\nA Nagykunság legidősebb tölgyfája\nHorvátország egyetlene"], 
    [ 6695, "2025", "Geoszilveszter 2025", "2025.12.31", "Somogyvár"], 
    [ 6694, "XM25", "Geokarácsony 2025", "2025.12.23", "Fonyód"], 
    [ 6682, "GM25", "Geo Miki '25", "2025.12.06", "Dombóvár"], 
    [ 6604, "GN25", "Geo Nyuszi '25", "2025.04.20", "Kaposvár"], 
    [ 6562, "GM24", "Geo Miki '24", "2024.12.07", "Kaposvár"], 
    [ 6141, "KozM", "Közlekedési Múzeum az Északiban", "2024.10.11", "Budapest"],  
    [ 6334, "XM22", "Geokarácsony 2022", "2023.01.02", "Kaposvár"], 
    [ 5998, "MVK1", "Magyar Vöröskereszt - Jean-Henri Dunant szobra", "2021.10.12", "Budapest"], 
    [ 0, [[6047,"XX17"], [6031,"XX01"],[6044,"XX14"],[6035,"XX05"],[5239,"20ZS"]], "20 éves a geocaching.hu", "2021.07.23\n2021.08.16\n2021.10.09\n2025.09.30\n2025.10.23","Gunarasi parkerdő\nÉrsekcsanád\nÉrd - Papi földek\nSashalmi-erdő\nZselic"], 
    [ 5775, 2019, "Geoszilveszter 2019", "2019.12.30", "Kaposvár"]
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
