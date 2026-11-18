// FAB: フッター or ヒーローが見えている間は隠す
(function(){
  var fab = document.querySelector('.fab');
  if(!fab || !('IntersectionObserver' in window)) return;
  var footer = document.querySelector('footer');
  var hero = document.querySelector('.hero');
  var state = { footer:false, hero:false };
  function update(){
    if(state.footer || state.hero){ fab.classList.add('hidden'); }
    else { fab.classList.remove('hidden'); }
  }
  if(footer){
    new IntersectionObserver(function(es){
      es.forEach(function(e){ state.footer = e.isIntersecting; });
      update();
    }).observe(footer);
  }
  if(hero){
    new IntersectionObserver(function(es){
      es.forEach(function(e){ state.hero = e.intersectionRatio > 0.3; });
      update();
    }, { threshold:[0, 0.3, 0.6] }).observe(hero);
  }
})();

(function(){
  var head = document.querySelector('.site-head');
  if(!head) return;
  function onScroll(){
    if(window.scrollY > 20){ head.classList.add('scrolled'); }
    else { head.classList.remove('scrolled'); }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });
})();

(function(){
  if(!('IntersectionObserver' in window)) return;
  var targets = document.querySelectorAll('section > .wrap, .hero-inner');
  targets.forEach(function(el){ el.classList.add('reveal'); });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold:0.1, rootMargin:'0px 0px -60px 0px' });
  targets.forEach(function(el){ io.observe(el); });
})();
