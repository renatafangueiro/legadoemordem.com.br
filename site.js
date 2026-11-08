/* Legado em Ordem · scripts comuns a todas as páginas */
(function(){
  var nav=document.getElementById('nav');
  function rolagem(){nav.classList.toggle('rolou',window.scrollY>8);}
  window.addEventListener('scroll',rolagem,{passive:true});rolagem();

  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    rv.forEach(function(el,i){el.style.transitionDelay=(el.closest('.bento,.artigos')?((i%3)*70):0)+'ms';io.observe(el);});
    var links=document.querySelectorAll('.link[href^="#"]');
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.setAttribute('aria-current',l.getAttribute('href')==='#'+e.target.id?'true':'false');});}});},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var s=document.getElementById(l.getAttribute('href').slice(1));if(s)so.observe(s);});
  }else{rv.forEach(function(el){el.classList.add('on');});}

  document.querySelectorAll('.menu-m nav a').forEach(function(a){a.addEventListener('click',function(){a.closest('details').removeAttribute('open');});});

  var dlg=document.getElementById('politica');
  document.querySelectorAll('[data-politica]').forEach(function(b){b.addEventListener('click',function(){if(dlg.showModal){dlg.showModal();}else{dlg.setAttribute('open','');}});});

  document.querySelectorAll('[data-whatsapp],[data-checkout]').forEach(function(a){if(a.getAttribute('href')==='#'){a.addEventListener('click',function(e){e.preventDefault();});}});

  /* depoimentos: passam sozinhos a cada 6 s; param com o mouse em cima, com o foco ou se o visitante preferir menos movimento */
  var trilho=document.getElementById('depo-trilho'),pontos=document.getElementById('depo-pontos');
  if(trilho&&pontos){
    var itens=trilho.children,atual=0,pausa=false,calmo=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    function ir(i){atual=(i+itens.length)%itens.length;trilho.scrollTo({left:itens[atual].offsetLeft-trilho.offsetLeft,behavior:calmo?'auto':'smooth'});marcar();}
    function marcar(){[].forEach.call(pontos.children,function(b,i){b.setAttribute('aria-current',i===atual?'true':'false');});}
    [].forEach.call(itens,function(_,i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Depoimento '+(i+1));b.addEventListener('click',function(){ir(i);});pontos.appendChild(b);});
    marcar();
    trilho.addEventListener('scroll',function(){var i=Math.round(trilho.scrollLeft/trilho.clientWidth);if(i!==atual&&itens[i]){atual=i;marcar();}},{passive:true});
    ['mouseenter','focusin','touchstart'].forEach(function(t){trilho.addEventListener(t,function(){pausa=true;},{passive:true});});
    ['mouseleave','focusout'].forEach(function(t){trilho.addEventListener(t,function(){pausa=false;});});
    if(!calmo&&itens.length>1){setInterval(function(){if(!pausa&&!document.hidden){ir(atual+1);}},6000);}
  }
})();

/* Google Ads: preencher os dois valores abaixo com os códigos gerados na conta do Google Ads.
   Enquanto ADS_ID estiver vazio, nada é carregado e o aviso de cookies não aparece.
   Modo de consentimento: a tag carrega sempre, mas sem cookies até o visitante clicar em "Aceitar".
   Sem aceite, o Google recebe só sinais sem cookies e estima as conversões desses visitantes. */
(function(){
  var ADS_ID = 'AW-18546807906';         // ex.: 'AW-123456789'
  var ADS_LABEL = 'EJd6CJfOoq8dEOKo54tF'; // rótulo da conversão "Clique WhatsApp", ex.: 'AbCdEfGhIjK'
  if(!ADS_ID) return;
  var CHAVE='lo-cookies', aviso=document.getElementById('cookies');
  var NEGADO={ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'};
  var LIBERADO={ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'};
  function ler(){try{return localStorage.getItem(CHAVE);}catch(e){return null;}}
  function gravar(v){try{localStorage.setItem(CHAVE,v);}catch(e){}}
  var escolha=ler();
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){dataLayer.push(arguments);};
  gtag('consent','default',escolha==='aceito'?LIBERADO:NEGADO);
  gtag('js',new Date());gtag('config',ADS_ID);
  var sc=document.createElement('script');sc.async=true;
  sc.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ADS_ID);
  document.head.appendChild(sc);
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="https://wa.me"]');
    if(a&&ADS_LABEL){gtag('event','conversion',{'send_to':ADS_ID+'/'+ADS_LABEL,'transport_type':'beacon'});}
  });
  if(escolha!=='aceito'&&escolha!=='recusado'){aviso.hidden=false;}
  aviso.querySelectorAll('[data-cookies]').forEach(function(b){
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-cookies');gravar(v);aviso.hidden=true;
      gtag('consent','update',v==='aceito'?LIBERADO:NEGADO);
    });
  });
})();
