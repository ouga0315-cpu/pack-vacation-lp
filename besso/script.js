// 画面下固定の電話ボタン：フッターの電話番号が見えている間は隠す
(function(){
  var fab = document.querySelector('.fab');
  var footer = document.querySelector('footer');
  if(fab && footer && ('IntersectionObserver' in window)){
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ fab.classList.add('hidden'); }
        else { fab.classList.remove('hidden'); }
      });
    }, { rootMargin: '0px' });
    obs.observe(footer);
  }
})();

// ヘッダースクロール影
(function(){
  var head = document.querySelector('.site-head');
  if(!head) return;
  var y = window.scrollY;
  function onScroll(){
    y = window.scrollY;
    if(y > 20){ head.classList.add('scrolled'); }
    else { head.classList.remove('scrolled'); }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });
})();

// セクション reveal
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
