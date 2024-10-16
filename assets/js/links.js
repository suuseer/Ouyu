document.addEventListener('DOMContentLoaded', function() {
    fetch('https://bankend.suuus.top/links/links-data') // 获取全部数据
        .then(response => response.json())
        .then(data => {
            const updateDisplay = () => {
                // 展示所有
                const displayData = data.sort((a, b) => b.id - a.id);
                const linksLoading = document.getElementById('linksLoading');
                const linksMain = document.getElementById('linksMain');
                if (linksMain) {
                    linksMain.style.display = 'block';
                }
                // 获取容器
                const myfollowsContainer = document.getElementById('myfollows');
                const friendsContainer = document.getElementById('friends');
                if (!myfollowsContainer || !friendsContainer) return;

                // 清空现有内容
                myfollowsContainer.innerHTML = '';
                friendsContainer.innerHTML = '';
                linksLoading.style.display = 'none';
                

                // 生成并添加HTML元素
                displayData.forEach(item => {
                    const fallowArticleHTML =`
                    <div class="card no-copy">
                        <div class="websiteImg">
                            <img src="${item.websiteImg}" alt="${item.title}">
                        </div>
                        <div class="image">
                             <img src="${item.avatar}" alt="${item.title}">
                        </div>
                        <div class="card-info">
                            <span>${item.title}</span>
                            <p>${item.description}</p>
                        </div>
                    <a href="${item.website}" class="button" target="_blank">Go</a>
                    </div>
                    `
                    const linksArticleHTML =`
                    <a href="${item.website}" class="links-card no-copy card" target="_blank">
                        <img src="${item.avatar}" alt="${item.title}">
                        <div class="card-info">
                            <div class="title">${item.title}</div>
                            <div class="description">${item.description}</div>
                        </div>
                    </a>
                    `

                    // 根据 linktype 将内容添加到对应容器
                    if (item.linkType === '我的关注') {
                        myfollowsContainer.innerHTML += fallowArticleHTML;
                        // 添加class
                        myfollowsContainer.classList.add('grid');
                    } else if (item.linkType === '友情链接') {
                        friendsContainer.innerHTML += linksArticleHTML;
                    }
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
