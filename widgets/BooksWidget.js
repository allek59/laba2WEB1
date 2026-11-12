import {ApiWidget} from './ApiWidget.js';
export class BooksWidget extends ApiWidget {
 constructor(id,remove,change){super(id,'📚 Сказания и фольклор · Open Library',remove,change);}
 async fetchData(signal){const data=await this.getJSON('https://openlibrary.org/search.json?q='+encodeURIComponent('Baba Yaga')+'&limit=5&fields=key,title,author_name,first_publish_year',signal);if(!Array.isArray(data.docs))throw Error('Неожиданный формат ответа');return data.docs;}
 showData(docs){if(!docs.length){this.body.textContent='Книги не найдены';return;}for(const book of docs){const item=document.createElement('div');item.className='api-entry';const a=document.createElement('a');a.textContent=book.title||'Без названия';a.href='https://openlibrary.org'+(book.key||'');a.target='_blank';a.rel='noopener noreferrer';const small=document.createElement('small');small.textContent=[(book.author_name||[]).slice(0,2).join(', '),book.first_publish_year].filter(Boolean).join(' · ');item.append(a,small);this.body.append(item);}const source=document.createElement('small');source.className='muted';source.textContent='Источник: Open Library · живой запрос';this.body.append(source);}
}
