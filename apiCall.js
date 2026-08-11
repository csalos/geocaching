// megye statisztika lekérése
export async function mstat(myUserId) {
  const response = await fetch("https://api.geocaching.hu/mstat?userid="+myUserId);
  if (!response.ok) throw new Error("API hívás sikertelen: mStat");
  const json = await response.json();
  return json;
}

// mozgó statisztika lekérése
export async function xstat(myUserId) {
  const response = await fetch("https://api.geocaching.hu/xstat?userid="+myUserId);
  if (!response.ok) throw new Error("API hívás sikertelen: xStat");
  const json = await response.json();
  return json;
}

// összes log lekérése
export async function logsbyuser(myUserId) {
  const response = await fetch("https://api.geocaching.hu/logsbyuser?fields=cache_id%2Cdate%2Cnotes%2Clogtype&dir=asc&userid="+myUserId);
  if (!response.ok) throw new Error("API hívás sikertelen: logsByUser");
  const json = await response.json();
  return json;
}

