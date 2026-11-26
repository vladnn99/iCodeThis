(()=>{
const form=document.querySelector('#contact-form');
const status=document.querySelector('#status');
const sendButton=document.querySelector('#send');
const nextButton=document.querySelector('#next');
const previousButton=document.querySelector('#previous');
const panels=[...form.querySelectorAll('[data-step]')];
const stepButtons=[...document.querySelectorAll('.contact-wizard [data-go]')];
const currencyCheckboxes=[...form.querySelectorAll('[name="bankAccounts"]')];
let currentStep=0,configurationReady=false,busy=false,token='',widgetId=null,captchaStarted=false;
let currentLanguage='ro',lastStatus={message:'',state:''};
const english={
'O colaborare bună începe cu câteva detalii.':'A good partnership starts with a few details.',
'Societatea':'Company','Datele de identificare':'Company details','Activitatea':'Activity','Activitatea societății':'Business activity','Date financiare':'Financial details','Volum și servicii':'Volume and services','Câmpuri obligatorii':'All fields required',
'Despre societatea dumneavoastră':'About your company','Completați datele societății și adresa la care vă putem răspunde.':'Tell us about your company and how we can reach you.',
'Numele dumneavoastră':'Your name','Adresa de email':'Email address','Denumire societate':'Company name','Cod fiscal':'Tax identification number',
'Ce activitate desfășurați?':'What does your company do?','Câteva informații despre activitatea de zi cu zi.':'A few details about your day-to-day business.',
'Obiect de activitate principal (Cod CAEN)':'Main business activity (CAEN code)',
'Activitatea principală este de producție/comerț și presupune evidența stocurilor':'Does your main activity involve manufacturing/trading and inventory records?',
'Alegeți o opțiune':'Choose an option','DA':'YES','NU':'NO',
'Scurtă descriere a activității efective a entității':'Brief description of the actual business activity',
'Vă rugăm să descrieți pe scurt activitatea efectivă a societății (maximum un paragraf). De exemplu: ce vindeți sau ce servicii prestați, cum obțineți veniturile și care sunt principalele activități desfășurate lunar.':'Please briefly describe your actual business activity (up to one paragraph): what you sell or which services you provide, how you earn revenue, and your main monthly activities.',
'Ultimele detalii.':'The final details.','Completați datele financiare și transmiteți-ne mesajul dumneavoastră.':'Complete your financial details and leave us a message.',
'Cifra de afaceri estimativă pentru sfârșit an curent (RON)':'Estimated turnover at the end of the current year (RON)','Nr. salariați':'Number of employees','Tip impozit':'Tax regime','Impozit profit':'Corporate income tax','Impozit venit microîntreprinderi':'Microenterprise income tax','Impozit venit (profesie liberală/PFA)':'Income tax (liberal profession / sole trader)','Nu stiu':'Not sure','Conturi bancare':'Bank accounts','Mesajul dumneavoastră':'Your message',
'← Înapoi':'← Back','Continuați':'Continue','Trimiteți mesajul':'Send message','Datele completate se păstrează între pași.':'Your details are kept as you move between steps.',
'Selectați cel puțin o monedă pentru conturile bancare.':'Please select at least one currency for your bank accounts.',
'Verificarea anti-bot a expirat. Repetați verificarea.':'The anti-bot check expired. Please complete it again.',
'Verificarea anti-bot nu s-a încărcat. Reîncărcați pagina.':'The anti-bot check did not load. Please reload the page.',
'Nu se poate încărca verificarea anti-bot. Verificați conexiunea și reîncărcați pagina.':'The anti-bot check could not load. Check your connection and reload the page.',
'Formularul este momentan indisponibil. Încercați din nou mai târziu.':'The form is temporarily unavailable. Please try again later.',
'Completați verificarea anti-bot.':'Please complete the anti-bot check.',
'Se trimite mesajul…':'Sending your message…','Mesajul dumneavoastră a fost trimis!':'Your message has been sent!',
'Trimiterea a eșuat.':'Your message could not be sent.',
'Serverul nu a răspuns la timp. Verificați primirea mesajului înainte de a retrimite.':'The server did not respond in time. Please check receipt before resending.',
'Verificarea anti-bot a expirat sau nu este validă. Repetați verificarea.':'The anti-bot check expired or is invalid. Please complete it again.',
'Trimiterea nu a putut fi confirmată. Vă rugăm să încercați mai târziu.':'Your submission could not be confirmed. Please try again later.',
'Prea multe încercări. Vă rugăm să reveniți mai târziu.':'Too many attempts. Please try again later.'
};
const tr=text=>currentLanguage==='en'?(english[text]||text):text;
const root=document.querySelector('.contact-wizard');
const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const localizedNodes=[];
while(walker.nextNode()){const node=walker.currentNode,original=node.nodeValue,text=original.trim();if(Object.hasOwn(english,text))localizedNodes.push({node,original,text});}
function setLanguage(language){
  currentLanguage=language==='en'?'en':'ro';root.lang=currentLanguage;
  localizedNodes.forEach(({node,original,text})=>{node.nodeValue=original.replace(text,tr(text));});
  form.querySelectorAll('[placeholder]').forEach(input=>input.removeAttribute('placeholder'));
  root.setAttribute('aria-label',currentLanguage==='en'?'Contact form':'Formular de contact');
  root.querySelector('nav').setAttribute('aria-label',currentLanguage==='en'?'Form steps':'Pașii formularului');
  validateCurrencies();showStep(currentStep,false);showStatus(lastStatus.message,lastStatus.state);
}
document.addEventListener('nec-language-change',event=>setLanguage(event.detail.language));

function validateCurrencies(){currencyCheckboxes[0].setCustomValidity(currencyCheckboxes.some(input=>input.checked)?'':tr('Selectați cel puțin o monedă pentru conturile bancare.'));}
currencyCheckboxes.forEach(input=>input.addEventListener('change',validateCurrencies));
function showStatus(message,state='error'){lastStatus={message,state};status.dataset.state=state;status.textContent=tr(message);}
function updateButtons(){sendButton.disabled=!configurationReady||!token||busy;nextButton.disabled=busy;previousButton.disabled=busy;stepButtons.forEach(button=>button.disabled=busy);}
function showStep(index,focus=true){
  currentStep=index;panels.forEach((panel,i)=>panel.hidden=i!==index);
  stepButtons.forEach((button,i)=>{if(i===index)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');button.classList.toggle('complete',i<index);});
  document.querySelector('#step-count').textContent=currentLanguage==='en'?'STEP '+(index+1)+' OF 3':'PASUL '+(index+1)+' DIN 3';
  document.querySelector('#progress-fill').style.width=((index+1)/3*100)+'%';
  previousButton.hidden=index===0;nextButton.hidden=index===2;sendButton.hidden=index!==2;
  document.querySelector('#verification').hidden=index!==2;
  document.querySelector('#footer-note').hidden=index!==0;
  if(index===2&&!captchaStarted)loadCaptcha();
  if(focus)document.querySelector('#step-title-'+index).focus({preventScroll:true});
  updateButtons();
}
function validatePanel(index){
  validateCurrencies();
  const invalid=[...panels[index].querySelectorAll('input,select,textarea')].find(control=>!control.checkValidity());
  if(invalid){if(currentStep!==index)showStep(index);invalid.reportValidity();return false;}
  return true;
}
function goTo(index){if(busy)return;if(index>currentStep){for(let i=currentStep;i<index;i++){if(!validatePanel(i))return;}}showStatus('','');showStep(index);}
stepButtons.forEach(button=>button.addEventListener('click',()=>goTo(Number(button.dataset.go))));
nextButton.addEventListener('click',()=>goTo(Math.min(currentStep+1,2)));
previousButton.addEventListener('click',()=>goTo(Math.max(currentStep-1,0)));
function loadCaptcha(){
  captchaStarted=true;
  window.necTurnstileLoaded=()=>{widgetId=window.turnstile.render('#turnstile-widget',{
    sitekey:'0x4AAAAAAGUNhwuiWWxkuz5f',action:'contact',theme:'light',size:'flexible',
    callback:value=>{token=value;updateButtons();},
    'expired-callback':()=>{token='';updateButtons();if(currentStep===2&&!busy)showStatus('Verificarea anti-bot a expirat. Repetați verificarea.');},
    'error-callback':()=>{token='';updateButtons();showStatus('Verificarea anti-bot nu s-a încărcat. Reîncărcați pagina.');}
  });};
  const script=document.createElement('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=necTurnstileLoaded&render=explicit';script.async=true;script.defer=true;
  script.onerror=()=>{token='';updateButtons();showStatus('Nu se poate încărca verificarea anti-bot. Verificați conexiunea și reîncărcați pagina.');};document.head.appendChild(script);
}
form.addEventListener('submit',async event=>{
  event.preventDefault();if(busy)return;if(currentStep<2){goTo(currentStep+1);return;}
  for(let i=0;i<panels.length;i++){if(!validatePanel(i))return;}
  if(!configurationReady){showStatus('Formularul este momentan indisponibil. Încercați din nou mai târziu.');return;}
  if(!token){showStatus('Completați verificarea anti-bot.');return;}
  busy=true;updateButtons();showStatus('Se trimite mesajul…','pending');
  try{
    const formData=new FormData(form);const data=Object.fromEntries(formData);data.bankAccounts=formData.getAll('bankAccounts');data['cf-turnstile-response']=token;
    const response=await fetch('https://nec-contact-api-eedxdnecgkgmgud0.westeurope-01.azurewebsites.net/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(45000)});
    const result=await response.json();if(!response.ok)throw Error(result.error||'Trimiterea a eșuat.');
    showStatus(result.mode==='microsoft'?'Mesajul dumneavoastră a fost trimis!':'Test reușit. Nu s-a trimis niciun email.','success');
    form.reset();validateCurrencies();token='';showStep(0);
  }catch(error){showStatus(error.name==='TimeoutError'?'Serverul nu a răspuns la timp. Verificați primirea mesajului înainte de a retrimite.':error.message);}
  finally{busy=false;token='';if(widgetId!==null&&window.turnstile)window.turnstile.reset(widgetId);updateButtons();}
});
validateCurrencies();
configurationReady=true;
updateButtons();
showStep(0,false);

})();
