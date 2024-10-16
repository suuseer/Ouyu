// 获取 URL 参数的方法
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 修改 loadVaultData 函数，使其根据 URL 参数设置默认选中项和加载内容
async function loadVaultData() {
    const response = await fetch("https://backend.morick66.com/vault/vault-data");
    vaultItems = await response.json(); // 存储数据到全局变量
  
    // 从 URL 获取 'type' 参数
    const type = getQueryParameter('type') || "book"; // 默认"book"

    // 设置对应的单选按钮为选中状态
    const radioInput = document.querySelector(`input[type="radio"][value="${type}"]`);
    if (radioInput) {
        radioInput.checked = true;
        filterVaultItems(type); // 根据获取到的类型来过滤项目
    }
}
// 生成星星的HTML
function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<span class="star filled">★</span>'; // 实心星星
        } else {
            starsHtml += '<span class="star">☆</span>'; // 空心星星
        }
    }
    return starsHtml;
}
function getGameSVG(category) {
    let logo = ''
    switch (category) {
        case "Switch":
            logo = '<svg t="1726638968220" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4313" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M255.69989 67c-89.2 16-161 82-183.6 168.8C63.89989 267.2 63.29989 285.6 64.29989 528.8 64.69989 752 64.89989 757.2 68.69989 774.6c20.6 93 86.6 159.2 180.6 181 12.2 2.8 27.8 3.4 128.2 3.8 103.8 0.8 114.6 0.6 117.4-2.2 2.8-2.8 3-38.6 3-444.4 0-301-0.6-442.6-1.8-445.2-1.8-3.4-5-3.6-113.8-3.4-88.4 0.2-115 0.8-126.6 2.8z m167.8 445.2V888l-75.6-1c-69.6-0.8-77-1.2-91-4.6-59.8-15.4-104-61.4-116.6-121.4-4-18.8-4-480.2-0.2-498.6 11.2-52.2 47.4-95.4 96-114.8 24.4-9.8 35.8-11 115.2-11.2l71.8-0.2v376z m-151.8-262.4c-11.6 2.2-29.4 11.2-39 19.4-19.4 16.8-29.2 40.8-27.6 69 0.8 14.6 1.6 18.6 7.6 30.4 8.8 18 21.8 31.2 39.8 40 12.4 6.2 15.6 6.8 31.8 7.4 14.6 0.6 19.8 0 29.6-3.4 40.2-13.6 64.6-52.6 57.6-92.8-7.8-47.4-53.2-79.4-99.8-70z m316.4-184.6c-0.8 0.6-1.2 201.6-1.2 447 0 404.6 0.2 445.6 3 446.8 5 1.8 149 1.2 166.8-0.8 75.4-8.6 142-54.4 178-122.4 4.6-8.8 10.8-23.4 14-32.4 11.6-34.8 11.4-25.6 11.4-292.2 0-212.8-0.4-244.6-3-258-18.4-96.6-92.2-169.6-189-186.2-13-2.2-33-2.8-97.6-2.8-44.8-0.2-81.8 0.4-82.4 1z m198.2 404.2c29 7.6 52.6 29.6 62.4 57.8 6.2 17.4 6 43-0.2 59-11.4 29.4-33.6 50-62.2 57.6-46.4 12-95.8-16-109.2-62-4-14-3.8-37.8 0.8-52.4 13.8-45.4 62-72.2 108.4-60z" fill="" p-id="4314"></path></svg>'
            break;
        case "Steam":
            logo = '<svg t="1726638978420" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5329" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M511.104 0C242.261333 0 21.802667 207.36 0.938667 470.912l274.432 113.408a144.512 144.512 0 0 1 81.578666-25.173333c2.688 0 5.333333 0.170667 8.021334 0.256l122.069333-176.725334V380.16a193.194667 193.194667 0 0 1 193.024-193.024c106.410667 0 193.024 86.656 193.024 193.152s-86.613333 193.066667-193.024 193.066667h-4.48l-173.909333 124.202666c0 2.218667 0.170667 4.48 0.170666 6.784a144.725333 144.725333 0 0 1-144.64 144.896 145.578667 145.578667 0 0 1-142.122666-116.352L18.602667 651.52C79.445333 866.432 276.736 1024 511.104 1024c282.752 0 511.957333-229.248 511.957333-512S793.813333 0 511.104 0zM321.706667 776.96l-62.848-26.026667c11.178667 23.168 30.464 42.624 56.064 53.333334a108.842667 108.842667 0 0 0 142.378666-141.824 108.672 108.672 0 0 0-138.88-60.288l64.981334 26.88a80.128 80.128 0 0 1-61.653334 147.925333H321.706667z m487.04-396.928a128.810667 128.810667 0 0 0-128.64-128.64 128.64 128.64 0 1 0 128.64 128.64z m-224.981334-0.213333a96.597333 96.597333 0 1 1 193.322667 0 96.725333 96.725333 0 0 1-96.682667 96.64 96.597333 96.597333 0 0 1-96.64-96.64z" fill="" p-id="5330"></path></svg>'
            break;
        case "PS5":
            logo = '<svg t="1726639043196" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9415" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M799.6 406c-1.6-34.2-6.6-69-21.6-100.2-8.2-17.2-19.4-33-33-46.4-12.6-12.8-27.2-23.4-42.6-32.6-34.2-20.4-75-34-168.8-62S384 128 384 128l0 716.6 159.8 51.4c0 0 0.2-397.6 0.2-599l0-7.6c0-18.6 15-33.6 32.2-33.6l1 0c17 0 31 15 31 33.6l0 4.4 0 262.2c22 10.6 58.4 18.6 83.6 18.2 16.6 0.4 33.4-3.4 48-11.4 15.2-8.2 27.8-20.8 36.8-35.6 10.2-16.6 16.4-35.6 19.8-54.6C800.2 451 800.4 428.4 799.6 406z" p-id="9416"></path><path d="M173.4 715.6c54.8-19.6 178.6-59 178.6-59l0-94.4c0 0-153 49.6-222.6 74.2-17.2 6.2-34.6 11.8-51.4 19-19.6 8.2-38.8 17.4-56.2 29.6-7.6 5.2-14.4 11.8-18.4 20.2-4 8.4-4.4 18.4-1 27.2 4 10.2 11.6 18.6 20.2 25.2 15.6 11.8 34.2 19 52.8 24.4 56.8 18.8 116.8 28 176.8 26.6 29-0.4 72-3.8 100-8.8l0-84c0 0-22 5-82.6 25-9.2 3-18.4 6.6-28 8.6-14.2 3.2-28.8 4.2-43.2 4.4-13-0.6-26.4-1.4-38.6-6.2-4.4-2-9.2-4.4-11-9.2-1.6-4 0.6-8 3.4-10.8C157.8 721.8 165.8 718.6 173.4 715.6z" p-id="9417"></path><path d="M1024 691.8c-0.2-12-7.4-22.4-15.8-30-14.2-12.6-31.8-20.6-49.4-27-11-3.8-18.6-6.6-29.4-10-50.4-16.4-103.8-22.4-156.6-22.6-16 0.6-46.2 1-62 2.8-43.8 5-134.6 30.8-134.6 30.8l0 97.6c0 0 135-43.2 193-63.6 19.4-6.6 40.2-9.2 60.6-9.2 13 0.4 26.4 1.4 38.8 6.2 4.4 1.8 9 4.4 11 9 1.8 5.2-1.8 10-5.8 13-9.4 7.6-21.4 10.6-32.4 14.8C759.4 732.6 576 793 576 793l0 94c0 0 234.4-79.2 341.6-117.6 17.8-6.6 35.8-12.2 52.8-20.8 15.8-8 31.6-17.2 43.6-30.6C1020.2 710.8 1024 702 1024 691.8z" p-id="9418"></path></svg>'
            break;
        case "手游":
            logo = '<svg t="1726638990342" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6482" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z" p-id="6483"></path></svg>'
            break;
        }
    return logo
}
// 过滤并显示特定类型的条目
function filterVaultItems(type) {
    const container = document.getElementById("vaultContainer");
    container.innerHTML = ""; // 清空之前的条目

    const filteredItems = vaultItems
        .filter((item) => item.itemType === type) // 按类型过滤
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // 倒序排列

    if (filteredItems.length === 0) {
        container.innerHTML = '<p class="tips">没有找到该类型的条目。</p>';
        return;
    }

    filteredItems.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "vault-item";
        // 添加类名
        itemDiv.classList.add(`${item.itemType}-item`);
        itemDiv.classList.add(`no-copy`);
        itemDiv.innerHTML = `
        <div class="card-content">
            ${ item.itemType === "music" ? `
                <div class="album"></div>
            ` : ""}
            <img loading="lazy" decoding="async" src="${item.imageUrl}" class="no-copy" />
            <div class="item-info">
                ${ item.itemType === "music" ? `
                    <div class="play">
                        <svg t="1726662428327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4282" width="200" height="200"><path d="M242.48 185.248C179.52 153.76 128 185.6 128 256v512c0 70.4 51.52 102.24 114.48 70.752l539.024-269.52c62.96-31.488 62.96-83.008 0-114.48L242.48 185.248z" fill="#231815" p-id="4283"></path></svg>
                    </div>
                ` : ""}
                ${ item.itemType === "podcast" ? `
                    <div class="play">
                        <svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="soundsIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" color="#2329D6"> <title id="soundsIconTitle">前往收听</title> <path d="M12 7L12 17"/> <path d="M15 10L15 14"/> <path d="M18 8L18 16"/> <path d="M21 13L21 11"/> <path d="M9 4L9 20"/> <path d="M6 9L6 15"/> <path d="M3 13L3 11"/> </svg>
                    </div>
                ` : ""}
                <div class="card-title">
                    ${item.title}
                </div>
                ${item.articleLink
                    ? `<a href="${item.articleLink}" class="card-btn" title="查看文章">查看文章</a>`
                    : ""
                }
                <a href="${item.link}" class="card-txt" target="_blank" title="前往查看">
                    ${item.note}
                </a>
            </div>

            ${ item.itemType === "game" ? `<div class="card-category">${getGameSVG(item.category)}</div>` : ""}
            <div id="itemRating" class="rating">
                ${generateStars(item.rating)}
            </div>
            
        </div>
        `;
        container.appendChild(itemDiv);
    });
}
// 点击不同类型标签时，更新显示内容并修改 URL
const radioInputs = document.querySelectorAll('.radio-inputs input[type="radio"]');
radioInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
        const selectedType = e.target.value;
        // 更新内容显示
        filterVaultItems(selectedType);
        
        // 更新 URL 并不加载页面
        const newUrl = `${window.location.pathname}?type=${selectedType}`;
        history.pushState({ path: newUrl }, '', newUrl);
    });
});
// 页面加载时，自动加载 Vault 数据
document.addEventListener("DOMContentLoaded", loadVaultData);

    // 定义获取数据并更新页面的函数
    function updateVault() {
        // 使用fetch API从指定的接口获取数据
        fetch('https://backend.morick66.com/vault/vault-data')
            .then(response => {
                // 确保请求成功
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 解析JSON数据
            })
            .then(data => {
                // 获取页面中的元素
                // 按照timestamp降序排序
                // 生成随机索引
                const getRandomIndices = (max, count) => {
                    let indices = [];
                    while (indices.length < count) {
                        const index = Math.floor(Math.random() * max);
                        if (!indices.includes(index)) {
                            indices.push(index);
                        }
                    }
                    return indices;
                };

                // 获取随机的六条数据
                const randomSix = getRandomIndices(data.length, getContentCount()).map(index => data[index]);

                // 获取 DOM 元素
                const homeVault = document.getElementById('homeVault');

                if (homeVault) {
                    // 清空当前的内容
                    homeVault.innerHTML = '';

                    // 遍历数据并创建HTML结构
                    randomSix.forEach(item => {
                        const vaultItem = document.createElement('div');
                        vaultItem.className = `${item.itemType}-item`; // 可以定义样式
                        vaultItem.classList.add('card');
                        vaultItem.classList.add('vault-item');
                        vaultItem.innerHTML = `
                            <div class="card-content">
                                ${ item.itemType === "music" ? `
                                    <div class="album"></div>
                                ` : ""}
                                <img loading="lazy" decoding="async" src="${item.imageUrl}" class="no-copy" />
                                <div class="item-info">
                                    ${ item.itemType === "music" ? `
                                        <div class="play">
                                            <svg t="1726662428327" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4282" width="200" height="200"><path d="M242.48 185.248C179.52 153.76 128 185.6 128 256v512c0 70.4 51.52 102.24 114.48 70.752l539.024-269.52c62.96-31.488 62.96-83.008 0-114.48L242.48 185.248z" fill="#231815" p-id="4283"></path></svg>
                                        </div>
                                    ` : ""}
                                    ${ item.itemType === "podcast" ? `
                                        <div class="play">
                                            <svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="soundsIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" color="#2329D6"> <title id="soundsIconTitle">前往收听</title> <path d="M12 7L12 17"/> <path d="M15 10L15 14"/> <path d="M18 8L18 16"/> <path d="M21 13L21 11"/> <path d="M9 4L9 20"/> <path d="M6 9L6 15"/> <path d="M3 13L3 11"/> </svg>
                                        </div>
                                    ` : ""}
                                    <div class="card-title">
                                        ${item.title}
                                    </div>
                                    ${item.articleLink
                                        ? `<a href="${item.articleLink}" class="card-btn" title="查看文章">查看文章</a>`
                                        : ""
                                    }
                                    <a href="${item.link}" class="card-txt" target="_blank" title="前往查看">
                                        ${item.note}
                                    </a>
                                </div>

                                ${ item.itemType === "game" ? `<div class="card-category">${getGameSVG(item.category)}</div>` : ""}
                                <div id="itemRating" class="rating">
                                    ${generateStars(item.rating)}
                                </div>
                                
                            </div>
                    `;
                        homeVault.appendChild(vaultItem);
                    });
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
    // 调用函数以更新页面
    updateVault();
    window.addEventListener('resize', updateVault);