// --- KONFIGURÁCIÓ ---
const STORAGE_KEY = "csacsi_api_storage";    // A tároló kulcsa a sessionStorage-ben
const TIMESTAMP_KEY = "csacsi_api_time";    // Az időbélyeg kulcsa
const EXPIRATION_TIME_MS = 15 * 60 * 1000;  // 15 perc ezredmásodpercben (15 * 60 * 1000)

// megye statisztika lekérése
// mozgó statisztika lekérése
// összes log lekérése
export async function getRecord(what, myUserId) {
    console.log("--> Adatok bekérése: " + what);
    const now = Date.now();
    
    // 1. Adatok és időbélyeg lekérése a tárolóból
    const cachedData = localStorage.getItem(STORAGE_KEY + what);
    const cachedTimestamp = localStorage.getItem(TIMESTAMP_KEY);

    // 2. Ellenőrzés: Megvan-e az adat, és nem járt-e még le az idő?
    if (cachedData && cachedTimestamp) {
        const age = now - parseInt(cachedTimestamp, 10);
        
        if (age < EXPIRATION_TIME_MS) {
            console.log("--> Adatok a gyorsítótárból betöltve.");
            return JSON.parse(cachedData);
        }
    }

    // 3. Ha nincs adat, vagy lejárt: Új adatok fetch-elése
    console.log("--> Adatok lejártak vagy hiányoznak. Új lekérés indítása...");
    try {
        let url = "";
        switch(what) {
          case "mozgo": url = "https://api.geocaching.hu/xstat?userid="; break;
          case "megye": url = "https://api.geocaching.hu/mstat?userid="; break;
          case "logok": 
          default: url = "https://api.geocaching.hu/logsbyuser?fields=cache_id%2Cdate%2Cnotes%2Clogtype&dir=asc&userid="; break;
        }
        const response = await fetch(url + myUserId);
        if (!response.ok) throw new Error("API hívás sikertelen: " + what);
        const freshData = await response.json();

        // 4. Mentési kísérlet a localStorage-be
        try {
            localStorage.setItem(STORAGE_KEY + what, JSON.stringify(freshData));
            localStorage.setItem(TIMESTAMP_KEY, now.toString());
            console.log("--> Új adatok sikeresen elmentve a localStorage-be.");
        } catch (storageError) {
            // Ez fut le, ha pl. betelik az 5 MB-os limit (QuotaExceededError)
            console.warn("!! Nem sikerült menteni a localStorage-be (lehet, hogy betelt az 5MB limit):", storageError);
        }

        return freshData;

    } catch (fetchError) {
        console.error("!! Hiba történt az adatok lekérése közben:", fetchError);
        
        // Biztonsági mentőöv: Ha a hálózat hibás, de van régi adatunk, inkább adjuk vissza azt, mint a semmit
        if (cachedData) {
            console.warn("--> Hálózati hiba miatt a lejárt (régi) adatokat adjuk vissza.");
            return JSON.parse(cachedData);
        }
        
        throw fetchError; // Ha nincs régi adat sem, továbbdobjuk a hibát
    }
}


// --- Így tudod meghívni a kódodban ---
// (Mivel aszinkron, egy async függvényben vagy .then()-el kell használni)
/*
getRecords()
    .then(adatok => {
        console.log(`Sikeresen betöltve ${adatok.length} rekord.`);
        // Itt dolgozhatsz tovább az adatokkal...
    })
    .catch(hiba => console.error("Végső hiba:", hiba));
*/

