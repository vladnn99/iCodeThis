# NEC Contact API

Azure Functions Node.js v4, Flex Consumption. Endpoint public POST /api/contact, protejat prin Turnstile validat pe server, verificarea originii și validarea tuturor câmpurilor.

## Build

npm install
npm run build
npm test

Build copiază exclusiv graph.cjs, company-fields.cjs și turnstile.cjs din proiectul părinte în lib/. Nu copiază .env. Pentru actualizări modificați sursele din proiectul părinte și reluați build.

## Setări Azure

GRAPH_AUTH_MODE=managed-identity
AZURE_CLIENT_ID=3dcc7242-a063-4c5a-a65a-fbe768a860f9
TURNSTILE_SECRET_KEY=valoarea secretă din Cloudflare
TURNSTILE_ALLOWED_HOSTNAMES=negreanaccounting.com,www.negreanaccounting.com
ALLOWED_ORIGINS=https://negreanaccounting.com,https://www.negreanaccounting.com

IDENTITY_ENDPOINT și IDENTITY_HEADER sunt furnizate automat de Azure; nu se completează manual. Nu sunt necesare MS_CLIENT_SECRET și MS_TENANT_ID pentru identitatea Azure.

Autorizați UAMI în Exchange: setup-exchange-azure.ps1. Destinatar fix Vlad; expeditor office; email HTML Aptos 12pt, saveToSentItems=false.

CORS în portal trebuie să permită exact cele două origini ale site-ului, fără wildcard. Turnstile action=contact, verificare hostname și token pe server.

Limitarea încercărilor și blocarea tokenurilor duplicate sunt per instanță, în memorie; nu reprezintă o cotă globală persistentă. Pentru trafic/abuz semnificativ este necesară protecție distribuită la nivelul API-ului.

Nu publicați local.settings.json sau .env. Workflow-ul trebuie să împacheteze doar folderul api/, nu întregul repository. Publicarea site-ului rămâne separată.

Default domain: https://nec-contact-api-eedxdnecgkgmgud0.westeurope-01.azurewebsites.net
Endpoint: https://nec-contact-api-eedxdnecgkgmgud0.westeurope-01.azurewebsites.net/api/contact
