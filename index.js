function sortObject(firstData, secondData) {

    return secondData.total_view - firstData.total_view;
}

const isLoading = boolean => {
    const spinner = document.getElementById('spinner');
    if (boolean) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}


const loadModalData = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    const retrieveData = await fetchData(url);
    const newsDetails = retrieveData.data[0];
    displayModalDetails(newsDetails)
}


const displayNews = (categoryNews, newsAmount) => {

    const sortCategoryNews = categoryNews.sort(sortObject);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    sortCategoryNews.forEach(news => {
        const { _id, thumbnail_url, title, details, total_view, author } = news;
        const { name, published_date, img } = author;
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3')
        div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3 p-2">
                <img src="${thumbnail_url}" class="img-fluid rounded-start h-auto" alt="...">
            </div>
            <div class="col-md-9 p-3">
                <div class="card-body">
                    <div>
                        <h5 class="card-title"> ${title}</h5>
                        <p class="card-text text-ellipsis">${details}</p>
                    </div>
                    <div class="d-flex align-items-center justify-content-between mt-5">
                        <div class="d-flex align-items-center"> 
                            <img src="${img}" class="img-fluid rounded-pill img-height-width" alt="...">
                            <div class="ms-2">
                                <p class="mb-1">${name ? name : "No data Available"}</p>
                                <p class="mb-1">${published_date}</p>
                            </div>
                        </div>
                        <div> 
                            <p class="card-text"><i class="fa-regular fa-eye"></i> ${total_view ? total_view : "No data Available"}</p>
                        </div>
                        <div> 
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div> 
                            <a class="pe-2" onclick="loadModalData('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
        newsContainer.appendChild(div);
    })

    isLoading(false);
}

const numberOfSearchNews = (categoryNewsArray, categoryName) => {
    const numberOfNews = categoryNewsArray.length
    const newsNumberContainer = document.getElementById('news-numbers');
    if (numberOfNews > 0) {
        newsNumberContainer.classList.remove('d-none');
        newsNumberContainer.innerHTML = `
            <p class="mb-0">${numberOfNews} items found for category ${categoryName}</p>
            `;
    }
    else {
        // newsNumberContainer.classList.add('d-none');
        newsNumberContainer.innerHTML = `
            <p class="mb-0">No News found for category ${categoryName}</p>
            `
    }

}

const categoryNewsData = async (categoryId, categoryName) => {
    isLoading(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const retrieveData = await fetchData(url);
    const categoryNewsArray = retrieveData.data;

    numberOfSearchNews(categoryNewsArray, categoryName);
    displayNews(categoryNewsArray)
}

const displayCategory = async (url) => {
    const data = await fetchData(url);
    const categories = data.data.news_category

    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(category => {
        const { category_id, category_name } = category;
        // console.log(category);
        const span = document.createElement('span');
        span.setAttribute("onclick", `categoryNewsData('${category_id}','${category_name}')`)
        span.innerText = category_name;
        categoriesContainer.appendChild(span)
    })
}


const url = 'https://openapi.programming-hero.com/api/news/categories';
displayCategory(url);



