# 🎯 이동규 · 개인 포트폴리오 웹사이트

**대구대학교 컴퓨터공학과** 학생 이동규의 개인 포트폴리오 웹사이트입니다.  
HTML5, CSS3, JavaScript를 활용한 반응형 싱글 페이지 애플리케이션(SPA)으로, 자기소개, 프로젝트, 이력서 등을 동적으로 관리할 수 있습니다.

---

## 📋 목차
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [사용 방법](#사용-방법)
- [브라우저 호환성](#브라우저-호환성)
- [주요 기술 설명](#주요-기술-설명)
- [개선 사항](#개선-사항)

---

## 🚀 주요 기능

### 1️⃣ **다중 페이지 네비게이션**
- `index.html` - 홈 페이지 (Hero 섹션, 핵심 가치)
- `about.html` - 자기소개 (경력, 학력, 기술 스택, 진행 바)
- `portfolio.html` - 포트폴리오 (프로젝트 갤러리, 필터링, 검색, 모달)
- `contact.html` - 연락처 (문의 폼, 이메일 전송 시뮬레이션)

### 2️⃣ **동적 이력 관리 (JavaScript Class 활용)**
- **`ResumeItem` 클래스**: 학력, 경력, 프로젝트 정보 객체화
- **배열 기반 데이터 관리**: `resumeList[]`로 항목 저장
- **CRUD 기능**:
  - ✅ **Create**: 폼 입력 → 새 항목 추가
  - ✅ **Read**: 테이블로 목록 출력
  - ✅ **Update**: 필터링 적용
  - ✅ **Delete**: 항목별 삭제 버튼

### 3️⃣ **사용자 인터랙션**
- 🔤 **타이핑 효과**: Hero 섹션에서 텍스트 타이핑 애니메이션
- 🎨 **스킬바 애니메이션**: 스크롤 감지 후 진행 바 표시
- 🖼️ **갤러리 모달**: 프로젝트 카드 클릭 시 상세 이미지 표시
- 🔍 **프로젝트 필터링 & 검색**: 카테고리별 필터, 제목 검색
- 📱 **모바일 메뉴**: 햄버거 버튼 토글

### 4️⃣ **폼 검증 & 접근성**
- HTML5 입력 유효성: `required`, `type="email"`, `minlength`, `max`, `min`
- 라벨 연결: `<label for="...">` 통일
- 폼 유효성 검사: `form.checkValidity()` 및 `reportValidity()`
- 모달 `aria-hidden` 속성

---

## 🛠 기술 스택

| 카테고리 | 기술 |
|---------|------|
| **마크업** | HTML5 (시맨틱 태그: `header`, `nav`, `main`, `footer`) |
| **스타일링** | CSS3 (Flexbox, Grid, 변수, 미디어쿼리, 애니메이션) |
| **스크립팅** | JavaScript ES6+ (Class, 배열 메서드, DOM API, 비동기) |
| **폰트** | Google Fonts (Inter, Noto Sans KR) |
| **배포** | Live Server / Python http.server |

---

## 📂 프로젝트 구조

```
my-portfolio/
├── src/
│   ├── index.html              # 홈 페이지
│   ├── about.html              # 자기소개
│   ├── portfolio.html          # 포트폴리오 (갤러리)
│   ├── contact.html            # 연락처 (폼)
│   ├── css/
│   │   └── style.css           # 통합 스타일시트
│   ├── js/
│   │   ├── site.js             # 공통 기능 (네비, 모달, 필터링 등)
│   │   ├── app.js              # 이력서 관리 (Class, CRUD)
│   │   └── model.js            # 프로젝트 모델 (선택)
│   └── data/
│       └── projects.json       # 프로젝트 샘플 데이터
├── assets/
│   ├── fonts/                  # 커스텀 폰트
│   └── icons/                  # 아이콘 파일
├── .vscode/
│   └── launch.json             # VS Code 디버그 설정
├── package.json                # Node 프로젝트 설정
├── README.md                   # 이 파일
└── .gitignore                  # Git 무시 파일
```

---

## ⚙️ 설치 및 실행

### 1. **프로젝트 클론/다운로드**
```bash
cd "c:\Users\82102\Desktop\웹프로그래밍 작업물\my-portfolio"
```

### 2. **Live Server로 실행 (권장)**

#### 방법 A: npm 글로벌 설치
```bash
npm install -g live-server
live-server src
```
- 자동으로 `http://localhost:8080` 또는 `http://127.0.0.1:8080` 열림

#### 방법 B: VS Code Extension 사용
- VS Code 확장 마켓플레이스에서 "Live Server" 검색 후 설치
- `src/index.html` 우클릭 → "Open with Live Server"

#### 방법 C: Python 내장 서버
```bash
cd src
python -m http.server 5500
```
- 브라우저: `http://localhost:5500`

### 3. **npm 로컬 설치** (선택)
```bash
cd my-portfolio
npm install
npm start
```

---

## 📖 사용 방법

### 🏠 **홈 페이지 (index.html)**
- Hero 섹션: 인사말 + 타이핑 애니메이션
- 핵심 가치: 3개 카드 (책임감, 소통, 성장)
- 네비게이션: 상단 고정 메뉴 (반응형)

### 👤 **자기소개 (about.html)**
- 경험 요약 (세무사무소, 안동병원, 육군 경험)
- 기술 스택: 3개 항목 (HTML/CSS/JS, React, Git)
  - 스크롤 감지 후 **진행 바 애니메이션**
- 경력/학력 타임라인

### 📁 **포트폴리오 (portfolio.html)**
- **프로젝트 갤러리**: 3개 샘플 프로젝트 카드
- **필터 & 검색**:
  - `<select>` 드롭다운: 전체/Web/App/Data
  - `<input>` 검색창: 프로젝트 제목 검색
- **모달**: 카드 클릭 시 큰 이미지 + 상세 설명
  - ESC 키 또는 배경 클릭으로 닫기
- **호버 효과**: 카드 scale-up, 이미지 zoom

### 📧 **연락처 (contact.html)**
- 폼 입력: 이름, 이메일, 메시지 (모두 필수)
- 유효성 검사: 이메일 형식, 필수 입력
- 제출 시: 알림 메시지 → 폼 초기화

---

## 🌐 브라우저 호환성

| 브라우저 | 버전 | 상태 |
|---------|------|------|
| Chrome | 최신 | ✅ 정상 동작 |
| Edge | 최신 | ✅ 정상 동작 |
| Firefox | 최신 | ✅ 정상 동작 |
| Safari | 최신 | ✅ 정상 동작 |
| 모바일 Chrome | 최신 | ⚠️ 반응형 미디어쿼리 적용 |

**테스트 결과**:
- ✅ Windows 10/11 · Chrome 126, Edge 124
- ✅ 모바일 반응형 화면 (768px, 375px)
- ⚠️ 일부 구형 브라우저(IE 11)에서는 미지원

---

## 🔧 주요 기술 설명

### 1. **JavaScript Class (ES6)**

#### ResumeItem 클래스
```javascript
class ResumeItem {
    constructor(id, category, period, title, role, desc) {
        this.id = id;
        this.category = category;
        this.period = period;
        this.title = title;
        this.role = role;
        this.desc = desc;
    }
    
    // 메서드: 요약 정보 반환
    getSummary() {
        return `[${this.category}] ${this.title} - ${this.role}`;
    }
}
```

**사용 예시**:
```javascript
const newItem = new ResumeItem(
    Date.now(),
    '학력',
    '2021.03 ~ 2027.02',
    '대구대학교',
    '컴퓨터공학 학사',
    '웹 프로그래밍'
);
resumeList.push(newItem);
```

### 2. **DOM 조작 (생성, 추가, 제거)**

```javascript
// 동적 테이블 행 생성
const tr = document.createElement('tr');
tr.innerHTML = `
    <td>${item.category}</td>
    <td>${item.title}</td>
    <td><button onclick="deleteItem(${item.id})">×</button></td>
`;
tbody.appendChild(tr);

// 삭제: 배열 + DOM 동시 제거
window.deleteItem = (id) => {
    resumeList = resumeList.filter(item => item.id !== id);
    renderTable();
};
```

### 3. **CSS3 주요 효과**

| 효과 | 위치 | 코드 |
|------|------|------|
| **box-shadow** | 카드 호버 | `box-shadow: 0 10px 15px rgba(0,0,0,0.1)` |
| **border-radius** | 버튼, 입력 필드 | `border-radius: 50px` (버튼), `8px` (입력) |
| **transition** | 전체 상호작용 | `transition: all 0.2s ease` |
| **Flexbox** | 레이아웃 | 헤더, 네비, 카드 정렬 |
| **Grid** | 갤러리 | `grid-template-columns: repeat(3, 1fr)` |
| **animation** | 타이핑, 스킬바 | `@keyframes blink`, `pulse` |
| **media query** | 반응형 | `@media (max-width: 767px)` |

---

## 📱 반응형 디자인

### 화면 크기별 레이아웃

| 디바이스 | 너비 | 변화 |
|---------|------|------|
| **PC** | 1024px + | 3열 그리드, 전체 메뉴 표시 |
| **태블릿** | 768px ~ 1023px | 2열 그리드 |
| **모바일** | ~ 767px | 1열 그리드, 햄버거 메뉴 |

**CSS 적용**:
```css
@media (max-width: 767px) {
    .nav-toggle { display: block; }
    .grid-cards { grid-template-columns: 1fr; }
}
```

---

## 📊 데이터 구조 (app.js)

### 배열 관리
```javascript
let resumeList = [];  // 전역 배열

// 샘플 데이터 초기화
function initSampleData() {
    const sample = new ResumeItem(...);
    resumeList.push(sample);
    renderTable();
}

// 필터링 (forEach 대체 filter 사용)
const filtered = resumeList.filter(item => {
    return filterVal === 'all' || item.category === filterVal;
});
```

---

## 🎬 동작 흐름

### 이력 추가 프로세스
```
1. 사용자 폼 입력
   ↓
2. "등록" 버튼 클릭
   ↓
3. 폼 유효성 검사 (checkValidity)
   ↓
4. new ResumeItem(...) 객체 생성
   ↓
5. resumeList.push(newItem)
   ↓
6. renderTable() 호출 → DOM 업데이트
   ↓
7. 폼 초기화 (form.reset())
```

### 필터링 프로세스
```
1. <select> 또는 <input> 변경
   ↓
2. filterItems() 또는 filterGallery 이벤트
   ↓
3. 배열 순회 (forEach)
   ↓
4. 카테고리/검색어 조건 확인
   ↓
5. item.style.display = 'block' or 'none'
```

---

## 🐛 주요 개발 고려사항

### 1. **접근성 (Accessibility)**
- ✅ 모든 `<input>`에 `<label>` 연결
- ✅ 폼 필드에 `required`, `aria-describedby` (선택)
- ✅ 모달에 `aria-hidden` 속성
- ⚠️ 추가 필요: 화면 리더용 aria-live 영역

### 2. **성능**
- ✅ 외부 라이브러리 최소화 (순수 JS)
- ✅ IntersectionObserver로 스킬바 애니메이션 최적화
- ⚠️ 이미지 최적화 필요 (WebP, 지연 로딩)

### 3. **보안**
- ✅ 폼 입력 유효성 검사
- ⚠️ 서버 연동 시 XSS 방지 필요
- ⚠️ CSRF 토큰 추가 권장

---

## ✨ 개선 사항

### 🔄 단기 개선
- [ ] 실제 이메일 서버 연동 (예: EmailJS)
- [ ] 로컬스토리지로 데이터 영구 저장
- [ ] 이미지 압축 & CDN 배포
- [ ] 다크 모드 toggle

### 🚀 중기 개선
- [ ] React 또는 Vue로 마이그레이션
- [ ] GitHub Pages 배포
- [ ] PWA 지원 (오프라인 모드)
- [ ] 다국어 지원 (i18n)

### 💎 장기 개선
- [ ] 백엔드 연동 (Node.js, Express)
- [ ] 데이터베이스 (MongoDB, PostgreSQL)
- [ ] 사용자 인증 (JWT)
- [ ] 블로그/포스트 기능 추가

---

## 📞 연락처

- **이메일**: donggyu488@gmail.com
- **GitHub**: https://github.com/repos?q=owner%3A%40me
- **대학**: 대구대학교 컴퓨터공학과

---

## 📄 라이선스

이 프로젝트는 **MIT License** 하에 배포됩니다.

```
© 2025 이동규 · All rights reserved.
```

---

## 🙏 감사의 말

- Google Fonts (Inter, Noto Sans KR)
- Unsplash (플레이스홀더 이미지)
- VS Code 커뮤니티

---

**마지막 업데이트**: 2025년 1월