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

// scene-grid 画像クリックでライトボックス
(function(){
  var imgs = document.querySelectorAll('.scene-grid img');
  if(!imgs.length) return;
  imgs.forEach(function(img){
    img.addEventListener('click', function(){
      var lb = document.createElement('div');
      lb.className = 'lb';
      var full = document.createElement('img');
      full.src = img.src;
      full.alt = img.alt || '';
      var cap = document.createElement('div');
      cap.className = 'lb-cap';
      cap.textContent = img.alt || '';
      var close = document.createElement('button');
      close.className = 'lb-close';
      close.setAttribute('aria-label','閉じる');
      close.textContent = '×';
      lb.appendChild(full);
      lb.appendChild(cap);
      lb.appendChild(close);
      function dismiss(){ lb.remove(); document.removeEventListener('keydown', onEsc); }
      function onEsc(e){ if(e.key === 'Escape') dismiss(); }
      lb.addEventListener('click', dismiss);
      document.addEventListener('keydown', onEsc);
      document.body.appendChild(lb);
    });
  });
})();
