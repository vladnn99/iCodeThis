const form=document.querySelector('#contact-form');
const status=document.querySelector('#status');
const sendButton=document.querySelector('#send');
const nextButton=document.querySelector('#next');
const previousButton=document.querySelector('#previous');
const panels=[...form.querySelectorAll('[data-step]')];
const stepButtons=[...document.querySelectorAll('[data-go]')];
const currencyCheckboxes=[...form.querySelectorAll('[name="bankAccounts"]')];
let currentStep=0,configurationReady=false,busy=false,token='',widgetId=null,captchaStarted=false;
function validateCurrencies(){currencyCheckboxes[0].setCustomValidity(currencyCheckboxes.some(input=>input.checked)?'':'Selectați cel puțin o monedă pentru conturile bancare.');}
currencyCheckboxes.forEach(input=>input.addEventListener('change',validateCurrencies));validateCurrencies();
function showStatus(message,state='error'){status.dataset.state=state;status.textContent=message;}
function updateButtons(){sendButton.disabled=!configurationReady||!token||busy;nextButton.disabled=busy;previousButton.disabled=busy;stepButtons.forEach(button=>button.disabled=busy);}
function showStep(index,focus=true){
  currentStep=index;panels.forEach((panel,i)=>panel.hidden=i!==index);
  stepButtons.forEach((button,i)=>{if(i===index)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');button.classList.toggle('complete',i<index);});
  document.querySelector('#step-count').textContent='PASUL '+(index+1)+' DIN 3';
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
    const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(45000)});
    const result=await response.json();if(!response.ok)throw Error(result.error||'Trimiterea a eșuat.');
    showStatus(result.mode==='microsoft'?'Mesajul dumneavoastră a fost trimis!':'Test reușit. Nu s-a trimis niciun email.','success');
    form.reset();validateCurrencies();token='';showStep(0);
  }catch(error){showStatus(error.name==='TimeoutError'?'Serverul nu a răspuns la timp. Verificați primirea mesajului înainte de a retrimite.':error.message);}
  finally{busy=false;token='';if(widgetId!==null&&window.turnstile)window.turnstile.reset(widgetId);updateButtons();}
});
fetch('/api/config',{signal:AbortSignal.timeout(5000)}).then(response=>{if(!response.ok)throw Error();return response.json();}).then(config=>{configurationReady=config.ready;if(config.mode!=='microsoft')sendButton.textContent='Testați trimiterea';updateButtons();if(!configurationReady)showStatus('Formularul este momentan indisponibil. Încercați din nou mai târziu.');}).catch(()=>{showStatus('Formularul nu este disponibil momentan. Reîncărcați pagina sau încercați din nou mai târziu.');});
showStep(0,false);
