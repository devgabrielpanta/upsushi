import productList from "../products.json" with { type: "json" };

// ###################################################################
//                     LOADING ELEMENTS
// ###################################################################

const mainContent = document.getElementById("main-content");
const ementa = document.getElementById("ementa");
const navbar = document.getElementById("navbar");

const menuOptions = [
    {title: "entradas", icon: "🏠"},
    {title: "menus", icon: "🏠"},
    {title: "hot-rolls", icon: "🏠"},
    {title: "uramakis", icon: "🏠"},
    {title: "hossomakis", icon: "🏠"},
    {title: "sashimis", icon: "🏠"},
    {title: "nigiris", icon: "🏠"},
    {title: "bebidas", icon: "🏠"},
];

// Adiciona a categoria de ementa ao navbar
for (const option of menuOptions) {
    const li = document.createElement("li");
    li.id = `nav-${option.title}`;
    li.className = "flex flex-row items-center gap-2 py-1 rounded-lg hover:bg-primary active:bg-primary cursor-pointer w-full";
    li.innerHTML = /*html*/ `
        <span class="text-lg">${option.icon}</span>
        <span class="capitalize text-sm">${String(option.title).replace("-", " ")}</span>
    `;
    li.addEventListener("click", () => {
        handleRouteChange(option.title);
    });
    ementa.appendChild(li);
}


// ###################################################################
//                 HERO / ABOUT / CONTACT ELEMENTS
// ###################################################################

const heroContent = /*html*/ `
    <div
    class="flex flex-col justify-start items-center w-full h-full gap-4"
    >
        <div class="w-full h-auto">
            <img class="object-cover" src="assets/images/background-image.webp" alt="Background Image" />
        </div>
        <div class="flex flex-col items-center text-center">
            <p class="mb-5">
            (home) Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
            </p>
            <button class="btn btn-primary">Ver Entradas</button>
        </div>
    </div>
`;

const aboutContent = /*html*/ `
    <div
    class="flex flex-col justify-start items-center w-full h-full gap-4"
    >
        <div class="w-full h-auto">
            <img class="object-cover" src="assets/images/background-image.webp" alt="Background Image" />
        </div>
        <div class="flex flex-col items-center text-center">
            <p class="mb-5">
            (about) Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
            </p>
            <button class="btn btn-primary">Reservar Mesa</button>
        </div>
    </div>
`;

const contactsContent = /*html*/ `
    <div
    class="flex flex-col justify-start items-center w-full h-full gap-4"
    >
        <div class="w-full h-auto">
            <img class="object-cover" src="assets/images/background-image.webp" alt="Background Image" />
        </div>
        <div class="flex flex-col items-center text-center">
            <p class="mb-5">
            (contacts) Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
            </p>
            <button class="btn btn-primary">Reservar Mesa</button>
        </div>
    </div>
`;

const navHome = document.getElementById("nav-home");
const navAboutUs = document.getElementById("nav-sobre-nós");
const navContacts = document.getElementById("nav-contactos");
navHome.addEventListener("click", () => handleRouteChange("home"));
navAboutUs.addEventListener("click", () => handleRouteChange("sobre-nós"));
navContacts.addEventListener("click", () => handleRouteChange("contactos"));

// Carrega a página inicial por defeito
handleRouteChange("home");

// ###################################################################
//                       ROUTE HANDLER
// ###################################################################

function handleRouteChange(routeTitle) {
    const options = navbar.querySelectorAll("li");
    options.forEach((option) => {
        option.classList.remove("bg-primary", "text-neutral", "font-semibold");
    });

    const activeOption = document.getElementById(`nav-${routeTitle}`);
    if (activeOption) {
        activeOption.classList.add("bg-primary", "text-neutral", "font-semibold");
    }

    const appContents = ["home", "sobre-nós", "contactos"];

    mainContent.innerHTML = "";
    if(!appContents.includes(routeTitle)) {
        mainContent.appendChild(generateProductList(routeTitle));
    } else {
        switch (routeTitle) {
            case "home":
                mainContent.innerHTML = heroContent;
                break;
            case "sobre-nós":
                mainContent.innerHTML = aboutContent;
                break;
            case "contactos":
                mainContent.innerHTML = contactsContent;
                break;
        }
    }
}

// ###################################################################
//                      PRODUCT LISTING
// ###################################################################

// Gera a grid de produtos para uma categoria específica
function generateProductList(category) {
    const productGrid = document.createElement("ul");
    productGrid.className =
    "grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full gap-10 space-y-6";
    for (const product of productList[category]) {
        productGrid.appendChild(createProductItem(product));
    }
    mainContent.innerHTML = "";
    return productGrid;
}

// Gera um card de produto
function createProductItem(product) {
    const li = document.createElement("li");
        li.innerHTML = /*html*/ `
            <div class="card bg-base-100 w-full card-xs shadow-md shadow-(color:--color-neutral)">
                <figure>
                <img
                    class="w-full h-40 object-cover"
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
    // Adiciona um listener ao botão para abrir o modal de produto
    const button = li.querySelector("button");
    button.addEventListener("click", () => displayProductModal(product));

    return li;
}

// ###################################################################
//                        PRODUCT MODAL
// ###################################################################

const productModal = document.getElementById("product-modal");

// Exibe o modal com os detalhes do produto
function displayProductModal(product) {
    productModal.innerHTML = /*html*/ `
        <div class="hero-overlay"></div>
        <div class="modal-box bg-base-300">
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
    // Adiciona um listener ao botão de fechar
    const button = productModal.querySelector("button");
    button.addEventListener("click", closeProductModal);

    // Exibe o modal
    productModal.showModal();
};

function closeProductModal() {
    productModal.innerHTML = '';
    productModal.close();
}

// ###################################################################
//                       BOOKINGS MODAL
// ###################################################################