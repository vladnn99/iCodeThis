const SENDER = 'office@negreanaccounting.com';
const RECIPIENT = 'vlad@negreanaccounting.com';
const SUBJECT = 'Cerere Oferta - Formular contact website NEC';
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
const {TAX_LABELS}=require('./company-fields.cjs');
function emailBody(data) {
  const style='font-family:Aptos,Calibri,Arial,sans-serif;font-size:12pt;line-height:1.5;';
  const money=data.estimatedTurnover===null||data.estimatedTurnover===undefined?'':new Intl.NumberFormat('ro-RO',{maximumFractionDigits:2}).format(data.estimatedTurnover)+' RON';
  const rows=[['Nume',data.name],['Denumire societate',data.companyName],['Cod fiscal',data.fiscalCode],['Obiect de activitate principal (Cod CAEN)',data.caenCode],['Activitatea principală este de producție/comerț și presupune evidența stocurilor',data.inventory],['Scurtă descriere a activității efective a entității',data.activityDescription],['Cifra de afaceri estimativă pentru sfârșit an curent (RON)',money],['Nr. salariați',data.employeeCount],['Conturi bancare',data.bankAccounts?.join(', ')],['Tip impozit',TAX_LABELS[data.taxType]],['Email',data.email],['Mesaj',data.message]];
  const content=rows.map(([label,value])=>'<p style="margin:0 0 12pt;'+style+'"><strong>'+escapeHtml(label)+':</strong><br>'+escapeHtml(value===undefined||value===null||value===''?'—':value).replace(/\r\n|\r|\n/g,'<br>')+'</p>').join('');
  return '<!doctype html><html><head><meta charset="utf-8"></head><body style="'+style+'"><div style="'+style+'">'+content+'</div></body></html>';
}
function config(env = process.env) {
  return {tenant:env.MS_TENANT_ID, client:env.MS_CLIENT_ID, secret:env.MS_CLIENT_SECRET};
}
function ready(env = process.env) {
  if(env.GRAPH_AUTH_MODE==='managed-identity')return Boolean(env.AZURE_CLIENT_ID&&env.IDENTITY_ENDPOINT&&env.IDENTITY_HEADER);
  return Object.values(config(env)).every(v=>typeof v==='string'&&v.trim());
}
async function managedToken(env,request){
  const url=new URL(env.IDENTITY_ENDPOINT);url.searchParams.set('api-version','2019-08-01');url.searchParams.set('resource','https://graph.microsoft.com/');url.searchParams.set('client_id',env.AZURE_CLIENT_ID);
  const response=await request(url.toString(),{headers:{'X-IDENTITY-HEADER':env.IDENTITY_HEADER},signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw Error('Autentificarea prin identitatea Azure a eșuat.');
  const token=await response.json();if(!token.access_token)throw Error('Identitatea Azure nu a returnat un token valid.');return token;
}
async function sendContact(data, {env=process.env, request=fetch} = {}) {
  if(!ready(env)) throw new Error('Microsoft 365 nu este configurat. Completați fișierul .env și reporniți serverul.');
  let token;
  if(env.GRAPH_AUTH_MODE==='managed-identity'){token=await managedToken(env,request);}else{
  const c=config(env);
  const tokenResponse=await request('https://login.microsoftonline.com/'+encodeURIComponent(c.tenant)+'/oauth2/v2.0/token', {method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:c.client,client_secret:c.secret,scope:'https://graph.microsoft.com/.default',grant_type:'client_credentials'}),signal:AbortSignal.timeout(15000)});
  if(!tokenResponse.ok) throw new Error('Autentificarea Microsoft a eșuat. Verificați identificatorii și secretul aplicației.');
  token=await tokenResponse.json();
  if(!token.access_token) throw new Error('Microsoft nu a returnat un token valid.');
  }
  const response=await request('https://graph.microsoft.com/v1.0/users/'+encodeURIComponent(SENDER)+'/sendMail',{method:'POST',headers:{Authorization:'Bearer '+token.access_token,'Content-Type':'application/json'},body:JSON.stringify({saveToSentItems:false,message:{subject:SUBJECT,body:{contentType:'HTML',content:emailBody(data)},toRecipients:[{emailAddress:{address:RECIPIENT}}],replyTo:[{emailAddress:{address:data.email,name:data.name}}]}}),signal:AbortSignal.timeout(15000)});
  if(response.status!==202) throw new Error('Microsoft nu a acceptat mesajul (HTTP '+response.status+'). Verificați autorizarea Mail.Send pentru căsuța office.');
  return {ok:true,mode:'microsoft',accepted:true};
}
module.exports={ready,sendContact,SENDER,RECIPIENT,SUBJECT};
