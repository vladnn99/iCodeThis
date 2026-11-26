# Contact Outlook

Proiect separat pentru testarea locală a formularului. Site-ul negreanaccounting și workflow-ul său de publicare nu sunt modificate.

## Pornire

Necesită Node.js 20+. Nu sunt necesare pachete suplimentare.

Din acest folder: npm run dev

Deschide http://localhost:5173. Oprire: Ctrl+C. Port alternativ: variabila PORT.

## Faza actuală

Formular adaptat la mobil, validare browser/server, câmp capcană antispam, limită de mărime a cererii, stări de încărcare/succes/eroare. Endpoint local POST /api/contact răspunde în mod demo. Nu trimite emailuri și nu salvează date. Serverul ascultă doar pe 127.0.0.1 și servește exclusiv fișierele publice.

## Urmează

1. Funcția Azure pentru /api/contact.
2. Identitate și autorizare Microsoft 365 limitată la căsuța office.
3. Test de trimitere reală prin Microsoft Graph, cu Reply-To către vizitator.
4. Protecție antispam și limitarea cererilor pentru endpointul public.
5. Publicare separată pentru test, apoi integrare în site.

Nu există deployment configurat pentru acest proiect. Nu introduce parole sau tokenuri în Git ori în fișierele publice.

## Integrare Microsoft Graph

Codul de trimitere este pregătit. Urmează MICROSOFT-SETUP.md pentru înregistrarea aplicației, autorizare și configurarea .env. Mod implicit: demo. În modul microsoft se trimit emailuri reale către vlad@negreanaccounting.com cu subiectul Cerere Oferta - Formular contact website NEC. Nu a fost efectuat încă un test real de livrare.
