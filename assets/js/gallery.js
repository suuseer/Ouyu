let columns = [];
let galleryItems = []; // 保存所有数据

// 确定列的数量
function getColumnCount() {
    const width = window.innerWidth;
    if (width < 600) {
        return 1;
    } else if (width < 900) {
        return 2;
    } else if (width < 1200) {
        return 3;
    } else {
        return 4;
    }
}

// 创建列容器
function createColumns() {
    const galleryContainer = document.getElementById("galleryContainer");
    const columnCount = getColumnCount();
    columns = [];

    if (galleryContainer) {
        galleryContainer.innerHTML = ''; // 清空容器

        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'gallery-column'; // 添加类名
            galleryContainer.appendChild(column);
            columns.push({ element: column, height: 0 });
        }
    }
}

createColumns();

function findShortestColumn() {
    return columns.reduce((shortest, column) => column.height < shortest.height ? column : shortest);
}

// 显示图库条目
function displayGalleryItems() {
    if (!galleryItems.length) return;
    createColumns(); // 创建列容器

    galleryItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item';
        itemDiv.innerHTML = `
            <a href="${item.imageUrl}" data-lightbox="gallery">
                <img src="${item.imageUrl}" alt="Gallery Image">
            </a>
            <div class="note">${item.note}</div>
            <div class="time">${item.timestamp}</div>
        `;

        const shortestColumn = findShortestColumn();
        if (shortestColumn) {
            shortestColumn.element.appendChild(itemDiv);
            shortestColumn.height += itemDiv.offsetHeight; // 更新列的高度
        }
    });
}

// 加载图库数据
async function loadGalleryData() {
    try {
        const response = await fetch('https://bankend.suuus.top/gallery/gallery-data');
        if (!response.ok) throw new Error('Failed to load gallery data');
        galleryItems = await response.json();

        // 对条目进行时间降序排序
        galleryItems.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        displayGalleryItems(); // 调用显示条目的函数
    } catch (error) {
        console.error('Error loading gallery data:', error);
    }
}

window.addEventListener('resize', () => {
    try {
        displayGalleryItems();
    } catch (error) {
        console.error('Error displaying gallery items on resize:', error);
    }
});

// 页面加载时，自动加载数据
document.addEventListener('DOMContentLoaded', loadGalleryData);

// 更新主页的小部件
function updateGallery() {
    fetch('https://bankend.suuus.top/gallery/gallery-data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const latestSix = sortedData.slice(0, getContentCount());
            const homeGallery = document.getElementById('homeGallery');

            if (homeGallery) {
                homeGallery.innerHTML = ''; // 清空当前的内容

                latestSix.forEach(item => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'home-gallery-item'; // 可以定义样式
                    galleryItem.innerHTML = `
                        <div class="gallery-item-image card">
                            <a href="${item.imageUrl}" data-lightbox="home-gallery">
                                <img src="${item.imageUrl}" alt="${item.note}">
                            </a>
                        </div>
                        <div class="gallery-item-note">
                            ${item.note}
                        </div>
                    `;
                    homeGallery.appendChild(galleryItem);
                });
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// 调用函数以更新主页小部件
updateGallery();
window.addEventListener('resize', () => {
    try {
        updateGallery();
    } catch (error) {
        console.error('Error updating gallery on resize:', error);
    }
});
