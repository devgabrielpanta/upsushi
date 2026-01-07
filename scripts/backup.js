import productList from "../products.json" with { type: "json" };

const categoryGrid = document.getElementById("category-grid");
const filters = document.getElementById("filters");
const productModal = document.getElementById("product-modal");


let categories = Object.keys(productList).map((category) => ({filtered: false, title: category, products: productList[category]}));

for (const category of categories) {
    categoryGrid.appendChild(createCategoryItem(category));
    filters.appendChild(createCategoryFilter(category));
}

function createCategoryItem(category) {
    const li = document.createElement("li");
    li.id=`category-${category.title}`;
    li.className = "flex flex-col w-full";
  
    const header = document.createElement("h2");
    header.className = "text-2xl font-bold mb-4 mt-8";
    header.textContent = category.title.charAt(0).toUpperCase() + category.title.slice(1);
    
    const productGrid = document.createElement("ul");
    productGrid.className = "grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full space-y-6";
  
    for (const product of category.products) {
        productGrid.appendChild(createProductItem(product));
    }

    li.appendChild(header);
    li.appendChild(productGrid);
    return li;
}

function createProductItem(product) {
    const li = document.createElement("li");
        li.innerHTML = /*html*/ `
            <div class="card bg-base-100 w-60 card-xs shadow-md shadow-(color:--color-neutral)">
                <figure>
                <img
                    class="w-60 h-40 object-cover"
                    src=${product.image}
                    alt=${product.title}
                />
                </figure>
                <div class="card-body">
                    <div class="flex justify-between items-start mb-2 gap-1">
                        <h2 class="card-title w-full line-clamp-1 text-left">${product.title}</h2>
                        <p class="card-title min-w-fit">${product.price.toFixed(2).replace('.', ',')} €</p>
                    </div>

                    <p class="text-sm leading-snug line-clamp-2 min-h-[2.75em]">
                    ${product.description}
                    </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary btn-xs">Ver mais</button>
                </div>
                </div>
            </div>
        `;
    const button = li.querySelector("button");
    button.addEventListener("click", () => displayProductModal(product));
    return li;
}

function createCategoryFilter(category) {
    const li = document.createElement("li");
    li.className = "flex flex-row items-center gap-2";
        
    const text = document.createElement("span");
    text.innerText = category.title.charAt(0).toUpperCase() + category.title.slice(1);
    
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = false;
    input.className = "checkbox checkbox-sm";
    input.onchange = (e) => toggleCategoryDisplay(category.title, e.target.checked);

    li.appendChild(input);
    li.appendChild(text);
    return li;
}

function toggleCategoryDisplay(categoryTitle, display) {
    categories = categories.map((category) =>
        category.title !== categoryTitle
            ? category
            : {...category, filtered: display}
        );

    renderCategories();
}

function renderCategories() {
    const filteredCategories = categories.filter((category) => category.filtered);

    for (const category of categories) {
    const element = document.getElementById(
        `category-${category.title}`
    );

    if (!element) continue;

    if (filteredCategories.length === 0) {
        element.style.display = "flex";
        continue;
    }
    element.style.display = category.filtered ? "flex" : "none";
    }
}

function displayProductModal(product) {
    console.log(product);
    productModal.innerHTML = /*html*/ `
        <div class="modal-box">
            <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center shadow-lg rounded-lg p-4">
                    <img
                    src="${product.image}"
                    alt="Product Image Modal"
                    class="w-60 h-auto object-cover"
                    id="modal-image"
                    />
                </div>
                <div class="flex flex-col items-start justify-center">
                    <h3 class="font-bold text-lg">${product.title}</h3>
                    <p class="py-4">
                    ${product.description}
                    </p>
                    <p class="font-semibold text-xl">${product.price.toFixed(2).replace('.', ',')} €</p>
                </div>
            </div>
            <div class="flex flex-row justify-between items-center mt-4">
                <button class="btn btn-ghost" onclick="closeProductModal()">Fechar</button>
                <a href="reservas.html" class="btn btn-primary">Reservar Mesa</a>
            </div>
        </div>
    `;
    const button = productModal.querySelector("button");
    button.addEventListener("click", closeProductModal);
    productModal.showModal();
};

function closeProductModal() {
    productModal.innerHTML = '';
    productModal.close();
}