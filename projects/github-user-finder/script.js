const searchBtn = document.getElementById('search-btn');
const URL = 'https://api.github.com/search/users';
const container = Array.from(document.getElementsByClassName('container'))[0];
const input = document.getElementById('search-input');
const pages = document.getElementById('pages');
let page = 1;

searchBtn.addEventListener('click', searchHandler);
input.addEventListener('keydown', keyPressedHandler);

function keyPressedHandler(event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
}

async function searchHandler() {
    page = 1;
    await getData(URL, page);
}

async function getData(url, page) {
    //clear container
    container.innerHTML = '';
    const response = await fetch(`${url}?q=${input.value}&type=user&page=${page}`);
    const data = await response.json();

    const totalPages = data.total_count;
    data.items.forEach(user => {
        const { avatar_url, login, html_url } = user;

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                    <img src="${avatar_url}" alt="Avatar">
                    <p>${login}</p>
                    <a href="${html_url}">View Profile</a>
                `
        container.appendChild(card);
    });

    pages.innerHTML = `Page ${page} of ${Math.ceil(totalPages / 30)} pages.`

    page === 1 ?
        document.getElementById('prev').hidden = true :
        document.getElementById('prev').hidden = false;

    page === totalPages ?
        document.getElementById('next').hidden = true :
        document.getElementById('next').hidden = false;
}

async function prevPage() {
    page -= 1;
    await getData(URL, page);
}

async function nextPage() {
    page += 1;
    await getData(URL, page);
}