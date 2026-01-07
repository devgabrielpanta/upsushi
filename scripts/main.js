import productList from "../products.json" with { type: "json" };
// ###################################################################
//                     LOADING ELEMENTS
// ###################################################################

const mainContent = document.getElementById("main-content");
const ementa = document.getElementById("ementa");
const navbar = document.getElementById("navbar");
const bookingModal = document.getElementById("bookings-modal");

const menuOptions = [
    {title: "entradas", icon: "assets/images/navbar/entradas.png"},
    {title: "menus", icon: "assets/images/navbar/menus.png"},
    {title: "hot-rolls", icon: "assets/images/navbar/hot-rolls.png"},
    {title: "uramakis", icon: "assets/images/navbar/uramakis.png"},
    {title: "hossomakis", icon: "assets/images/navbar/hossomakis.png"},
    {title: "sashimis", icon: "assets/images/navbar/sashimis.png"},
    {title: "nigiris", icon: "assets/images/navbar/nigiris.png"},
    {title: "bebidas", icon: "assets/images/navbar/bebidas.png"},
];

// Adiciona a categoria de ementa ao navbar
for (const option of menuOptions) {
    const li = document.createElement("li");
    li.id = `nav-${option.title}`;
    li.className = "flex flex-row items-center gap-2 py-1 pl-1 rounded-lg hover:bg-primary active:bg-primary cursor-pointer w-full";
    li.innerHTML = /*html*/ `
        <span class="text-lg"><img src="${option.icon}" alt="${option.title} icon" class="w-6 h-6"/></span>
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
    class="flex flex-col justify-center items-center lg:grid lg:grid-cols-2 w-full h-full gap-4"
    >
        
        <picture class="w-full h-auto">
            <!-- Desktop -->
            <source
            srcset="assets/images/hero-desktop.jpg"
            media="(min-width: 768px)"
            />

            <!-- Mobile (fallback / default) -->
            <img
            src="assets/images/hero.jpg"
            alt="Background Image"
            class="w-full h-auto object-cover"
            loading="eager"
            />
        </picture>


        <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
            UPSUSHI é o destino ideal em Lisboa para quem procura sushi fresco, bem preparado e cheio de sabor. Uma ementa cuidada, ingredientes selecionados e uma experiência japonesa autêntica, pensada para desfrutar sem pressa.
            <button class="btn btn-primary mt-10">Reservar Mesa</button>
        </div>
    </div>
`;

const aboutContent = /*html*/ `
    <div
    class="flex flex-col justify-center items-center lg:grid lg:grid-cols-2 w-full h-full gap-4"
    >
        <picture class="w-full h-auto">
            <!-- Desktop -->
            <source
            srcset="assets/images/about-desktop.png"
            media="(min-width: 768px)"
            />

            <!-- Mobile (fallback / default) -->
            <img
            src="assets/images/about.jpg"
            alt="Background Image"
            class="w-full h-auto object-cover"
            loading="eager"
            />
        </picture>
        <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div class="flex flex-col justify-start items-center gap-2 mb-5">    
                <p>No UPSUSHI, unimos tradição e inovação para oferecer uma experiência japonesa autêntica e acessível.</p>
                <p>Trabalhamos com ingredientes frescos e selecionados, preparando cada prato com cuidado, respeito e atenção aos detalhes.</p>
                <p>Mais do que sushi, queremos proporcionar momentos de prazer à mesa, num ambiente acolhedor onde a qualidade e o sabor estão sempre em primeiro lugar.</p>
            </div>
            <button class="btn btn-primary">Reservar Mesa</button>
        </div>
    </div>
`;

const navHome = document.getElementById("nav-home");
const navAboutUs = document.getElementById("nav-sobre-nós");
navHome.addEventListener("click", () => handleRouteChange("home"));
navAboutUs.addEventListener("click", () => handleRouteChange("sobre-nós"));

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

    mainContent.innerHTML = "";
    if(routeTitle != "home" && routeTitle != "sobre-nós") {
        mainContent.appendChild(generateProductList(routeTitle));
        return;
    }

    mainContent.innerHTML = routeTitle === "home"
        ? heroContent
        : aboutContent;

    const bookingButtons = mainContent.querySelectorAll("button");
    bookingButtons.forEach(button => {
        button.addEventListener("click", () => {
            bookingModal.showModal();
        });
    });
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
                <button class="btn btn-ghost">Fechar</button>
                <a class="btn-open-bookings-modal btn btn-primary">Reservar Mesa</a>
            </div>
        </div>
    `;
    // Adiciona um listener ao botão de fechar
    const button = productModal.querySelector("button");
    button.addEventListener("click", closeProductModal);

    const openBookingModal = productModal.querySelector("a");
    openBookingModal.addEventListener("click", () => {
        bookingModal.showModal();
    });

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

// Adiciona listeners ao botão do header para abrir o modal
const openBookingHeader = document.getElementById("btn-open-bookings-modal");
openBookingHeader.addEventListener("click", () => {
    bookingModal.showModal();
});

// Adiciona um listener ao botão de fechar
const closeBookingButtons = bookingModal.querySelectorAll(".close-bookings-modal");
closeBookingButtons.forEach(button => {
    button.addEventListener("click", () => {
        bookingModal.close();
    });
});

// Adiciona listener ao formulário de reservas
const bookingsForm = bookingModal.querySelector("form");
bookingsForm.addEventListener("submit", (e) => handleBookingSubmission(e));

// Manipula o envio do formulário de reservas
function handleBookingSubmission(event) {
    event.preventDefault();
    const formData = new FormData(bookingsForm);
    const agenda = formData.get("agenda");
    const guests = formData.get("guests");
    const name = formData.get("name");
    const email = formData.get("email");

    const date = formatDateDisplay(agenda);
    const time = formatTimeDisplay(agenda);

    displaySuccessMessage(`Solicitação de reserva efetuada com sucesso para ${name} no dia ${date} às ${time} para ${guests} pessoas. Responderemos o mais breve possível para o email ${email}.`);
    bookingModal.close();
    bookingsForm.reset();
}

// ###################################################################
//                       HELPER FUNCTIONS
// ###################################################################

// Exibe uma barra com mensagem de sucesso
function displaySuccessMessage(message) {
    const alert = document.createElement("div");
    alert.role = "alert";
    alert.className = "alert alert-success fixed bottom-0 left-0 w-full rounded-none p-4";
    alert.innerHTML = /*html*/ `
        <div class="flex flex-row justify-start items-start gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${message}</span>
        </div>    
    `;

    setTimeout(() => {
        alert.remove();
    }, 10000);

    document.body.appendChild(alert);
}

// Formata a data para exibição amigável
function formatDateDisplay(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Formata a hora para exibição amigável
function formatTimeDisplay(dateString) {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
}