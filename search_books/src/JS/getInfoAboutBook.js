import { colection } from "../JS/getListBooks";

const getDetails = async (data) => {
	try {
		const apiUrl = `https://api.itbook.store/1.0/books/${data}`;
		const response = await fetch(apiUrl);
		const book = await response.json();
		showInfo(book);
	} catch {
		console.error("ups nieco sa dosralo");
	}
};
const showInfo = (book) => {
	colection.innerHTML = `
	<div class="card">
		<h2 class="card__header">${book.title}</h2>
		<h3 class="card__header card__header--special">${book.subtitle}</h3>
		<img class="card__img"  src="${book.image}" alt="${book.title}" referrerpolicy="same-origin">
		<p class="card__text card__text--desc">${book.desc}</p>
		<div class="card__text">
			<p class="card__text--left">Price: <span class="card__text--yellow">${book.price}</span></p>
			<p class="card__text--left">Rating: <span class="card__text--yellow">${book.rating}/5</span></p>
			<p class="card__text--left">Author: <span class="card__text--yellow">${book.authors}</span></p>
			<p class="card__text--left">Publisher: <span class="card__text--yellow">${book.publisher}</span></p>
			<p class="card__text--left">Published: <span class="card__text--yellow">${book.year}</span></p>
			<p class="card__text--left">Pages: <span class="card__text--yellow">${book.pages}</span></p>
		</div>
		<a href="${book.url}" target="_blank" class="card__btn--yellow">to the shop</a>
	</div>`;
};

// export event
export const ClickToBookTitle = document.addEventListener("click", (e) => {
	if (e.target.className === "colection__btn--yellow") {
		e.preventDefault();
		let details = e.target.attributes.href.value;
		getDetails(details);
	}
});
