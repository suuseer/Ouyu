const RESULTS_PER_PAGE = 5;
let currentPage = 1;
let paginatedResults = [];

async function searchOnChange(evt) {
  let searchQuery = evt.target.value;
  var inputEle = document.querySelectorAll("input#search");
  inputEle.forEach((element) => {
    element.value = searchQuery;
  });

  if (searchQuery !== "") {
    if (!window.searchJson) {
      window.searchJson = await fetch("/search/index.json").then((res) => res.json());
    }

    let query = new RegExp(searchQuery.toLowerCase(), "i");
    let searchResults = searchJson.filter((item) => {
      return item.title && item.content && (
        query.test(item.title.toLowerCase()) ||
        query.test(item.content.toLowerCase())
      );
    });

    paginatedResults = paginateResults(searchResults, RESULTS_PER_PAGE);
    currentPage = 1; // Reset to first page on new search
    displaySearchResults(currentPage, searchQuery);
  } else {
    document.getElementById("search-content").style.display = "none";
    document.getElementById("search-results").innerHTML = "";
  }
}

function paginateResults(results, resultsPerPage) {
  let paginatedArray = [];
  for (let i = 0; i < results.length; i += resultsPerPage) {
    paginatedArray.push(results.slice(i, i + resultsPerPage));
  }
  return paginatedArray;
}

function displaySearchResults(page, searchQuery) {
  let results = paginatedResults[page - 1] || [];
  
  let preview = (text) => {
    let index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (index >= 0) {
      let start = Math.max(0, index - 25); // 显示搜索词前25个字符
      let end = Math.min(text.length, start + 50); // 显示搜索词后25个字符
      return text.substring(start, end)
        .replace(new RegExp(searchQuery, 'gi'), '<span class="search-result-highlight">' + searchQuery + '</span>');
    }
    return text.substring(0, 50).replace(/\s+?(\S+)?$/, '') + '...'; // 默认显示前50个字符
  };
  let previewTitle = (text) => {
    return text.replace(new RegExp(searchQuery, 'gi'), '<span class="search-result-highlight">' + searchQuery + '</span>');
  };
  let searchResultsHtml = results.map((item) => {
    let titlePreview = previewTitle(item.title);
    let contentPreview = preview(item.content);
    return `
      <a href="${item.permalink}" class="search-result-item">
        <h4>${titlePreview}</h4>
        <p class="search-preview">...${contentPreview}...</p>
      </a>
    `;
  }).join("");

  document.getElementById("search-results").innerHTML = searchResultsHtml;
  document.getElementById("search-content").style.display = "block";

  // 如果没有结果，显示提示信息
  if (results.length === 0) {
    document.getElementById("search-results").innerHTML = `<p class="text-hint">未找到与“${searchQuery}”相关的结果。</p>`;
  }

  // Generate and display pagination controls
  let totalPages = paginatedResults.length;

  if (totalPages > 1) {
    document.getElementById("pagination-controls").innerHTML = generatePaginationControls(currentPage, totalPages);
    document.getElementById("pagination-controls").style.display = "block"; // 显示分页控件
  } else {
    document.getElementById("pagination-controls").style.display = "none"; // 隐藏分页控件
  }
}

function generatePaginationControls(currentPage, totalPages) {
  let paginationHtml = `<div class="pagination-controls">`;
  let startPage = Math.max(1, currentPage - 3);
  let endPage = Math.min(totalPages, currentPage + 3);

  if (startPage > 1) {
    paginationHtml += `<button class="pagination-btn" onclick="changePage(1)">1</button>`;
    if (startPage > 2) {
      paginationHtml += `<span>...</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHtml += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHtml += `<span>...</span>`;
    }
    paginationHtml += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
  }

  paginationHtml += `</div>`;
  return paginationHtml;
}

function changePage(page) {
  if (page > 0 && page <= paginatedResults.length) {
    currentPage = page;
    displaySearchResults(currentPage, document.querySelector("input#search").value);
  }
}

function resetSearch(e) {
  if (
    e.keyCode === 27 ||  // 按下 Esc 键时关闭
    (e.target.id !== "search" &&
      e.target.closest("#search-content") === null &&
      !e.target.classList.contains('pagination-btn')) // 点击页面其他地方时
  ) {
    document.getElementById("search-content").style.display = "none";
    document.getElementById("search-results").innerHTML = "";
    var inputEle = document.querySelectorAll("input#search");
    inputEle.forEach((element) => {
      element.value = "";
      element.blur();
    });
  }
}

document.addEventListener("click", function (e) {
  resetSearch(e);
});

const searchBtn = document.getElementById("searchBtn");
const searchContainer = document.getElementById("searchContainer");
const searchOverlay = document.getElementById("searchOverlay");
if (searchBtn) {
  searchBtn.addEventListener('click', function() {
    searchOverlay.style.display = 'block';
    searchContainer.style.display = 'block';
  });
}
searchOverlay.addEventListener('click', function() {
  searchOverlay.style.display = 'none';
  searchContainer.style.display = 'none';
});
// 检测当窗口宽度大于768时，隐藏搜索框和遮罩层
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    searchOverlay.style.display = 'none';
    searchContainer.style.display = 'none';
  }
});
