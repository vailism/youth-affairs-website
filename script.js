(function(){
  'use strict';

  window.addEventListener('load', function(){
    setTimeout(function(){
      document.getElementById('preloader').classList.add('done');
    }, 1800);
  });

  var dot = document.getElementById('curDot');
  var ring = document.getElementById('curRing');
  var mx = -100, my = -100, rx = -100, ry = -100;

  if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    document.addEventListener('mousemove', function(e){
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    (function animateRing(){
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    var hovers = document.querySelectorAll('a, button, .btn, .event-card, .founder-card, .principle-card, .contact-card, .detail-card, .gallery-grid figure');
    hovers.forEach(function(el){
      el.addEventListener('mouseenter', function(){
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      });
      el.addEventListener('mouseleave', function(){
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      });
    });
  } else {
    dot.style.display = 'none';
    ring.style.display = 'none';
  }

  var progressBar = document.getElementById('scrollProgress');
  function updateProgress(){
    var scrollTop = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if(docHeight > 0){
      progressBar.style.transform = 'scaleX(' + (scrollTop / docHeight) + ')';
    }
  }

  var nav = document.getElementById('mainNav');
  var backTop = document.getElementById('backTop');
  function onScroll(){
    var y = window.scrollY || window.pageYOffset;
    if(y > 80) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    if(y > 600) backTop.classList.add('visible'); else backTop.classList.remove('visible');
    updateProgress();
  }
  window.addEventListener('scroll', function(){ requestAnimationFrame(onScroll); });
  onScroll();

  var hamburger = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', function(){
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  var animEls = document.querySelectorAll('.anim, .anim-left, .anim-right, .line-mask');
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
  animEls.forEach(function(el){ revealObserver.observe(el); });

  var counters = document.querySelectorAll('[data-count]');
  var counterObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'));
        var duration = 2200;
        var start = performance.now();
        function tick(now){
          var elapsed = now - start;
          var p = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(2, -12 * p);
          el.textContent = Math.floor(eased * target);
          if(p < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(function(c){ counterObs.observe(c); });

  if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
    var magnetics = document.querySelectorAll('.btn-magnetic');
    magnetics.forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.22) + 'px,' + (y * 0.22) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){
        btn.style.transform = '';
      });
    });
  }

  var parallaxImgs = document.querySelectorAll('.parallax-img');
  function updateParallax(){
    parallaxImgs.forEach(function(img){
      var r = img.parentElement.getBoundingClientRect();
      var center = r.top + r.height / 2;
      var viewCenter = window.innerHeight / 2;
      var offset = (center - viewCenter) / window.innerHeight;
      img.style.transform = 'scale(1.12) translateY(' + (offset * -22) + 'px)';
    });
  }
  window.addEventListener('scroll', function(){ requestAnimationFrame(updateParallax); });
  updateParallax();

  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');
  var activeObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.getAttribute('id');
        navAnchors.forEach(function(a){
          a.classList.remove('active');
          if(a.getAttribute('href') === '#' + id) a.classList.add('active');
        });
      }
    });
  }, { threshold: 0.25, rootMargin: '-80px 0px -50% 0px' });
  sections.forEach(function(s){ activeObs.observe(s); });

})();
