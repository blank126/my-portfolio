// 이력서 아이템 클래스
class ResumeItem {
    constructor(id, category, period, title, role, desc) {
        this.id = id;
        this.category = category; // 학력, 경력, 프로젝트 등
        this.period = period;     // 기간
        this.title = title;       // 학교명, 회사명 등
        this.role = role;         // 전공, 직위 등
        this.desc = desc;         // 상세 설명
    }
}

// 데이터 저장 배열
let resumeList = [];

// DOM 요소 참조
const form = document.getElementById('resumeForm');
const tbody = document.getElementById('tbody');
const filterSelect = document.getElementById('filter');
const clearBtn = document.getElementById('clearAll');

// [샘플 데이터] 처음 실행 시 예시로 하나 추가해둠 (필요 없으면 삭제 가능)
function initSampleData() {
    const sample = new ResumeItem(
        Date.now(), 
        '학력', 
        '2021.03 ~ 2027.02', 
        '대구대학교', 
        '컴퓨터공학 학사(예정)', 
        '웹 프로그래밍 및 자료구조 이수, 졸업 프로젝트 대상 수상(예정)'
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

    // 유효성 검사 (간단 예시)
    if(!title) {
        alert("명칭(소속/자격증명)을 입력해주세요.");
        return;
    }

    const newItem = new ResumeItem(Date.now(), category, period, title, role, desc);
    resumeList.push(newItem); // 최신순 정렬을 원하면 unshift() 사용 가능
    
    renderTable();
    form.reset();
});

// 2. 테이블 렌더링 함수
function renderTable() {
    tbody.innerHTML = '';

    const filterVal = filterSelect.value;
    
    // 필터링
    const filtered = resumeList.filter(item => {
        return filterVal === 'all' || item.category === filterVal;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px; color:#888;">등록된 이력이 없습니다.</td></tr>';
        return;
    }

    filtered.forEach(item => {
        const tr = document.createElement('tr');
        
        // 카테고리에 따른 뱃지 클래스 설정 (CSS에서 색상 다르게 줄 수 있음)
        let badgeClass = 'badge-default';
        if(item.category === '학력') badgeClass = 'badge-edu';
        else if(item.category === '경력') badgeClass = 'badge-work';
        else if(item.category === '프로젝트') badgeClass = 'badge-proj';
        
        tr.innerHTML = `
            <td style="text-align: center;"><span class="badge ${badgeClass}">${item.category}</span></td>
            <td>${item.period}</td>
            <td style="font-weight: bold; color: #2c3e50;">${item.title}</td>
            <td>${item.role}</td>
            <td style="color: #555; font-size: 0.9rem;">${item.desc.replace(/\n/g, '<br>')}</td>
            <td style="text-align: center;">
                <button class="btn-delete" onclick="deleteItem(${item.id})">×</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 3. 삭제 함수 (Global scope로 노출)
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

// 초기화 실행
initSampleData();