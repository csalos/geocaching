import listsObject from './list.json' with { type: 'json' };

//document.write('<div id="megyeterkep" width="100%" height="474px">Sajnos a böngésződ nem támogatja az SVG-t.</div>');
const script = document.currentScript;
//const urlGet = new URL(script.src).searchParams;

const svgNS = "http://www.w3.org/2000/svg";
const puzzleSize = 100;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const myUserId = "71532";
const userId = getCookie("last_user_id");

//const getList = urlGet.get("getList") || "";

var getListFound = [];

collectionMolyolo();
async function collectionMolyolo() {
	// Azonnal átalakítjuk szupergyors Map-pé
	const listsMap = new Map(Object.entries(listsObject));

	// Keresés és futtatás teszt
	const searchCode = "kisv";
	if (listsMap.has(searchCode)) {
		var prom = listsMap.get(searchCode).items.map(jsonMolyolo);
		getListFound = await Promise.all(prom);
		loadSVG(listsMap.get(searchCode));
	}

	
}
async function jsonMolyolo(láda) {
	try {
		const {getRecord} = await import('https://csalos.github.io/geocaching/apiCall.js');

		//megtalálások lekérése: láda azonosító, dátum, bejegyzés és a log típusa
		//egybe - hogy ne terheljük le a szervert a sok hívással
		const jsn = await getRecord("logok", myUserId);
		
		// megtalálásokból leszűrjük az adott mozgóhoz tartozókat, ha a bejegyzés típusa "1" - azaz "megtalált" 
		const talalatok = jsn.filter(elem => elem.cache_id == láda.id && elem.logtype==="1");
		
		láda.found = (talalatok.length > 0);
		
	} catch (hiba) {
		console.error("Hiba a lekérésnél:", hiba);
	}
}

async function loadSVG(list) {
	try {
		const x = list.size[0];
		const y = list.size[1];
		const svgObjektum = await fetch("puzzle.svg")
			.then(response => response.text())
			.then(svgText => {
		
				// Beillesztés egy konténerbe
				document.getElementById("megyeterkep").innerHTML = svgText;

				// Már elérhető az SVG
				const svgBelseje = document.querySelector("#megyeterkep svg");
				document.getElementById("svg").setAttribute("width" , x*puzzleSize);
				document.getElementById("svg").setAttribute("height", y*puzzleSize);
				document.getElementById("svg").setAttribute("viewBox", "0 0 "+(x*50)+" "+(y*50));

				svgManipulator(svgBelseje, list);
			});
	} catch (hiba) {
		console.error("Hiba a lekérésnél:", hiba);
	}
}
function svgManipulator(svgBelseje, list) {
	const px = list.size[0];
	const py = list.size[1];
	const sp = list.items.at(-1).span ?? 0;
	let pieces = genPieces(px, py, sp);
	for(let x=0; x<(px*py)-sp+1; x++) {
		let piece = document.createElementNS(svgNS, "g");
			piece.id = "p_" + x;
			piece.setAttribute("transform", "translate(" + (50*(x%px) + " "+ (50*(x-(x%px))/px)) +")");
			
		let link = document.createElementNS(svgNS, "a");
			link.setAttribute("href", "https://geocaching.hu/caches.geo?id="+list.items[x].id);
			link.setAttribute("target", "_blank");

		let path = document.createElementNS(svgNS, "path");
			path.id = "path" + x;
			path.setAttribute("d", pieces[x]);
		if(list.items[x].found)
			path.setAttribute("style", "display:inline;fill:url(#pattern16);fill-opacity:1");
		else
			path.setAttribute("style", "display:inline;fill:url(#pattern16);fill-opacity:1;filter:url(#filter17);opacity:0.75");
			path.setAttribute("stroke", "#f00");

		let text = document.createElementNS(svgNS, "text");
			text.id = "text_" + x;
			text.setAttribute("x", 25);
			text.setAttribute("y", 40);
			text.setAttribute("text-anchor", "middle");
			text.setAttribute("fill", "black");
			text.textContent = list.items[x].name.toUpperCase();

		link.appendChild(path);
		piece.appendChild(link);
		piece.appendChild(text);
		svgBelseje.getElementById("puzzle").appendChild(piece);
	}
}
/**
 * Puzzle darabok generálása
 * @param cCnt - Oszlopok száma
 * @param rCnt - Sorok száma
 * @return pathArray - Tömb az egyes darabok útvonalával
 */
 function genPieces(cCnt, rCnt, span) {
	let earsV = [];
	let earsH = [];
	
	//előre legenerálunk minden szükséges vízszintes fület
	for(let i=0; i<rCnt-1; i++) {
		let ear = [];
		for(let j=0; j<cCnt; j++) {
			ear.push(rotateRelativePath(generateRandomPuzzleEdge(),270));
		}
		earsH.push(ear);
	}
	//előre legenerálunk minden szükséges függőleges fület
	for(let i=0; i<rCnt; i++) {
		let ear = [];
		for(let j=0; j<cCnt-1; j++) {
			ear.push(generateRandomPuzzleEdge());
		}
		earsV.push(ear);
	}
	let puzzle = [];
	for(let row=0; row<rCnt; row++) {
		for(let col=0; col<cCnt; col++) {
			if(span > 0 && col >= cCnt-span && row == rCnt-1) {
				if(col > cCnt-span) break;
				puzzle.push(genPiece(col, row, span, earsH, earsV));
			} else
				puzzle.push(genPiece(col, row, 0, earsH, earsV));
		}
	}
	return puzzle;
 }
 /**
 * Egy puzzle darab generálása
 * @param actC [int] - aktuális oszlop
 * @param actR [int] - aktuális sor
 * @param span [int] - az utolsó darab széthúzása
 * @param earsV [2D array] - véletlen generálta fülek
 * @param earsH [2D array] - véletlen generálta fülek
 * @return path - String egy puzzle-darab útvonalával
 */
 function genPiece(actC, actR, span, earsH, earsV) {
	let x = earsV[0].length+1;
	let y = earsV.length;
	
	let path = "M 0,0 "+ //fent + jobb + lent + bal
		((actR==0)	?" h 50 ":(earsH[actR-1][actC]).map(seg => seg.join(' ')).join(' '))+
		((span>=2)	?         (earsH[actR-1][actC+1]).map(seg => seg.join(' ')).join(' ') : "")+
		((span==3)	?         (earsH[actR-1][actC+2]).map(seg => seg.join(' ')).join(' ') : "")+
((span>0||actC==x-1)?" v 50 ":(earsV[actR][actC]).map(seg => seg.join(' ')).join(' '))+
		((actR==y-1)?" h -50 ":reverseRelativePath(earsH[actR][actC]).map(seg=>seg.join(' ')).join(' '))+
		((span>=2)	?" h -50 " : "")+((span==3)	?" h -50 " : "")+
		((actC==0)	?" v -50 ":reverseRelativePath(earsV[actR][actC-1]).map(seg => seg.join(' ')).join(' '));
	return path;
 }
 
/**
 * Random fül generálása fentről lefelé 0,0-ból 0,50-be
 */
function generateRandomPuzzleEdge() {
	// Alapméretek (egy 50 pixel hosszú élhez igazítva)
	const totalLength = 50;

	// Véletlenszerűsített paraméterek (kisebb szórással a szép formáért)
	const neckWidth = 3.0 + (Math.random() * 2 - 1);	// Nyak szélessége (X elmozdulás az első görbén)
	const headHeight = 20.0 + (Math.random() * 4 - 2);	// Fül magassága (Y elmozdulás)
	const headSpread = 10.0 + (Math.random() * 4 - 2);	// Fül fejének szélessége oldalra
	const headBulgeY = 2.5 + (Math.random() * 2 - 1);	// Fül fejének Y irányú hossza
	const neckReturn = 5.5 + (Math.random() * 2 - 1);	// Visszakanyarodás íve

	// Kiszámoljuk az utolsó szakasz Y elmozdulását, hogy a teljes hossz pontosan 50 pixel legyen
	// Görbe 1 Y (headHeight) + Görbe 2 Y (headBulgeY) + Görbe 3 Y (neckReturn) = eddigi Y elmozdulás
	const currentY = headHeight + headBulgeY + neckReturn;
	const remainingY = totalLength - currentY; // pontosan a sarokba érkezés

	// Balra vagy jobbra domborodjon a fül (1 vagy -1)
	const direction = Math.random() > 0.5 ? 1 : -1;

	return [
		// 1. Görbe: Elindul a sarokból, lefelé ível és kialakítja a nyak egyik oldalát
		['c',
			0.0, 0.0, 
			0.0, headHeight, 
			neckWidth * direction, headHeight
		],
		// 2. Görbe: Kifelé kanyarodik, létrehozza a fül nagy kerek fejét
		['c', 
			neckWidth * direction, 0.0, 
			headSpread * direction, -8.39, // Az eredeti SVG arányai alapján
			headSpread * direction, headBulgeY
		],
		// 3. Görbe: Visszakanyarodik a tengely felé, kialakítja a nyak másik oldalát
		['c', 
			0.0, 11.0, 
			-(headSpread - neckWidth) * direction, neckReturn, 
			-headSpread * direction, neckReturn
		],
		// 4. Görbe: Kiegyenesedik és lefut a darab alsó sarkáig (pontosan az 50. pixelre)
		['c', 
			-neckWidth * direction, 0.0, 
			-1.56 * direction, remainingY - 4.4, // Finom érkezési ív kompenzáció
			-neckWidth * direction, remainingY
		]
	];
}
/**
 * Relatív útvonal elforgatása 90 fokos lépésekben
 * @param {Array} pathArray - A relatív szakaszok tömbje
 * @param {number} degrees - A forgatás szöge (90, 180, 270)
 */
function rotateRelativePath(pathArray, degrees) {
	const steps = ((degrees % 360) + 360) % 360 / 90;
	if (steps === 0) return pathArray;

	return pathArray.map(seg => {
		const cmd = seg[0];
		const result = [cmd];

		for (let i = 1; i < seg.length; i += 2) {
			let x = seg[i];
			let y = seg[i + 1];

			for (let step = 0; step < steps; step++) {
				const tempX = x;
				x = -y;
				y = tempX;
			}
			result.push(x, y);
		}
		return result;
	});
}
/**
 * Relatív útvonal megfordítása / lentről -> felfelé
 * @param {Array} pathArray - A relatív szakaszok tömbje
 */
function reverseRelativePath(pathArray) {
	const reversed = [];

	for (let i = pathArray.length - 1; i >= 0; i--) {
		const seg = pathArray[i];
		const cmd = seg[0];

		if (cmd === 'c') {
			const cp1x = seg[1];
			const cp1y = seg[2];
			const cp2x = seg[3];
			const cp2y = seg[4];
			const dx   = seg[5];
			const dy   = seg[6];

			const newCp1x = cp2x - dx;
			const newCp1y = cp2y - dy;
			const newCp2x = cp1x - dx;
			const newCp2y = cp1y - dy;
			const newDx   = -dx;
			const newDy   = -dy;

			reversed.push(['c', newCp1x, newCp1y, newCp2x, newCp2y, newDx, newDy]);
		} else if (cmd === 'l') {
			const dx = seg[1];
			const dy = seg[2];
			reversed.push(['l', -dx, -dy]);
		}
	}
	return reversed;
}
