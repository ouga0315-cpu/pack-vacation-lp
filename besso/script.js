// 画面下固定の電話ボタン：フッターの電話番号が見えている間は隠す
(function(){
  var fab = document.getElementById('fab');
  var footer = document.querySelector('footer');
  if(!fab || !footer || !('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ fab.classList.add('hidden'); }
      else { fab.classList.remove('hidden'); }
    });
  }, { rootMargin: '0px' });
  obs.observe(footer);
})();
