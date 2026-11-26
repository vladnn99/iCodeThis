function ready(env=process.env){return Boolean(env.TURNSTILE_SECRET_KEY?.trim());}
async function verify(token,{env=process.env,request=fetch}={}){
  if(!ready(env))return {ok:false,status:503,error:'Verificarea anti-bot nu este configurată pe server.'};
  if(typeof token!=='string'||!token.trim()||token.length>2048)return {ok:false,status:400,error:'Completați verificarea anti-bot.'};
  try{
    const response=await request('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token}),signal:AbortSignal.timeout(10000)});
    if(!response.ok)return {ok:false,status:503,error:'Serviciul anti-bot nu răspunde. Încercați din nou.'};
    const result=await response.json();
    const hosts=(env.TURNSTILE_ALLOWED_HOSTNAMES||'localhost,127.0.0.1,negreanaccounting.com,www.negreanaccounting.com').split(',').map(h=>h.trim()).filter(Boolean);
    if(result.success!==true||result.action!=='contact'||!hosts.includes(result.hostname))return {ok:false,status:403,error:'Verificarea anti-bot a expirat sau nu este validă. Repetați verificarea.'};
    return {ok:true};
  }catch{return {ok:false,status:503,error:'Nu se poate verifica protecția anti-bot. Încercați din nou.'};}
}
module.exports={ready,verify};
