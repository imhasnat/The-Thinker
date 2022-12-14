// fetch API data
const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

// sorting news object
function sortObject(firstData, secondData) {

    return secondData.total_view - firstData.total_view;
}

// spinner display
const isLoading = boolean => {
    const spinner = document.getElementById('spinner');
    if (boolean) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

// Modal Details
const displayModalDetails = newsDetails => {

    const { others_info, rating, image_url, title, details, total_view, author } = newsDetails;
    const { name, published_date, img } = author;
    const { is_trending } = others_info;
    const { number } = rating;
    const modalContainer = document.getElementById('modal-detail-container');
    modalContainer.innerHTML = `
        <div class="modal-header align-items-start">
            <div>
                <h5 class="modal-title title-style" id="exampleModalLabel">${title ? title : "No data Available"}</h5>
                <br>
                
                <div class="d-flex justify-content-between  justify-content-md-around">
                    <div>
                        <img src="${img}" class="img-fluid rounded-pill img-height-width" alt="...">
                        <p class="mb-1 date-style"><span class="fw-bold author-style"> Author:</span> ${name ? name : "No data Available"}</p>
                    </div>
                    
                    <div>
                        <p class="mb-1 date-style"><span class="fw-bold author-style">News Rating:</span> ${number ? number : "No data Available"}</p>
                        <p class="mb-1 date-style"><span class="fw-bold author-style"> Trending:</span> ${is_trending ? 'Yes' : "No"}</p>
                        <p class="mb-1 date-style"><span class="fw-bold author-style"> Total view :</span> ${total_view ? total_view : "No data Available"}</p>
                        <p class="mb-1 date-style"><span class="fw-bold author-style"> Published:</span> ${published_date ? published_date : "No data Available"}</p>
                    </div>
                </div>
                
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

        </div>
        <div class="modal-body">
            <img src="${image_url ? image_url : "No data Available"}" class="img-fluid rounded-start h-auto" alt="...">
            <p class="card-text text-scroll mt-2 paragraph-font">${details ? details : "No data Available"}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `
}
// Modal Data Fetch
const loadModalData = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    const retrieveData = await fetchData(url);
    const newsDetails = retrieveData.data[0];
    displayModalDetails(newsDetails)
}

// News Details
const displayNews = (categoryNews) => {

    const sortCategoryNews = categoryNews.sort(sortObject);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    sortCategoryNews.forEach(news => {
        const { _id, thumbnail_url, title, details, total_view, author } = news;
        const { name, published_date, img } = author;
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3');
        div.setAttribute("onclick", `loadModalData('${_id}')`);
        div.setAttribute("data-bs-toggle", "modal");
        div.setAttribute("data-bs-target", "#exampleModal");
        div.innerHTML = `
        <div class="row g-0" >
            <div class="col-12 col-md-3 p-2">
                <img src="${thumbnail_url ? thumbnail_url : "No data Available"}" class="w-100 img-fluid rounded-start h-auto" alt="...">
            </div>
            <div class="col-12 col-md-9 p-3 d-flex">
                <div class="card-body d-flex flex-column justify-content-around ">
                    
                        <h5 class="card-title title-style"> ${title ? title : "No data Available"}</h5>
                        <p class="card-text text-ellipsis mt-3 paragraph-font">${details ? details : "No data Available"}</p>
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2">
                            <div class="col text-center text-lg-start m-auto">
                                <div class="d-lg-flex">
                                    <img src="${img}" class="img-fluid rounded-pill img-height-width" alt="...">
                                    <div class="ms-2">
                                        <p class="mb-1 author-style">${name ? name : "No data Available"}</p>
                                        <p class="mb-1 date-style">${published_date ? published_date : "No data Available"}</p>
                                    </div>
                                </div> 
                                    
                            </div>
                            <div class="col text-center m-auto"> 
                                <p class="card-text"><i class="fa-regular fa-eye me-2"></i> <span class="view-star-color fw-bold">${total_view ? total_view : "No data Available"}</span></p>
                            </div>
                            <div class="col text-center m-auto view-star-color"> 
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <div class="col text-center text-lg-end m-auto"> 
                                <a class="pe-2 me-lg-3" title="News Details" onclick="loadModalData('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
                            </div>

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

// Number of news found for a category
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
// News data fetch
let previous = 0;
// category click highlight
const highlightText = categoryId => {
    const next = categoryId;
    if (previous === 0) {
        const anchor = document.getElementById(`${next}`);
        // anchor.style.color = 'purple';
        anchor.classList.add('custom-color');
    }
    else {
        const anchorNxt = document.getElementById(`${next}`);
        const anchorPrev = document.getElementById(`${previous}`);
        anchorNxt.classList.add('custom-color');
        anchorPrev.classList.remove('custom-color')
    }
    previous = next;
}

// news data fetch
const categoryNewsData = async (categoryId, categoryName, boolean) => {

    if (boolean) {
        highlightText(categoryId);
    }

    // console.log(categoryName, typeof categoryName)
    isLoading(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const retrieveData = await fetchData(url);
    const categoryNewsArray = retrieveData.data;
    if (boolean) {
        numberOfSearchNews(categoryNewsArray, categoryName);
    }
    displayNews(categoryNewsArray)
}

// category bar
const displayCategory = async (url) => {
    const data = await fetchData(url);
    const categories = data.data.news_category;

    const categoriesContainer = document.getElementById('categories-container');

    categories.forEach(category => {
        const { category_id, category_name } = category;
        const boolean = true;
        const span = document.createElement('span');
        span.classList.add('mouse-pointer', 'px-1', 'py-1', 'paragraph-font');
        span.setAttribute("id", `${category_id}`);
        span.setAttribute("onclick", `categoryNewsData('${category_id}','${category_name}',${boolean})`);
        span.innerText = category_name;
        categoriesContainer.appendChild(span);
    })
}

// default news
categoryNewsData('08', 'All News');
const url = 'https://openapi.programming-hero.com/api/news/categories';

// category showing
displayCategory(url);



