/**
 * shared-header.js — Single source of truth for the site header.
 *
 * Usage: add <div id="shared-header-mount"></div> where the <header> used to be,
 * then include <script src="/js/shared-header.js"></script> (before page-auth.js / main.js).
 *
 * The script auto-highlights the current page's nav button.
 * The user-dropdown pill is still injected separately by main.js or page-auth.js.
 */
(function () {
    'use strict';

    /* ── Nav items ──────────────────────────────────────────────────────── */
    var NAV = [
        {
            href: '/dashboard',
            label: 'Home',
            title: 'Dashboard home',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5"/>'
        },
        {
            href: '/study',
            label: 'Study',
            title: 'Open study room',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>'
        },
        {
            href: '/holidays',
            label: 'Holidays',
            title: 'Jewish holidays',
            icon: '<rect x="3" y="5" width="18" height="16" rx="2" ry="2" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 3v4M8 3v4M3 11h18"/>'
        },
        {
            href: '/prayers',
            label: 'Prayers',
            title: 'Important prayers',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3l2.4 4.9L20 9l-4 3.9.9 5.6L12 16l-4.9 2.5.9-5.6L4 9l5.6-1.1L12 3z"/>'
        },
        {
            href: '/songs',
            label: 'Songs',
            title: 'Songs and poems',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-2v13"/><circle cx="6" cy="18" r="3" stroke-width="2"/><circle cx="18" cy="16" r="3" stroke-width="2"/>'
        },
        {
            href: '/about',
            label: 'About',
            title: 'About this project',
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
        }
    ];

    /* ── Detect active page ─────────────────────────────────────────────── */
    var path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/dashboard';

    function isActive(navHref) {
        var clean = navHref.replace(/\/$/, '');
        // Exact match
        if (path === clean) return true;
        // Sub-page match (e.g. /holidays/purim → /holidays is active)
        if (clean !== '/dashboard' && path.indexOf(clean + '/') === 0) return true;
        // Holiday individual pages at root level (e.g. /rosh-hashanah, /hanukkah)
        var holidaySlugs = ['rosh-hashanah', 'yom-kippur', 'sukkot', 'hanukkah', 'tu-bishvat',
            'purim', 'passover', 'shavuot', 'lag-baomer', 'yom-hazikaron', 'yom-haatzmaut'];
        if (clean === '/holidays') {
            var slug = path.split('/')[1];
            if (holidaySlugs.indexOf(slug) !== -1) return true;
        }
        return false;
    }

    /* ── Build nav buttons HTML ─────────────────────────────────────────── */
    var navHTML = NAV.map(function (item) {
        var active = isActive(item.href);
        var cls = active ? 'header-btn header-btn-primary' : 'header-btn header-btn-secondary';
        var aria = active ? ' aria-current="page"' : '';
        var id = item.href === '/study' ? ' id="go-to-weekly"' : '';
        return '<a' + id + ' href="' + item.href + '" class="' + cls + '" title="' + item.title + '"' + aria + '>' +
            '<svg class="header-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + item.icon + '</svg>' +
            '<span class="header-btn-text">' + item.label + '</span>' +
            '</a>';
    }).join('\n                    ');

    /* ── Full header HTML ───────────────────────────────────────────────── */
    var headerHTML =
        '<header class="header-main relative z-30" style="background:linear-gradient(135deg,#0c1a3e 0%,#16285e 45%,#1e3a8a 100%)">' +
        '  <div class="header-container">' +
        '    <div class="header-branding-section">' +
        '      <a id="home-branding" href="/dashboard" aria-label="Go to dashboard home" class="header-branding-button" style="text-decoration:none">' +
        '        <div class="header-text">' +
        '          <h1 class="header-title">A Letter in the Scroll</h1>' +
        '          <p class="header-subtitle">Interactive Weekly Portion Study &amp; Discussion</p>' +
        '        </div>' +
        '      </a>' +
        '    </div>' +
        '    <div class="header-actions-wrapper">' +
        '      <div id="header-actions" class="header-actions">' +
        '        ' + navHTML +
        '        <!-- User dropdown injected by main.js / page-auth.js -->' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</header>';

    /* ── Mount ──────────────────────────────────────────────────────────── */
    var mount = document.getElementById('shared-header-mount');
    if (mount) {
        mount.outerHTML = headerHTML;
    }
})();
