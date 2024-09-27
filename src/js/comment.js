// 프로필 이미지 배열
const profileImages = [
    '../assets/img/profile/avatar00.png',
    '../assets/img/profile/avatar01.png',
    '../assets/img/profile/avatar02.png',
    '../assets/img/profile/avatar03.png',
    '../assets/img/profile/avatar04.png'
];

let currentProfileIndex = 0;

// 프로필 클릭 이벤트
const profileElement = document.getElementById('profile');
const profileImagesElement = document.getElementById('profile-image');

profileElement.addEventListener('click', ()=>{
    // 인덱스 증가 (5개 이미지를 순회하도록 처리)
    currentProfileIndex = (currentProfileIndex + 1) % profileImages.length;
    profileImagesElement.src = profileImages[currentProfileIndex];
})

const commentsList = document.getElementById('comments');
const nameInput = document.getElementById('name');
const mentInput = document.getElementById('comment');
const submitButton = document.getElementById('submit-comment');
const commentCount = document.getElementById('comment-count');
const likes = document.getElementById('like')
const views = document.getElementById('view')

async function renderComments() {
    const url = new URLSearchParams(window.location.search);
    const postId = url.get('id');
    try {
        const response = await fetch(`https://workers-visitors.jsh971229.workers.dev/visit?id=${postId}`,{method: 'GET'});

        const result = await response.json();

        if (result.status === 'success') {
            const comments = result.data.comment;
            commentsList.innerHTML = '';
            likes.innerText = result.data.like;
            views.innerText = result.data.view;

            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'rounded-lg p-3 border dark:border-slate-400';
                commentElement.innerHTML = `
                    <div class="flex flex-row justify-between items-center">
                        <div class="flex flex-row gap-3 items-center">
                            <img src="${profileImages[comment.avatar]}" class="rounded-full w-8 h-8">
                            <span class="font-semibold">${comment.name}</span>
                            <p class="">${comment.comment}</p>
                        </div>
                        <span class="text-sm text-gray-100">${comment.date}</span>
                    </div>
                `;
        commentsList.appendChild(commentElement);
    });
    commentCount.innerText = comments.length;
        } else {
            console.log('Error get comments:', result.message)
        }
    } catch(error) {
        console.error('Error during get comment:', error)
    }
}
// 댓글 작성
submitButton.addEventListener('click', submitComment);

async function submitComment(){
    const url = new URLSearchParams(window.location.search);
    const postId = url.get('id');
    const commentData = {
        avatar: currentProfileIndex,
        name: nameInput.value.trim(),
        comment: mentInput.value.trim(),
        date: new Date().toISOString().split('T')[0].split('-').join('.').substring(2)
    }
    try {
        const response = await fetch(`https://workers-visitors.jsh971229.workers.dev/submit-comment?id=${postId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            renderComments();
            nameInput.value = '';
            mentInput.value = '';
        } else {
            console.log('Error submitting comment:', data.message)
        }

    } catch(error) {
        console.error('Error during comment submission:', error)
    }
}

// 초기 렌더링
renderComments();