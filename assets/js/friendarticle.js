document.addEventListener('DOMContentLoaded', function() {
    fetch('https://bankend.suuus.top/links/rss-data') // 获取全部数据
        .then(response => response.json())
        .then(data => {
            const updateDisplay = () => {
                const screenWidth = window.innerWidth; // 获取当前屏幕宽度
                let displayCount;

                // 根据屏幕宽度确定展示数据的数量
                if (screenWidth < 768) { // 假设小于768px为手机端
                    displayCount = 6;
                } else {
                    displayCount = 15; // 桌面端
                }

                // 截取需要展示的数据数量
                const displayData = data.slice(0, displayCount);

                const container = document.getElementById('friendsArticle');
                if (!container) { return; }
                container.innerHTML = ''; // 清空现有内容

                // 生成并添加HTML元素
                displayData.forEach(item => {
                    const articleHTML = `
                    <div class="friend-article-container">
                        <a href="${item.link}" target="_blank">
                            <img src="${item.avatar}" alt="${item.title}" style="width:30px; height:30px; border-radius:50%;">
                            <span>
                                <div class="friend-article-title-text">${item.title}</div>
                                <div class="friend-article-time">${new Date(item.pubDate).toLocaleDateString()}</div>
                            </span>
                        </a>
                    </div>
                    `;
                    container.innerHTML += articleHTML;
                });
            };

            // 初始显示
            updateDisplay();

            // 添加窗口大小变化事件监听
            window.addEventListener('resize', updateDisplay);
        })
        .catch(error => {
            console.error('Error fetching RSS data:', error);
        });
});
