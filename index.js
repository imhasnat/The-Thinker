const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
const displayCategory = async (url) => {
    const data = await fetchData(url);
    const categories = data.data.news_category

    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(category => {
        const { category_id, category_name } = category;
        // console.log(category);
        const span = document.createElement('span');
        span.setAttribute("onclick", `categoryNews(${category_id},'${category_name}')`)
        span.innerText = category_name;
        categoriesContainer.appendChild(span)
    })
}

function sorting(a, b) {

    return b.total_view - a.total_view;
}

const isLoading = bool => {
    const spinner = document.getElementById('spinner');
    if (bool) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

const categoryNews = async (categoryId, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    const retrieveData = await fetchData(url);
    const categoryNews = retrieveData.data;
    // console.log(categoryNews);

    isLoading(true);
    displayNews(categoryNews, categoryName);
}

const displayNews = (categoryNews, categoryName) => {
    const numberOfNews = categoryNews.length
    const sortCategoryNews = categoryNews.sort(sorting);
    const newsNumber = document.getElementById('news-numbers');
    newsNumber.innerHTML = `
    <p>${numberOfNews} items found for category ${categoryName}</p>
    `
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    if (numberOfNews > 0) {
        sortCategoryNews.forEach(news => {
            const { image_url, thumbnail_url, title, details, total_view, author } = news;
            const { name, published_date, img } = author
            const div = document.createElement('div');
            div.classList.add('card', 'mb-3')
            // div.style.width = '540px';
            // div.style.width = '540px';

            newsContainer.appendChild(div);
        })
    }
    isLoading(false);
}

const url = 'https://openapi.programming-hero.com/api/news/categories';
displayCategory(url);



