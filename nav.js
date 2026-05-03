// Vowite Shared Navigation
(function(){

const styles = `
  .vw-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0.9rem 2rem;display:flex;justify-content:space-between;align-items:center;background:rgba(255,253,247,0.95);backdrop-filter:blur(10px);border-bottom:0.5px solid rgba(201,168,76,0.2);}
  .vw-nav-logo img{height:42px;width:auto;display:block;}
  .vw-nav-links{display:flex;gap:1.75rem;align-items:center;}
  .vw-nav-links a{font-size:13px;color:#5C3D22;text-decoration:none;font-family:'DM Sans',sans-serif;transition:color 0.2s;font-weight:400;}
  .vw-nav-links a:hover{color:#9C7A2E;}
  .vw-nav-cta{background:#2C1A0E!important;color:#FFFDF7!important;padding:8px 20px;border-radius:100px;font-size:13px!important;font-weight:500!important;}
  .vw-nav-cta:hover{background:#9C7A2E!important;}
  .vw-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:none;border:none;}
  .vw-hamburger span{width:22px;height:1.5px;background:#2C1A0E;border-radius:2px;transition:all 0.3s;display:block;}
  .vw-mobile-menu{display:none;position:fixed;top:60px;left:0;right:0;background:rgba(255,253,247,0.99);backdrop-filter:blur(12px);border-bottom:0.5px solid rgba(201,168,76,0.2);padding:0.5rem 2rem 1.25rem;flex-direction:column;z-index:99;box-shadow:0 8px 24px rgba(44,26,14,0.08);}
  .vw-mobile-menu.open{display:flex;}
  .vw-mobile-menu a{font-size:15px;color:#5C3D22;text-decoration:none;padding:13px 0;border-bottom:0.5px solid rgba(201,168,76,0.1);font-family:'DM Sans',sans-serif;transition:color 0.2s;}
  .vw-mobile-menu a:last-child{border:none;}
  .vw-mobile-menu a:hover{color:#9C7A2E;}
  .vw-mob-cta{background:#2C1A0E!important;color:#FFFDF7!important;padding:12px 20px;border-radius:100px;text-align:center;margin-top:10px;font-weight:500!important;border-bottom:none!important;}
  @media(max-width:768px){.vw-nav-links{display:none;}.vw-hamburger{display:flex;}}
`;

const styleEl = document.createElement('style');
styleEl.textContent = styles;
document.head.appendChild(styleEl);

// Open Graph meta tags
const ogTags=[
  {p:'og:title',c:'Vowite — Make it Memorable'},
  {p:'og:description',c:'Create stunning interactive wedding invites with live countdowns, photo galleries, music and RSVP tracking. Share on WhatsApp in seconds. Made for Indian weddings.'},
  {p:'og:image',c:window.location.origin+'/images/temple1.jpg'},
  {p:'og:url',c:window.location.origin},
  {p:'og:type',c:'website'},
  {n:'twitter:card',c:'summary_large_image'},
];
ogTags.forEach(t=>{
  const m=document.createElement('meta');
  if(t.p) m.setAttribute('property',t.p);
  if(t.n) m.setAttribute('name',t.n);
  m.setAttribute('content',t.c);
  document.head.appendChild(m);
});

const fav=document.createElement('link');
fav.rel='icon';fav.type='image/png';fav.href='favicon.png';
document.head.appendChild(fav);

// Detect current page for active link
const path = window.location.pathname;
const isHome = path === '/' || path.endsWith('index.html');
const isThemes = path.includes('sindoor') || path.includes('maangalyam') || path.includes('midnight') || path.includes('gulabi') || path.includes('keerthana');
const isEditor = path.includes('editor');

// Don't inject nav on editor page (it has its own topbar)
if(isEditor) return;

// Theme preview pages get a special white header
const isTheme = path.includes('sindoor') || path.includes('maangalyam') || path.includes('midnight') || path.includes('gulabi') || path.includes('keerthana');
if(isTheme){
  const themeStyles=`
    .vw-theme-bar{position:fixed;top:0;left:0;right:0;z-index:100;height:54px;background:white;border-bottom:0.5px solid rgba(201,168,76,0.2);display:flex;align-items:center;justify-content:space-between;padding:0 2rem;}
    .vw-theme-bar a{text-decoration:none;}
    .vw-theme-back{font-size:13px;color:#5C3D22;display:flex;align-items:center;gap:6px;transition:color 0.2s;}
    .vw-theme-back:hover{color:#9C7A2E;}
    .vw-theme-logo img{height:38px;width:auto;display:block;}
    .vw-theme-cta{background:#2C1A0E;color:#FFFDF7;padding:8px 20px;border-radius:100px;font-size:13px;font-weight:500;transition:all 0.2s;}
    .vw-theme-cta:hover{background:#9C7A2E;}
    .vw-theme-banner{position:fixed;top:54px;left:0;right:0;z-index:99;background:white;border-bottom:0.5px solid rgba(201,168,76,0.2);padding:8px 2rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;}
    .vw-theme-badge{display:flex;align-items:center;gap:8px;font-size:13px;}
    .vw-theme-badge-dot{width:8px;height:8px;border-radius:50%;background:#C9A84C;}
    .vw-theme-price{font-size:13px;color:#5C3D22;}
    .vw-theme-price strong{color:#9C7A2E;font-weight:500;}
    @media(max-width:768px){.vw-theme-bar{padding:0 1rem;}.vw-theme-back span{display:none;}}
  `;
  const s=document.createElement('style');s.textContent=themeStyles;document.head.appendChild(s);

  // Read theme info from existing topbar if present
  const existingTopbar=document.querySelector('.topbar');
  const existingBanner=document.querySelector('.theme-banner');
  const badgeText=existingBanner?existingBanner.querySelector('.theme-badge')?.textContent?.trim():'';
  const priceText=existingBanner?existingBanner.querySelector('.theme-price-tag strong')?.textContent?.trim().replace('₹',''):'';
  const ctaHref=document.querySelector('.topbar-cta')?.getAttribute('href')||'editor.html';

  // Remove old topbar and banner
  if(existingTopbar)existingTopbar.remove();
  if(existingBanner)existingBanner.remove();

  // Inject new clean white header
  const bar=document.createElement('div');
  bar.className='vw-theme-bar';
  bar.innerHTML=`
    <a href="index.html" class="vw-theme-back">← <span>Back to themes</span></a>
    <a class="vw-theme-logo" href="index.html"><img src="${getLogoPath()}logo.png" alt="Vowite"></a>
    <a href="${ctaHref}" class="vw-theme-cta">Use this theme ✦</a>
  `;
  document.body.insertAdjacentElement('afterbegin',bar);

  // Inject banner below header
  if(badgeText||priceText){
    const banner=document.createElement('div');
    banner.className='vw-theme-banner';
    banner.innerHTML=`
      <div class="vw-theme-badge"><div class="vw-theme-badge-dot"></div> ${badgeText}</div>
      <div class="vw-theme-price">From <strong>${priceText?'₹'+priceText:'₹1,999'}</strong> one-time</div>
    `;
    bar.insertAdjacentElement('afterend',banner);
  }

  // Push content down
  document.body.style.paddingTop='';
  return;
}

const navHTML = `
<nav class="vw-nav" id="vwNav">
  <a class="vw-nav-logo" href="index.html">
    <img src="${getLogoPath()}logo.png" alt="Vowite">
  </a>
  <div class="vw-nav-links">
    <a href="index.html#themes">Themes</a>
    <a href="pricing.html">Pricing</a>
    <a href="contact.html">Done for you</a>
    <a href="about.html">About</a>
    <a href="index.html#themes" class="vw-nav-cta">Get started</a>
  </div>
  <button class="vw-hamburger" onclick="vwToggleMenu()" id="vwHamburger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="vw-mobile-menu" id="vwMobileMenu">
  <a href="index.html#themes">Themes</a>
  <a href="pricing.html">Pricing</a>
  <a href="contact.html">Done for you</a>
  <a href="about.html">About</a>
  <a href="index.html#themes" class="vw-mob-cta">Get started ✦</a>
</div>
`;

// Insert nav at top of body
document.body.insertAdjacentHTML('afterbegin', navHTML);

// Add body padding so content doesn't hide under nav
document.body.style.paddingTop = '0';

function getLogoPath(){
  // Figure out relative path to images folder
  const depth = path.split('/').length - 2;
  return depth > 0 ? '../'.repeat(depth) + 'images/' : 'images/';
}

window.vwToggleMenu = function(){
  const m = document.getElementById('vwMobileMenu');
  const h = document.getElementById('vwHamburger');
  m.classList.toggle('open');
  const s = h.querySelectorAll('span');
  if(m.classList.contains('open')){
    s[0].style.transform='rotate(45deg) translate(5px,5px)';
    s[1].style.opacity='0';
    s[2].style.transform='rotate(-45deg) translate(5px,-5px)';
  } else {
    s[0].style.transform='';
    s[1].style.opacity='1';
    s[2].style.transform='';
  }
}

// WhatsApp floating button
const wa=document.createElement('a');
wa.href='https://wa.me/917406777625?text=Hi%20Vowite!%20I%20want%20to%20create%20my%20wedding%20invite.';
wa.target='_blank';
wa.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
wa.style.cssText='position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,211,102,0.4);z-index:999;transition:all 0.2s;';
wa.onmouseover=()=>wa.style.transform='scale(1.1)';
wa.onmouseout=()=>wa.style.transform='scale(1)';
if(document.body) document.body.appendChild(wa);
else window.addEventListener('load',()=>document.body.appendChild(wa));

// Shared footer
const existingFooter=document.querySelector('footer');
if(existingFooter){
  existingFooter.innerHTML=`
    <div style="font-family:'Cormorant Garamond',serif;font-size:22px;color:#FFFDF7;margin-bottom:0.5rem;">
      <img src="${getLogoPath()}logo-white.png" alt="Vowite" style="height:36px;width:auto;opacity:0.9;">
    </div>
    <div style="font-size:12px;color:rgba(255,253,247,0.35);margin-bottom:1.25rem;letter-spacing:0.06em;">MAKE IT MEMORABLE</div>
    <div style="display:flex;gap:1.25rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.25rem;">
      <a href="index.html" style="font-size:13px;color:rgba(255,253,247,0.4);text-decoration:none;">Home</a>
      <a href="index.html#themes" style="font-size:13px;color:rgba(255,253,247,0.4);text-decoration:none;">Themes</a>
      <a href="pricing.html" style="font-size:13px;color:rgba(255,253,247,0.4);text-decoration:none;">Pricing</a>
      <a href="contact.html" style="font-size:13px;color:rgba(255,253,247,0.4);text-decoration:none;">Done for you</a>
      <a href="about.html" style="font-size:13px;color:rgba(255,253,247,0.4);text-decoration:none;">About</a>
      <a href="privacy.html" style="font-size:13px;color:rgba(255,253,247,0.4);text-decoration:none;">Privacy</a>
      <a href="terms.html" style="font-size:13px;color:rgba(255,253,247,0.4);text-decoration:none;">Terms</a>
    </div>
    <div style="font-size:12px;color:rgba(255,253,247,0.2);">© ${new Date().getFullYear()} Vowite. Made with love in India.</div>
  `;
}

// Close menu when clicking a link
document.getElementById('vwMobileMenu').querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{
    document.getElementById('vwMobileMenu').classList.remove('open');
    const s=document.getElementById('vwHamburger').querySelectorAll('span');
    s[0].style.transform='';s[1].style.opacity='1';s[2].style.transform='';
  });
});

})();