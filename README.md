# Trends Dashboard – Netwerk Mediawijsheid

Openbaar dashboard dat laat zien hoe campagnes en onderwerpen online leven. Eerste rubriek: **Week van de Mediawijsheid 2026**.

## Wat staat waar

| Bestand | Wat het is |
|---|---|
| `index.html` | De pagina zelf |
| `data/vermeldingen.json` | Alle gevonden vermeldingen. Wordt automatisch bijgewerkt. |
| `assets/logo.svg` | Logo Netwerk Mediawijsheid |
| `assets/bg-wvdm2026.jpg` | Achtergrondfoto voor de rubriek Week van de Mediawijsheid 2026 |
| `assets/dash-shim.js` | Laadt de gegevens en tekent de onderdelen (slaat verborgen vermeldingen over) |
| `beheer/index.html` | Beheerpagina: vermeldingen verbergen of handmatig toevoegen (met wachtwoord) |

## Online zetten (eenmalig)

Settings → Pages → Source: *Deploy from a branch* → branch `main`, map `/ (root)` → Save.
Het dashboard staat op `https://nmdashboard.oirik.com/` (eigen domein, ingesteld via het bestand `CNAME` en een CNAME-record bij TransIP).

## Een rubriek toevoegen

Nieuwe vermeldingen krijgen een eigen `onderwerp`, er komt een optie in het keuzemenu en een eigen achtergrondfoto in `assets/`.

## Beheer (vermeldingen verbergen of toevoegen)

Op `https://nmdashboard.oirik.com/beheer/` kun je verkeerde vermeldingen verbergen en zelf berichten toevoegen.

- De pagina schrijft via de GitHub-API rechtstreeks naar `data/vermeldingen.json`, met een eigen *fine-grained personal access token* (alleen deze repository, *Contents: Read and write*).
- Die sleutel wordt in de browser versleuteld met een zelfgekozen wachtwoord (PBKDF2 + AES-GCM) en alleen op dat apparaat bewaard. Na 30 minuten zonder activiteit vergrendelt de pagina.
- Verbergen = het veld `"verborgen": true`. De regel blijft in het bestand, zodat de automatische zoekronde hem niet opnieuw toevoegt; het dashboard telt en toont hem niet.
- Handmatig toegevoegde regels krijgen `"handmatig": true`. De zoekronde laat beide velden met rust.
