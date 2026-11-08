# Trends Dashboard – Netwerk Mediawijsheid

Openbaar dashboard dat laat zien hoe campagnes en onderwerpen online leven. Eerste rubriek: **Week van de Mediawijsheid 2026**.

## Wat staat waar

| Bestand | Wat het is |
|---|---|
| `index.html` | De pagina zelf |
| `data/vermeldingen.json` | Alle gevonden vermeldingen. Wordt automatisch bijgewerkt. |
| `assets/logo.svg` | Logo Netwerk Mediawijsheid |
| `assets/bg-wvdm2026.jpg` | Achtergrondfoto voor de rubriek Week van de Mediawijsheid 2026 |
| `assets/dash-shim.js` | Laadt de gegevens en tekent de onderdelen |

## Online zetten (eenmalig)

Settings → Pages → Source: *Deploy from a branch* → branch `main`, map `/ (root)` → Save.
Het dashboard staat op `https://nmdashboard.oirik.com/` (eigen domein, ingesteld via het bestand `CNAME` en een CNAME-record bij TransIP).

## Een rubriek toevoegen

Nieuwe vermeldingen krijgen een eigen `onderwerp`, er komt een optie in het keuzemenu en een eigen achtergrondfoto in `assets/`.
