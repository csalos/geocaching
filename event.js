var tableEvent = '<table width="100%" id="event" style="white-space: pre;"><tr><th colspan="4">Esemény ládák</th></tr><tr><th width="66px">Azonosító</th><th>Név</th><th width="75px">Mikor?</th><th width="100px">Hol?</th></tr><tr id="rowsEvent"></tr></table>';
document.write(tableEvent);

let arrEvent = [ 
    [ 6767, "50FV", "L. Geocaching Fesztivál és Verseny", "2026.05.16", "Sasrét"], 
    [ 0, "Jubileumi körtúra", 
	 	[[6709,"25ZS","2026.05.01","Zselic + Kapos völgye"],
		 [6712,"25TL","2026.06.13","Szekszárdi dombság"],
		 [6722,"25UV","2026.06.13","Üvegesek útja - Mecsek"],
		 [6725,"25SK","2026.07.29","A szegedi kisvasút nyomában"],
		 [6744,"25BS","2026.07.29","Békési ősök nyomában"],
		 [6723,"25BM","2026.07.30","Mályvádi huszonötös"],
		 [6737,"25HB","2026.07.31","Debrecen - Nagyerdei körtúra"],
		 [6724,"25BU","2026.07.31","Bükki körtúra"],
		 [6699,"25MF","2026.08.01","Medves-fennsík"]]
	],
    [ 6755, "GN26", "Geo Nyuszi '26", "2026.04.03", "Kaposvár - Deseda"],
    [ 0, "Megyei Óriások",
		[[6730,"MO02","2026.03.21","Sasréti ősbükkös"],
		 [6710,"MO15","2026.03.21","Gyöngyöspusztai védett tölgyfasor"],
		 [6733,"MO17","2026.04.10","Kasztói őstölgyes"],
		 [6719,"MO01","2026.04.10","Izsáki Csodafa"],
		 [6692,"MO10","2026.04.10","Kiskörei \"300\" éves tölgy"],
		 [6746,"MO11","2026.04.10","A Nagykunság legidősebb tölgyfája"],
		 [6689,"MO23","2026.06.13","Horvátország egyetlene"],
		 [6698,"MO06","2026.07.29","A Körtvélyesi matuzsálem"],
		 [6711,"MO03","2026.07.29","Viharsarki matuzsálem"],
		 [6707,"MO22","2026.07.30","A remetei korelnök"],
		 [6726,"MO09","2026.07.30","Bagaméri óriások"],
		 [6702,"MO16","2026.07.31","Balkányi \"felhőkarcoló\""],
		 [6729,"MO04","2026.07.31","Magyarország legmagasabb fája"],
		 [6708,"MO13","2026.08.01","A keselyréti 500 éves tölgyfa"]]
	],
    [ 6695, "2025", "Geoszilveszter 2025", "2025.12.31", "Somogyvár"],
    [ 6694, "XM25", "Geokarácsony 2025", "2025.12.23", "Fonyód"],
    [ 6682, "GM25", "Geo Miki '25", "2025.12.06", "Dombóvár"],
    [ 6604, "GN25", "Geo Nyuszi '25", "2025.04.20", "Kaposvár"],
    [ 6562, "GM24", "Geo Miki '24", "2024.12.07", "Kaposvár"],
    [ 6141, "KozM", "Közlekedési Múzeum az Északiban", "2024.10.11", "Budapest"],
    [ 6334, "XM22", "Geokarácsony 2022", "2023.01.02", "Kaposvár"],
    [ 5998, "MVK1", "Magyar Vöröskereszt - Jean-Henri Dunant szobra", "2021.10.12", "Budapest"],
    [ 0, "20 éves a geocaching.hu",
	 	[[6047,"XX17","2021.07.23","Gunarasi parkerdő"],
		 [6031,"XX01","2021.08.16","Érsekcsanád"],
		 [6044,"XX14","2021.10.09","Érd - Papi földek"],
		 [6035,"XX05","2025.09.30","Sashalmi-erdő"],
		 [5239,"20ZS","2025.10.23","Zselic"],
		 [6045,"XX15","2026.07.05","Szent Vendel kilátó"],
		 [6036,"XX06","2026.07.29","Kivéve a gyevi bírót"]]
	], 
    [ 5775, 2019, "Geoszilveszter 2019", "2019.12.30", "Kaposvár"]
];
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
arrEvent.forEach((element) => addEvent(element));

function addEvent(arr) {
    let tr = document.createElement("tr");
    tr.style = "";
    if(arr[0]!==0) {
		let td = document.createElement("td");
        let a = document.createElement('a');
        a.href = 'https://geocaching.hu/caches.geo?id='+arr[0];
        a.appendChild(document.createTextNode("GC"+arr[1]));
        td.appendChild(a);
		tr.appendChild(td);
	    for(let i=2; i<5; i++) {
	        let td = document.createElement("td");
	        let tx = document.createTextNode(arr[i]);
	        td.appendChild(tx);
	        tr.appendChild(td);
	    }
    } else {
        let link = arr[2];
		let td_id = document.createElement("td");
		let td = document.createElement("td");
		let td_dt = document.createElement("td");
		let td_nm = document.createElement("td");
        for(let x=0; x<link.length; x++) {
            let b = document.createElement('a');
            b.href = 'https://geocaching.hu/caches.geo?id='+link[x][0];
            b.appendChild(document.createTextNode("GC"+link[x][1]));
            td_id.appendChild(b);
            td_id.appendChild(document.createElement('br'));
            td_dt.appendChild(document.createTextNode(link[x][2]));
            td_dt.appendChild(document.createElement('br'));
            td_nm.appendChild(document.createTextNode(link[x][3]));
            td_nm.appendChild(document.createElement('br'));
        }
		tr.appendChild(td_id); //id és link
		tr.appendChild(td.appendChild(document.createTextNode(arr[1]))); //csoport név
		tr.appendChild(td_dt); //megtalálás napja
		tr.appendChild(td_nm); //láda neve
    }
    document.getElementById("rowsEvent").after(tr);
}
