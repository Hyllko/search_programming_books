export const colection = document.querySelector(".colection");

const form = document.querySelector(".form");
const searchInput = document.querySelector(".form__search");
const searchBtn = document.querySelector(".form__btn");
const list = document.createElement("ul");

const searchBooks = () => {
	if (searchInput.value === "") {
		return;
	}
	getBooks(searchInput.value);
	searchInput.value = "";
	searchInput.focus();
};

// fetch
const getBooks = async (searchText) => {
	try {
		const apiUrl = `https://api.itbook.store/1.0/search/${searchText}`;
		const response = await fetch(apiUrl);
		const data = await response.json();
		const books = data.books;
		let filteredBooks = books.filter((book) => {
			return book.title.toLowerCase().includes(searchText.toLowerCase());
		});
		showBooks(filteredBooks, searchText);
	} catch {
		console.error("ups nieco sa dosralo");
	}
};

const showBooks = (books, searchText) => {
	colection.innerHTML = "";
	let template = "";
	if (books.length == 0) {
		template = `
		<p class="card__text--danger">No result for: "${searchText}"</p>
`;
	}
	books.map((book) => {
		template += `
		<li class="colection__item">
			<a href="${book.isbn13}" class="colection__btn--yellow">${book.title}</a>
		</li>`;
	});

	colection.appendChild(list);
	list.innerHTML = template;
};

// export events
export const SubmitEvent = form.addEventListener("submit", (e) => {
	e.preventDefault();
	searchBooks();
});

export const ClickEvent = searchBtn.addEventListener("click", () => {
	searchBooks();
});
