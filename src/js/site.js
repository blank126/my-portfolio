// 공용 사이트 JS: 모바일 메뉴, skill animation, gallery modal, 폼 유효성 (class 사용)
class SkillBar {
  constructor(el) {
    this.el = el;
    this.value = Number(el.dataset.value || 0);
    this.bar = el;
  }
  animate() {
    this.bar.style.width = '0%';
    requestAnimationFrame(() => {
      this.bar.style.width = this.value + '%';
    });
  }
}

class GalleryItem {
  constructor(articleEl) {
    this.el = articleEl;
    this.img = articleEl.querySelector('img');
    this.title = articleEl.querySelector('h3') ? articleEl.querySelector('h3').textContent : '';
    this.meta = articleEl.querySelector('.meta') ? articleEl.querySelector('.meta').textContent : '';
  }
}

(function () {
  // NAV TOGGLE
  const nav = document.querySelector('.main-nav');
  const toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // close menu when clicking a link
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // SKILL ANIMATION: intersection observer
  const skillBars = Array.from(document.querySelectorAll('.progress-bar'));
  if (skillBars.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const barEl = entry.target;
          const s = new SkillBar(barEl);
          s.animate();
          obs.unobserve(barEl);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(b => obs.observe(b));
  }

  // GALLERY: modal
  const grid = document.getElementById('galleryGrid');
  const modal = document.getElementById('modal');
  const modalImg = modal ? modal.querySelector('.modal-img') : null;
  const modalTitle = modal ? modal.querySelector('#modal-title') : null;
  const modalDesc = modal ? modal.querySelector('#modal-desc') : null;
  const modalClose = modal ? modal.querySelector('.modal-close') : null;

  if (grid && modal && modalImg && modalClose) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const img = card.querySelector('img');
      if (!img) return;
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
      const meta = card.querySelector('.meta') ? card.querySelector('.meta').textContent : '';
      modalImg.src = src;
      modalImg.alt = alt;
      modalTitle.textContent = title;
      modalDesc.textContent = meta;
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    function closeModal() {
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
      modalImg.src = '';
      document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  // Gallery filter + search (client-side)
  const searchGallery = document.getElementById('searchGallery');
  const filterGallery = document.getElementById('filterGallery');
  if (grid && (searchGallery || filterGallery)) {
    function filterGalleryItems() {
      const q = searchGallery ? searchGallery.value.trim().toLowerCase() : '';
      const cat = filterGallery ? filterGallery.value : 'all';
      grid.querySelectorAll('.project-card').forEach(card => {
        const text = (card.textContent || '').toLowerCase();
        const matchQ = !q || text.includes(q);
        const matchCat = cat === 'all' || (card.dataset.category === cat);
        card.style.display = (matchQ && matchCat) ? '' : 'none';
      });
    }
    if (searchGallery) searchGallery.addEventListener('input', filterGalleryItems);
    if (filterGallery) filterGallery.addEventListener('change', filterGalleryItems);
  }

  // CONTACT FORM: validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      // fake submit
      alert('메시지가 전송되었습니다. 감사합니다!');
      contactForm.reset();
    });
  }

  // PORTFOLIO page: simple add to table (resumeForm)
  const resumeForm = document.getElementById('resumeForm');
  const tbody = document.getElementById('tbody');
  const clearAllBtn = document.getElementById('clearAll');
  const filterTable = document.getElementById('filter');
  if (resumeForm && tbody) {
    class Item {
      constructor(id, category, period, title, role, desc, link) {
        this.id = id;
        this.category = category;
        this.period = period;
        this.title = title;
        this.role = role;
        this.desc = desc;
        this.link = link;
      }
    }
    const items = JSON.parse(localStorage.getItem('resume_items') || '[]') || [];
    let idSeq = Number(localStorage.getItem('resume_idSeq') || '1');

    function saveStore() {
      localStorage.setItem('resume_items', JSON.stringify(items));
      localStorage.setItem('resume_idSeq', String(idSeq));
    }

    function renderTable(filterVal = 'all') {
      tbody.innerHTML = '';
      const list = items.filter(it => filterVal === 'all' || it.category === filterVal);
      if (!list.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.textContent = '등록된 항목이 없습니다.';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
      }
      list.forEach(it => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${escapeHtml(it.category)}</td>
          <td>${escapeHtml(it.period)}</td>
          <td>${escapeHtml(it.title)}</td>
          <td>${escapeHtml(it.role || '')}</td>
          <td>${escapeHtml(it.desc || '')}</td>
          <td>${it.link ? '<a href="'+escapeHtml(it.link)+'" target="_blank" rel="noopener">링크</a>' : '-'}</td>
          <td><button class="small-btn del" data-id="${it.id}">삭제</button></td>
        `;
        tbody.appendChild(tr);
      });
    }

    function escapeHtml(str) {
      return String(str || '').replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
    }

    // restore
    renderTable();

    resumeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!resumeForm.checkValidity()) { resumeForm.reportValidity(); return; }
      const data = {
        category: resumeForm.category.value,
        period: resumeForm.period.value.trim(),
        title: resumeForm.title.value.trim(),
        role: resumeForm.role.value.trim(),
        desc: resumeForm.desc.value.trim(),
        link: resumeForm.link.value.trim(),
      };
      const it = new Item(idSeq++, data.category, data.period, data.title, data.role, data.desc, data.link);
      items.push(it);
      saveStore();
      renderTable(filterTable ? filterTable.value : 'all');
      resumeForm.reset();
    });

    tbody.addEventListener('click', (e) => {
      const btn = e.target.closest('button.del');
      if (!btn) return;
      const id = Number(btn.dataset.id);
      const idx = items.findIndex(i => i.id === id);
      if (idx === -1) return;
      if (!confirm('정말 삭제하시겠습니까?')) return;
      items.splice(idx, 1);
      saveStore();
      renderTable(filterTable ? filterTable.value : 'all');
    });

    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (!confirm('전체 항목을 삭제하시겠습니까?')) return;
        items.length = 0;
        idSeq = 1;
        saveStore();
        renderTable();
      });
    }

    if (filterTable) filterTable.addEventListener('change', () => renderTable(filterTable.value));
  }

})();