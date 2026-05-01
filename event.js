var table = '<table width="100%" id="event" style="white-space: pre;"><tr><th colspan="4">Esemény ládák</th></tr><tr><th width="66px">Azonosító</th><th>Név</th><th width="75px">Mikor?</th><th width="100px">Hol?</th></tr><tr id="rowsEvent"></tr></table>';
document.write(table);

let arrEvent = [ 
    [ 0, [[6709, "25ZS"]], "Jubileumi körtúra", "2026.05.01", "Zselic + Kapos völgye"],
    [ 6755, "GN26", "Geo Nyuszi '26", "2026.04.03", "Kaposvár - Deseda"], 
    [ 0, [[6730,"MO02"], [6710,"MO15"], [6733,"MO17"], [6719,"MO01"], [6692,"MO10"], [6746,"MO11"]], "Megyei Óriások", "2026.03.21\n2026.03.21\n2026.04.10\n2026.04.10\n2026.04.10\n2026.04.10","Sasréti ősbükkös\nGyöngyöspusztai védett tölgyfasor\nKasztói őstölgyes\nIzsáki Csodafa\nKiskörei \"300\" éves tölgy\nA Nagykunság legidősebb tölgyfája"], 
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
