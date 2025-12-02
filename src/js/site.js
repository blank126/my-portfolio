/* src/js/site.js */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. 네비게이션 & 모바일 메뉴 토글
  const nav = document.querySelector('.main-nav');
  const toggleBtn = document.getElementById('navToggle');
  
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isExpanded = nav.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // 2. 현재 페이지 메뉴 활성화 (Active Link)
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href !== '#' && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // 3. 타이핑 효과 (Hero 섹션)
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const texts = ["Front-end Developer", "UI/UX Enthusiast", "Problem Solver"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentText = texts[textIndex];
      if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // 문장 완성 후 대기 시간
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }


  // 4. 스킬바 애니메이션 (스크롤 감지)
  const skillBars = document.querySelectorAll('.progress-bar');
  if (skillBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const value = bar.getAttribute('data-value');
          bar.style.width = value + '%'; 
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.1 });

    skillBars.forEach(bar => observer.observe(bar));
  }


  // 5. 갤러리 모달 & 필터링 기능
  const galleryGrid = document.getElementById('galleryGrid');
  const modal = document.getElementById('modal');
  
  if (galleryGrid && modal) {
    const modalImg = modal.querySelector('.modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = modal.querySelector('.modal-close');

    // 모달 열기
    galleryGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;

      const img = card.querySelector('img');
      const title = card.querySelector('h3').textContent;
      const meta = card.querySelector('.project-meta').textContent;

      modalImg.src = img.src;
      modalTitle.textContent = title;
      modalDesc.textContent = meta;
      
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    });

    // 모달 닫기 함수
    const closeModal = () => {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
    });

    // 필터링 및 검색 로직
    const filterSelect = document.getElementById('filterGallery');
    const searchInput = document.getElementById('searchGallery');

    const filterItems = () => {
      const filterValue = filterSelect ? filterSelect.value : 'all';
      const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
      const items = galleryGrid.querySelectorAll('.project-card');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        const title = item.querySelector('h3').textContent.toLowerCase();
        
        const matchesCategory = filterValue === 'all' || category === filterValue;
        const matchesSearch = title.includes(searchValue);

        item.style.display = (matchesCategory && matchesSearch) ? 'block' : 'none';
      });
    };

    if (filterSelect) filterSelect.addEventListener('change', filterItems);
    if (searchInput) searchInput.addEventListener('input', filterItems);
  }

  // 6. 폼 유효성 검사
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!contactForm.checkValidity()) {
              contactForm.reportValidity();
              return;
          }
          alert('성공적으로 메시지가 전송되었습니다!');
          contactForm.reset();
      });
  }
});