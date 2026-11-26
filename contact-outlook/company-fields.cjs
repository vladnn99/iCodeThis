const TAX_LABELS={profit:'Impozit profit',micro:'Impozit venit microîntreprinderi',pfa:'Impozit venit (profesie liberală/PFA)',unknown:'Nu stiu'};
function parseCompany(data){
  const result={};
  for(const [key,limit,label] of [['companyName',200,'Denumire societate'],['fiscalCode',50,'Cod fiscal'],['caenCode',120,'Cod CAEN'],['activityDescription',2000,'Descriere activitate']]){
    const value=data[key]??'';
    if(typeof value!=='string'||!value.trim()||value.trim().length>limit)return {error:'Verificați câmpul '+label+'.'};
    result[key]=value.trim();
  }
  result.inventory=data.inventory??'';if(!['DA','NU'].includes(result.inventory))return {error:'Selectați DA sau NU pentru evidența stocurilor.'};
  result.taxType=data.taxType??'';if(!Object.hasOwn(TAX_LABELS,result.taxType))return {error:'Selectați un tip de impozit valid.'};
  for(const [key,integer,max] of [['estimatedTurnover',false,999999999999.99],['employeeCount',true,1000000]]){
    const raw=data[key];if(raw===''||raw===undefined||raw===null){return {error:'Completați cifra de afaceri și numărul de salariați (zero este acceptat).'};}
    if(!['number','string'].includes(typeof raw)||(typeof raw==='string'&&!raw.trim()))return {error:'Introduceți o valoare numerică validă.'};
    const value=Number(raw);
    if(!Number.isFinite(value)||value<0||value>max||(integer&&!Number.isInteger(value))||(!integer&&Math.abs(value*100-Math.round(value*100))>0.01))return {error:integer?'Numărul de salariați trebuie să fie un număr întreg pozitiv sau zero.':'Cifra de afaceri trebuie să fie pozitivă sau zero, cu maximum două zecimale.'};
    result[key]=value;
  }
  const accounts=data.bankAccounts??[];
  if(!Array.isArray(accounts)||accounts.length<1||accounts.length>3||accounts.some(value=>!['RON','EUR','USD'].includes(value))||new Set(accounts).size!==accounts.length)return {error:'Selectați monedele conturilor bancare dintre RON, EUR și USD.'};
  result.bankAccounts=accounts;
  return {value:result};
}
module.exports={parseCompany,TAX_LABELS};
