# Conectare Microsoft 365 pentru test local

Destinatar fix: vlad@negreanaccounting.com
Expeditor fix: office@negreanaccounting.com
Subiect fix: Cerere Oferta - Formular contact website NEC
Reply-To: adresa vizitatorului.

## 1. Înregistrarea aplicației

Microsoft Entra admin center → App registrations → New registration. Nume: NEC Contact Local. Selectează Accounts in this organizational directory only. Pentru client credentials nu este necesar Redirect URI. Notează Directory (tenant) ID și Application (client) ID.

Certificates & secrets → New client secret. Copiază VALUE într-un fișier .env local, nu în chat. Notează expirarea și șterge secretul când nu mai este utilizat.

## 2. Autorizare limitată la căsuța office

Folosim Exchange Online Application RBAC cu rolul Application Mail.Send și scope pentru office@negreanaccounting.com. Nu acorda separat permisiunea Microsoft Graph Mail.Send la nivelul întregului tenant: permisiunile Entra și RBAC sunt cumulative.

În Enterprise applications identifică instanța aplicației și Object ID al service principal-ului (diferit de Object ID din App registrations). Configurarea Exchange se face de administrator, conform documentației oficiale.

Exemplu PowerShell de adaptat cu identificatorii aplicației:

Connect-ExchangeOnline
New-ServicePrincipal -AppId CLIENT_ID -ObjectId ENTERPRISE_APPLICATION_OBJECT_ID -DisplayName 'NEC Contact Local'
New-ManagementScope -Name 'NEC Contact Office Only' -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'office@negreanaccounting.com'"
New-ManagementRoleAssignment -Name 'NEC Contact Send Office' -Role 'Application Mail.Send' -App ENTERPRISE_APPLICATION_OBJECT_ID -CustomResourceScope 'NEC Contact Office Only'
Test-ServicePrincipalAuthorization -Identity ENTERPRISE_APPLICATION_OBJECT_ID -Resource office@negreanaccounting.com

Verifică și o căsuță diferită: trebuie să fie în afara scope-ului. Propagarea autorizării poate dura. Comenzile nu au fost executate automat.

## 3. Configurație locală

Copiază .env.example în .env și completează MS_TENANT_ID, MS_CLIENT_ID și MS_CLIENT_SECRET. Schimbă CONTACT_MODE=microsoft. Repornește npm run dev și deschide http://localhost:5173.

Serverul încarcă .env fără pachete suplimentare. Variabilele de mediu deja existente au prioritate. Fișierul .env este exclus din Git și nu este servit prin HTTP.

## 4. Test real

Completează formularul și apasă Trimite mesajul. Confirmarea Microsoft 202 înseamnă acceptare pentru procesare, nu confirmare de livrare. Verifică Inbox/Junk la Vlad, Sent Items la office și Reply-To. Nu retrimite imediat după timeout: prima cerere poate să fi fost acceptată.

Proiectul rămâne local. Endpointul public necesită protecție antispam și limitarea cererilor înainte de publicare.

Documentație:
https://learn.microsoft.com/en-us/graph/auth-v2-service
https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0
https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac
