// 가짜 데이터 (날짜 추가)
const posts = [
    { id: 1, title: "파이썬 기초", content: "파이썬의 기본 문법에 대해 알아봅시다.", keywords: ["파이썬", "프로그래밍"], date: "2023-09-15" },
    { id: 2, title: "JavaScript 입문", content: "JavaScript의 기초를 배워봅시다.", keywords: ["JavaScript", "웹개발"], date: "2023-09-18" },
    { id: 3, title: "알고리즘 기초", content: "기본적인 정렬 알고리즘에 대해 알아봅시다.", keywords: ["알고리즘", "파이썬"], date: "2023-09-20" },
    { id: 4, title: "리액트 컴포넌트", content: "리액트 컴포넌트의 생명주기에 대해 알아봅시다.", keywords: ["React", "웹개발"], date: "2023-09-22" },
    { id: 5, title: "데이터 구조", content: "기본적인 데이터 구조에 대해 알아봅시다.", keywords: ["알고리즘", "자료구조"], date: "2023-09-25" },
  ];
  
  // 모든 키워드 추출
  const allKeywords = [...new Set(posts.flatMap(post => post.keywords))];
  
  // 선택된 키워드 배열
  let selectedKeywords = [];
  
  // DOM 요소
  const keywordsContainer = document.getElementById('keywords');
  const selectedKeywordsContainer = document.getElementById('selected-keywords');
  const postsContainer = document.getElementById('posts');
  
  // 키워드 버튼 렌더링
  function renderKeywordButtons() {
    keywordsContainer.innerHTML = allKeywords.map(keyword => 
      `<button class="px-4 py-2 text-sm bg-slate-400 text-white rounded-full hover:bg-indigo-600 focus:outline-none" data-keyword="${keyword}">#${keyword}</button>`
    ).join('');
  
    // 키워드 버튼에 이벤트 리스너 추가
    keywordsContainer.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        toggleKeyword(button.dataset.keyword);
        button.classList.toggle('custom-gradient')
      });
    });
  }
  
  // 키워드 토글
  function toggleKeyword(keyword) {
    if (selectedKeywords.includes(keyword)) {
      selectedKeywords = selectedKeywords.filter(k => k !== keyword);
    } else {
      selectedKeywords.push(keyword);
    }
    filterPosts();
  }
  // 날짜 포맷팅 함수
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  }
  
  // 포스트 필터링 및 렌더링
  function filterPosts() {
    const postingCounter = document.getElementById('posting-counter')
    const filteredPosts = selectedKeywords.length === 0 
    ? posts 
    : posts.filter(post => selectedKeywords.every(keyword => post.keywords.includes(keyword)));
    postingCounter.innerText =`총 ${filteredPosts.length}개의 게시물이 있어요`
    postsContainer.innerHTML = filteredPosts.map(post => `
        <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 class="text-xl font-semibold">${post.title}</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-2">${formatDate(post.date)}</p>
        <p class="text-gray-600 dark:text-gray-300 mb-5">${post.content}</p>
        <div class="flex flex-wrap gap-2">
            ${post.keywords.map(keyword => 
              `<span class="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm">${keyword}</span>`
            ).join('')}
          </div>
        </div>
      `).join('');
  }
  
  // 초기 렌더링
  renderKeywordButtons();
  filterPosts();