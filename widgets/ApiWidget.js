import {UIComponent} from './UIComponent.js';
export class ApiWidget extends UIComponent {
 constructor(id,title,onRemove,onChange){super(id,title,onRemove,onChange);}
 render(){const card=super.render();this.load();return card;}
 async load(){this.controller?.abort();const controller=new AbortController();this.controller=controller;this.body.replaceChildren();const loading=document.createElement('p');loading.className='muted';loading.textContent='Загрузка данных…';this.body.append(loading);try{const data=await this.fetchData(controller.signal);if(controller.signal.aborted||!this.body)return;this.body.replaceChildren();this.showData(data);}catch(error){if(controller.signal.aborted||!this.body)return;this.body.replaceChildren();const msg=document.createElement('p');msg.className='error';msg.textContent='Не удалось загрузить данные: '+error.message;const retry=document.createElement('button');retry.className='btn small';retry.textContent='Повторить';retry.onclick=()=>this.load();this.body.append(msg,retry);}}
 async getJSON(url,signal){const r=await fetch(url,{signal});if(!r.ok)throw Error('HTTP '+r.status);return r.json();}
}
