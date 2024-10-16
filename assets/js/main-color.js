document.addEventListener("DOMContentLoaded", function () {
    // 主题色、最新文章颜色
    var mainColor = document.getElementById('mainColor');
    // 文章颜色
    var articleColor = document.getElementById('articleColor');
    if (articleColor) {
        // 从data属性获取颜色值
        var themeColor = articleColor.getAttribute('data-color');

        if (themeColor) {
            // 设置CSS变量 '--main-color'
            document.documentElement.style.setProperty('--main-color', themeColor);
        }
    }
    else {
        var themeColor = mainColor.getAttribute('data-color');
        if (themeColor) {
            // 设置CSS变量 '--main-color'
            document.documentElement.style.setProperty('--main-color', themeColor);
        }
    }
});