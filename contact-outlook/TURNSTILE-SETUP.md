# Cloudflare Turnstile

Site key publică: 0x4AAAAAAGUNhwuiWWxkuz5f. Widget-ul folosește action=contact și validare obligatorie pe server înainte de orice email.

În .env completează TURNSTILE_SECRET_KEY cu Secret Key din Cloudflare → Turnstile → NEC Contact. Nu trimite cheia în chat. Repornește serverul după salvare.

Pentru testul local, widget-ul din Cloudflare trebuie să permită localhost. Deschide http://localhost:5173. Dacă folosești 127.0.0.1 trebuie permis și acel hostname.

Butonul este activ numai după configurarea serverului și obținerea tokenului anti-bot. Tokenul se resetează după fiecare cerere și la expirare. Pe server se verifică success, hostname și action, iar lipsa cheii sau indisponibilitatea Cloudflare blochează trimiterea.

Testele automate folosesc răspunsuri simulate, fără trimitere email. Testul real în browser necesită cheia secretă și hostname configurat. Protecția antispam trebuie completată cu limitarea cererilor înainte de publicare.
