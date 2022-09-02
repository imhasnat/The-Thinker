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
        span.setAttribute("onclick", `categoryNews(${category_id})`)
        span.innerText = category_name;
        categoriesContainer.appendChild(span)
    })
}

const categoryNews = async (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    const retrieveData = await fetchData(url);
    const categoryNews = retrieveData.data;
    // console.log(categoryNews.length);
    console.log(categoryNews);
    const numberOfNews = categoryNews.length
    const newsNumber = document.getElementById('news-numbers');
    const p = document.createElement('p');
    p.innerText = ``

}


const url = 'https://openapi.programming-hero.com/api/news/categories';
displayCategory(url);
// console.log(url)


