document.addEventListener('DOMContentLoaded', function() {
    const url = new URLSearchParams(window.location.search);
    const postId = url.get('id');
    const yearMonth = url.get('ym');
    
    fetchAndRenderPost(postId, yearMonth);
});

async function fetchAndRenderPost(postId, yearMonth) {
    try {
        const response = await fetch(`https://seungho-jg.github.io/posts/${yearMonth}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();

        const currentPostIndex = posts.findIndex(p => p.id === postId);
        if (currentPostIndex === -1) {
            throw new Error('Post not found');
        }

        const post = posts[currentPostIndex];
        
        // 현재 포스트 렌더링
        renderCurrentPost(post);

        // 네비게이션 포스트 렌더링
        renderNavigationPosts(posts, currentPostIndex);
    } catch (error) {
        console.error('Error fetching or processing post:', error);
        document.getElementById('post-content').textContent = 'Error loading post content: ' + error.message;
    }
}

function renderCurrentPost(post) {
    document.title = `post | ${post.title}`;
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-subtitle').textContent = post.subtitle;
    document.getElementById('post-date').textContent = new Date(post.date).toLocaleDateString();
    document.getElementById('post-tags').innerHTML = post.tags.map(tag => 
        `<span class="inline-block bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">#${tag}</span>`
    ).join('');

    if (post.content) {
        if (typeof SimpleMDE !== 'undefined') {
            const renderedHTML = SimpleMDE.prototype.markdown(post.content);
            document.getElementById('post-content').innerHTML = renderedHTML;
        } else {
            console.error('SimpleMDE is not available');
            document.getElementById('post-content').textContent = post.content;
        }
    } else {
        console.error('Post content is empty');
        document.getElementById('post-content').textContent = 'Content not available';
    }
}

function renderNavigationPosts(posts, currentIndex) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    const start = Math.max(0, Math.min(currentIndex - 2, posts.length - 5));
    const end = Math.min(posts.length, start + 5);
    const emoji = ['🍔', '🍕', '🍗', '🍰', '🍭', '🌭'];
    // 랜덤 이모지를 선택하는 부분 수정
    const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];

    for (let i = start; i < end; i++) {
        const post = posts[i];
        const postElement = document.createElement('div');
        postElement.className = 'w-full mb-1';
        postElement.innerHTML = `
            <a href="?id=${post.id}&ym=${post.date.substring(0, 4)}${post.date.substring(5, 7)}" class="block bg-white dark:bg-gray-600 rounded-sm overflow-hidden shadow-sm hover:translate-x-1 transition-transform duration-150">
                <div class="px-4 py-2">
                    <h3 class="text-lg font-semibold mb-2 ${i === currentIndex ? 'animate-pulse' : ''}">${i === currentIndex ? randomEmoji + '  ' : ''}${post.title}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${new Date(post.date).toLocaleDateString()}</p>
                </div>
            </a>
        `;
        postList.appendChild(postElement);
    }
}