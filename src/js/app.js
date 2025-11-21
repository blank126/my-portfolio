// 이력서 아이템 클래스
class ResumeItem {
    constructor(id, category, period, title, role, desc) {
        this.id = id;
        this.category = category; 
        this.period = period;     
        this.title = title;       
        this.role = role;         
        this.desc = desc;         
    }

    // [필수조건 1-2] 메서드 1개 이상 정의: 요약 정보 반환
    getSummary() {
        return `[${this.category}] ${this.title} - ${this.role}`;
    }
}

// 데이터 저장 배열
let resumeList = [];

// DOM 요소 참조
const form = document.getElementById('resumeForm');
const tbody = document.getElementById('tbody');
const filterSelect = document.getElementById('filter');
const clearBtn = document.getElementById('clearAll');

// [샘플 데이터]
function initSampleData() {
    const sample = new ResumeItem(
        Date.now(), 
        '학력', 
        '2020.03 ~ 2024.02', 
        '한국대학교', 
        '컴퓨터공학 학사', 
        '웹 프로그래밍 및 자료구조 A+ 이수'
    );
    resumeList.push(sample);
    renderTable();
}

// 1. 폼 제출 (추가) 이벤트
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const period = document.getElementById('period').value;
    const title = document.getElementById('title').value;
    const role = document.getElementById('role').value;
    const desc = document.getElementById('desc').value;

    // 유효성 검사: 제목은 2글자 이상
    if(!title || title.length < 2) {
        alert("명칭(조직/학교/자격증명)은 2글자 이상 입력해주세요.");
        return;
    }

    const newItem = new ResumeItem(Date.now(), category, period, title, role, desc);
    
    // 메서드 호출 확인용 로그
    console.log("새 항목 추가됨:", newItem.getSummary()); 

    resumeList.push(newItem);
    renderTable();
    form.reset();
});

// 2. 테이블 렌더링 함수
function renderTable() {
    tbody.innerHTML = '';

    const filterVal = filterSelect.value;
    
    // [가산점] 필터링 기능
    const filtered = resumeList.filter(item => {
        return filterVal === 'all' || item.category === filterVal;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px; color:#888;">등록된 이력이 없습니다.</td></tr>';
        return;
    }

    filtered.forEach(item => {
        const tr = document.createElement('tr');
        
        // 카테고리별 뱃지 스타일 적용
        let badgeClass = 'badge-default';
        if(item.category === '학력') badgeClass = 'badge-edu';
        else if(item.category === '경력') badgeClass = 'badge-work';
        else if(item.category === '프로젝트') badgeClass = 'badge-proj';
        
        // [필수조건 1-4] innerHTML 동적 생성
        tr.innerHTML = `
            <td style="text-align: center;"><span class="badge ${badgeClass}">${item.category}</span></td>
            <td>${item.period}</td>
            <td style="font-weight: bold; color: #2c3e50;">${item.title}</td>
            <td>${item.role}</td>
            <td style="color: #555; font-size: 0.9rem;">${item.desc}</td>
            <td style="text-align: center;">
                <button class="btn-delete" onclick="deleteItem(${item.id})">×</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 3. [필수조건 1-4] 삭제 기능
window.deleteItem = (id) => {
    if(confirm("이 항목을 삭제하시겠습니까?")) {
        resumeList = resumeList.filter(item => item.id !== id);
        renderTable();
    }
};

// 4. 전체 삭제
clearBtn.addEventListener('click', () => {
    if(confirm("모든 이력 정보를 초기화하시겠습니까?")) {
        resumeList = [];
        renderTable();
    }
});

// 5. 필터 변경 이벤트
filterSelect.addEventListener('change', renderTable);

// 초기 데이터 로드
initSampleData();