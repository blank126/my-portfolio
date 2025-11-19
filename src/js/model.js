(function (global) {
  class Project {
    constructor(id, title, year, category, desc) {
      this.id = id;
      this.title = title;
      this.year = Number(year);
      this.category = category;
      this.desc = desc || '';
    }
    getSummary() {
      return `${this.title} (${this.year}) - ${this.category}`;
    }
  }

  const projects = [];
  let idCounter = 1;

  function addProject(data) {
    const p = new Project(idCounter++, data.title, data.year, data.category, data.desc);
    projects.push(p);
    return p;
  }

  function removeProject(id) {
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return false;
    projects.splice(idx, 1);
    return true;
  }

  function getProjects() {
    return projects.slice(); // 복사본 반환
  }

  function clearAll() {
    projects.length = 0;
  }

  function seedSample() {
    addProject({ title: '개인 블로그', year: 2024, category: '웹', desc: '정적 사이트 + 배포' });
    addProject({ title: '모바일 앱', year: 2023, category: '앱', desc: '간단한 네이티브 앱' });
  }

  global.Model = {
    Project,
    addProject,
    removeProject,
    getProjects,
    clearAll,
    seedSample
  };
})(window);