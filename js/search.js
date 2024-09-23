let posts = [];
let selectedTags = [];
let allTags = [];
let tagsContainer;
let selectedTagsContainer;
let postsContainer;

async function fetchPosts() {
    try {
        const response = await fetch('https://seungho-jg.github.io/posts/metadata.json');
        if (!response.ok) throw new Error('Failed to fetch posts');
        postText = await response.text();
        console.log(postText)
        posts = JSON.parse(postText);
        console.log('posts: ',posts)
        allTags = [...new Set(posts.flatMap(post => post.tags))];
        renderTagButtons();
        filterPosts();
    } catch (error) {
        console.error('Error fetching posts:', error);
        postsContainer.innerHTML = '<p class="text-red-500">Failed to load posts. Please try again later.</p>';
    }
}

function renderTagButtons() {
    tagsContainer.innerHTML = allTags.map(tag =>
        `<button class="px-4 py-2 text-sm bg-stone-400 dark:bg-slate-400 text-white rounded-full hover:bg-indigo-400 dark:hover:bg-indigo-400 focus:outline-none" data-tag="${tag}">#${tag}</button>`
    ).join('');
    
    tagsContainer.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            toggleTag(button.dataset.tag);
            button.classList.toggle('custom-gradient');
        });
    });
}

function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
    } else {
        selectedTags.push(tag);
    }
    filterPosts();
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}

function filterPosts() {
    const postingCounter = document.getElementById('posting-counter');
    const filteredPosts = selectedTags.length === 0
        ? posts
        : posts.filter(post => selectedTags.every(tag => post.tags.includes(tag)));
    
    postingCounter.innerText = `총 ${filteredPosts.length}개의 게시물이 있어요`;
    
    postsContainer.innerHTML = filteredPosts.map(post => `
        <a href="post.html?id=${post.id}&ym=${post.date.substring(0, 4)}${post.date.substring(5, 7)}" >
        <div class="bg-white dark:bg-gray-500 p-4 rounded shadow hover:translate-x-1 transition-transform duration-150">
            <h3 class="text-xl font-semibold">${post.title}</h3>
            <p class="text-gray-500 dark:text-gray-300 text-sm mb-2">${formatDate(post.date)}</p>
            <p class="text-gray-600 dark:text-gray-50 mb-5">${post.subtitle}</p>
            <div class="flex flex-wrap gap-2">
                ${post.tags.map(tag =>
                    `<span class="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm">${tag}</span>`
                ).join('')}
            </div>
        </div>
        </a>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    tagsContainer = document.getElementById('keywords');
    selectedTagsContainer = document.getElementById('selected-keywords');
    postsContainer = document.getElementById('posts');
    fetchPosts();
});