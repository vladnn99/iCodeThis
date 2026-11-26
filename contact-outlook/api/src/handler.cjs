const graph=require('../lib/graph.cjs');
const turnstile=require('../lib/turnstile.cjs');
const {parseCompany}=require('../lib/company-fields.cjs');
function createHandler({env=process.env,send=graph.sendContact,verify=turnstile.verify,now=Date.now}={}){
  // Best-effort per-instance throttle. Turnstile remains mandatory on every send.
  const attempts=new Map(),tokens=new Map();
  const response=(status,jsonBody,headers={})=>({status,jsonBody,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});
  return async(request,context={error:()=>{}})=>{
    const origin=request.headers.get('origin');
    const origins=(env.ALLOWED_ORIGINS||'https://negreanaccounting.com,https://www.negreanaccounting.com').split(',').map(x=>x.trim());
    if(!origin||!origins.includes(origin))return response(403,{error:'Cerere nepermisă.'});
    const cors={'Access-Control-Allow-Origin':origin,'Vary':'Origin','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
    const reply=(code,body,extra={})=>response(code,body,{...cors,...extra});
    if(request.method==='OPTIONS')return {status:204,headers:cors};
    if(request.method!=='POST')return reply(405,{error:'Metodă nepermisă.'},{Allow:'POST, OPTIONS'});
    if(!(request.headers.get('content-type')||'').startsWith('application/json'))return reply(415,{error:'Format neacceptat.'});
    let data;
    try{const text=await request.text();if(Buffer.byteLength(text,'utf8')>32768)return reply(413,{error:'Mesajul este prea mare.'});data=JSON.parse(text);}catch{return reply(400,{error:'Date invalide.'});}
    if(!data||typeof data!=='object'||Array.isArray(data))return reply(400,{error:'Date invalide.'});
    if(data.website)return reply(202,{ok:true,mode:'microsoft'});
    const name=typeof data.name==='string'?data.name.trim():'';
    const email=typeof data.email==='string'?data.email.trim():'';
    const message=typeof data.message==='string'?data.message.trim():'';
    if(!name||name.length>120||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||/[\r\n]/.test(email)||message.length<10||message.length>5000)return reply(400,{error:'Verificați numele, adresa de email și mesajul.'});
    const company=parseCompany(data);if(company.error)return reply(400,{error:company.error});
    if(env.GRAPH_AUTH_MODE!=='managed-identity'||!graph.ready(env)||!turnstile.ready(env))return reply(503,{error:'Formularul este momentan indisponibil. Încercați din nou mai târziu.'});
    const timestamp=now();for(const [key,item]of attempts)if(item.expires<=timestamp)attempts.delete(key);for(const [key,expiry]of tokens)if(expiry<=timestamp)tokens.delete(key);
    const {createHash}=require('node:crypto');
    const key=createHash('sha256').update(email.toLowerCase()).digest('hex');
    const bucket=attempts.get(key)||{count:0,expires:timestamp+600000};
    if(bucket.count>=5||attempts.size>=10000||tokens.size>=10000)return reply(429,{error:'Prea multe încercări. Vă rugăm să reveniți mai târziu.'},{'Retry-After':'600'});
    bucket.count++;attempts.set(key,bucket);
    const rawToken=data['cf-turnstile-response'];
    if(typeof rawToken!=='string'||!rawToken||rawToken.length>2048)return reply(400,{error:'Completați verificarea anti-bot.'});
    const tokenKey=createHash('sha256').update(rawToken).digest('hex');
    if(tokens.has(tokenKey))return reply(409,{error:'Cererea a fost deja procesată. Repetați verificarea anti-bot.'});
    tokens.set(tokenKey,timestamp+300000);
    const captcha=await verify(rawToken,{env});if(!captcha.ok)return reply(captcha.status,{error:captcha.error});
    try{await send({name,email,message,...company.value},{env});return reply(202,{ok:true,mode:'microsoft',accepted:true});}
    catch{context.error('Contact: trimiterea Microsoft Graph nu a fost confirmată.');return reply(502,{error:'Trimiterea nu a putut fi confirmată. Vă rugăm să încercați mai târziu.'});}
  };
}
module.exports={createHandler};
