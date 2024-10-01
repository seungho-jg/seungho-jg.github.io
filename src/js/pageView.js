// 페이지뷰 가져오기 함수
async function fetchPageviews() {
    const COOLDOWN_TIME = 5 * 60 * 60 * 1000; // 5시간을 밀리초로 변환
    const lastCallTime = localStorage.getItem('lastApiCallTime');
    const currentTime = Date.now();
// 마지막 호출 시간이 없거나, 5시간이 지났으면 API 호출
if (!lastCallTime || (currentTime - parseInt(lastCallTime)) > COOLDOWN_TIME){
    try {
        const response = await fetch('https://workers-visitors.jsh971229.workers.dev/visit');
        if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
        }
        const result = await response.json();
        if (result.status === 'success') {
            const data = result.data;
            updatePageviewDisplay(data.today, data.total);
            // API 호출 시간 저장
            localStorage.setItem('lastApiCallTime', currentTime.toString());
            // 페이지뷰 데이터도 저장
            localStorage.setItem('pageviewData', JSON.stringify(data));
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error fetching pageviews:', error);
        displayError();
    }
} else {
    // 데이터가 있다면
    const storedData = JSON.parse(localStorage.getItem('pageviewData'));
    if (storedData) {
        updatePageviewDisplay(storedData.today, storedData.total);
    } else {
        displayError();
    }
}
}
function updatePageviewDisplay(today, total) {
    document.getElementById('today-views').textContent = today;
    document.getElementById('total-views').textContent = total;
}

function displayError() {
document.getElementById('today-views').textContent = 'Error';
document.getElementById('total-views').textContent = 'Error';
}

// 페이지 로드 시 페이지뷰 가져오기
document.addEventListener('DOMContentLoaded', fetchPageviews);