let arrMozgo = [ 
    [ 3825,   "FV", "Forrásvadász", "2026.02.24", "Tókaji forrás", "Húsvét forrás"], 
    [ 1960, "KaKu", "Kálváriakutató", "2026.01.27", "Kaposvár", "Maradt"], 
    [  212, "M001", "mobil_001", "2025.12.23", "Fonyód", "#GeoKari"], 
    [ 1248, "M002", "Kedvelt helyeink", "2025.12.06\n2026.02.15", "Orfű\nSágvár", "#Walk41\n#Walk43"], 
    [ 4480, "CRUX", "Crux Viator, Útszéli kereszt",  "2025.10.30\n2025.12.06\n2025.12.31\n2026.02.15", "Kisgyalán\nOrfű\nSomogyvár\nSágvár", "Szenna\n#Walk41\n#GeoSzilveszter\n#Walk43"], 
    [ 4482,  "KAS", "Kastélykutató", "2024.07.18", "Várda", "Maradt"], 
    [ 6235, "TJEL", "Turistajelzések", "2024.04.06", "Tókaji parkerdő", "Töröcskei tó"], 
    [ 5543, "EHAZ", "Erdei házak, kunyhók", "2023.08.12\n2026.02.15", "Várda\nSágvár", "Maradt\n#Walk43"], 
    [ 5081, "Time", "Napóra", "2023.05.20\n2023.10.29\n2025.12.06", "Kaposvár\nKaposvár\nOrfű", "Hencse\nMaradt\n#Walk41"], 
    [ 1779,  "AKT", "Árpád-kori templomromok, templomok 4.0", "2021.12.03", "Kaposszentjakab", "Maradt"],  
    [ 1458,   "PC", "Gécépécé (a HiTech mozgó)", "2019.12.30", "Kaposvár", "Tura"], 
    [ 1784,   "TO", "Tóbarát", "2019.12.30", "Kaposvár", "Tura"], 
    [ 4773, "HIRE", "Híres emberek", "2019.08.17", "Kaposvár", "Kaposvár"], 
    [ 1012, "User", "User Hona", "2014.08.24\n2021.04.27", "Kaposvár\nKaposvár", "Haza\nHetes"], 
    [ 3959, "FENT", "Fentről a világ (fotózz panorámát)", "2014.07.03\n2026.02.15", "Kaposvár\nSágvár", "Maradt\n#Walk43"], 
    [ 3889, "MKAT", "Magyarország katonái", "2014.05.27\n2023.08.01", "Kaposvár\nGölle", "Maradt\nMaradt"], 
    [  968, "Izgi", "Izgimozgi", "2014.04.20\n2025.12.06", "Kaposvár\nOrfű", "Kaposvár\n#Walk41"], 
    [ 3806,  "KEM", "Kerékpáros mozgó", "2014.04.19", "Kaposvár", "Maradt"], 
    [ 4856, "DDK2", "Rockenbauer Pál Dél-dunántúli Kéktúra", "2014.04.10", "Szenna", "Szenna tető"], 
    [ 4456,  "MLM", "A malomnak nincsen köve", "2014.01.02", "Kaposvár", "Maradt"], 
    [ 1409, "SPIR", "Szellemjáró Geoláda", "2013.08.21\n2026.02.15", "Taszár\nSágvár", "Somogysárd\n#Walk43"] 
];

let arrEvent = [ 
    [ 6755, "GN26", "Geo Nyuszi'26", "2026.04.03", "Kaposvár - Deseda"], 
    [ 0, [[6730,"MO02"], [6710,"MO15"]], "Megyei Óriások", "2026.03.21\n2026.03.21","Sasréti ősbükkös\nGyöngyöspusztai védett tölgyfasor"], 
    [ 6695, "2025", "Geoszilveszter 2025", "2025.12.31", "Somogyvár"], 
    [ 6694, "XM25", "Geokarácsony 2025", "2025.12.23", "Fonyód"], 
    [ 6682, "GM25", "Geo Miki '25", "2025.12.06", "Dombóvár"], 
    [ 4526, "Walk", "Gyalogtúra - 35.túra\nGyalogtúra - 41.túra\nGyalogtúra - 43.túra", "2025.03.02\n2025.12.06\n2026.02.15", "Zselic\nOrfű\nSágvár"], 
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
arrMozgo.forEach((element) => addMozgo(element));

function addMozgo(arr) { 
    let tr = document.createElement("tr"); 
    tr.style = ""; 
    let td = document.createElement("td"); 
    let a = document.createElement('a'); 
    a.href = 'https://geocaching.hu/caches.geo?id='+arr[0]; 
    a.appendChild(document.createTextNode("GC"+arr[1])); 
    td.appendChild(a); 
    tr.appendChild(td); 
    for(let i=2; i<6; i++) { 
        let td = document.createElement("td"); 
        let tx = document.createTextNode(arr[i]); 
        td.appendChild(tx); 
        tr.appendChild(td); 
    } 
    document.getElementById("rowsMozgo").after(tr); 
}
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
