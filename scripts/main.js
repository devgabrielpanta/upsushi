import productList from "../products.json" with { type: "json" }; //

// ###################################################################
//                     LOADING ELEMENTS
// ###################################################################

const mainContent = document.getElementById("main-content");
const ementa = document.getElementById("ementa");
const bookingModal = document.getElementById("bookings-modal");
const productModal = document.getElementById("product-modal");

const menuOptions = [
    {title: "entradas", icon: "assets/images/navbar/entradas.png"},
    {title: "menus", icon: "assets/images/navbar/menus.png"},
    {title: "hot-rolls", icon: "assets/images/navbar/hot-rolls.png"},
    {title: "uramakis", icon: "assets/images/navbar/uramakis.png"},
    {title: "hossomakis", icon: "assets/images/navbar/hossomakis.png"},
    {title: "sashimis", icon: "assets/images/navbar/sashimis.png"},
    {title: "nigiris", icon: "assets/images/navbar/nigiris.png"},
    {title: "bebidas", icon: "assets/images/navbar/bebidas.png"},
]; //

for (const option of menuOptions) {
    const li = document.createElement("li");
    li.id = `nav-${option.title}`;
    li.className = "flex items-center gap-3 p-3 rounded-md hover:bg-white/5 cursor-pointer transition-all";
    li.innerHTML = `
        <img src="${option.icon}" class="nav-icon"/>
        <span class="capitalize text-[10px] font-bold tracking-wide hidden md:block">${option.title.replace("-", " ")}</span>
    `;
    li.addEventListener("click", () => handleRouteChange(option.title));
    ementa.appendChild(li);
} //

// ###################################################################
//                 HERO / ABOUT / CONTACT ELEMENTS
// ###################################################################

const heroContent = /*html*/ `
    <div class="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center text-left">
        <div class="space-y-8">
            <h1 class="text-7xl font-black italic gold-text uppercase leading-none">UpSushi</h1>
            <p class="text-lg opacity-70 font-light leading-relaxed max-w-md">
                UPSUSHI é o destino ideal em Lisboa para quem procura sushi fresco, bem preparado e cheio de sabor. 
                Uma ementa cuidada, ingredientes selecionados e uma experiência japonesa autêntica, pensada para desfrutar sem pressa.
            </p>
            <button class="btn bg-gold border-none rounded-none px-12 h-14 font-bold uppercase tracking-widest">Reservar Mesa</button>
        </div>
        <picture class="w-full">
            <source srcset="assets/images/hero-desktop.jpg" media="(min-width: 768px)" />
            <img src="assets/images/hero.jpg" alt="UPSUSHI" class="rounded-lg shadow-2xl w-full h-[500px] object-cover border border-white/10" loading="eager" />
        </picture>
    </div>
`; //

const aboutContent = /*html*/ `
    <div class="flex flex-col gap-12 text-left">
        <h2 class="text-5xl font-black italic gold-text uppercase">Nossa História</h2>
        <picture class="w-full">
            <source srcset="assets/images/about-desktop.png" media="(min-width: 768px)" />
            <img src="assets/images/about.jpg" alt="Sobre UPSUSHI" class="rounded-xl shadow-2xl w-full h-[450px] object-cover border border-white/10" loading="eager" />
        </picture>
        <div class="grid md:grid-cols-2 gap-10 text-lg opacity-80 leading-relaxed font-light">
            <p>No UPSUSHI, unimos tradição e inovação para oferecer uma experiência japonesa autêntica e acessível. Trabalhamos com ingredientes frescos e selecionados, preparando cada prato com cuidado, respeito e atenção aos detalhes.</p>
            <p>Mais do que sushi, queremos proporcionar momentos de prazer à mesa, num ambiente acolhedor onde a qualidade e o sabor estão sempre em primeiro lugar.</p>
        </div>
        <button class="btn bg-gold border-none rounded-none px-12 h-14 font-bold uppercase tracking-widest w-fit">Reservar Mesa</button>
    </div>
`; //

// ###################################################################
//                       ROUTE HANDLER
// ###################################################################

function handleRouteChange(routeTitle) {
    document.querySelectorAll("#navbar li").forEach(opt => opt.classList.remove("nav-active"));
    const activeOption = document.getElementById(`nav-${routeTitle}`);
    if (activeOption) activeOption.classList.add("nav-active");

    mainContent.innerHTML = "";
    if(routeTitle !== "home" && routeTitle !== "sobre-nós") {
        mainContent.appendChild(generateProductList(routeTitle));
        return;
    }

    mainContent.innerHTML = routeTitle === "home" ? heroContent : aboutContent;
    mainContent.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => bookingModal.showModal());
    });
} 

handleRouteChange("home"); //

// ###################################################################
//                      PRODUCT LISTING
// ###################################################################

function generateProductList(category) {
    const container = document.createElement("div");
    container.innerHTML = `<h2 class="text-4xl font-bold gold-text italic uppercase mb-12 text-left">${category.replace("-", " ")}</h2>`;
    
    const grid = document.createElement("ul");
    grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left";
    
    if (productList[category]) {
        for (const product of productList[category]) {
            const li = document.createElement("li");
            li.innerHTML = /*html*/ `
                <div class="card bg-[#1a1a1a] card-sushi overflow-hidden h-full rounded-none">
                    <div class="product-img-container h-52">
                        <img class="w-full h-full object-contain p-4" src="${product.image}" alt="${product.title}" />
                    </div>
                    <div class="card-body p-6">
                        <div class="flex justify-between items-baseline mb-3">
                            <h2 class="card-title text-lg text-white">${product.title}</h2>
                            <span class="gold-text font-bold text-base ml-2">${product.price.toFixed(2).replace('.', ',')}€</span>
                        </div>
                        <p class="text-xs opacity-50 font-light line-clamp-2">${product.description}</p>
                        <div class="card-actions justify-end mt-6">
                            <button class="btn btn-ghost btn-xs uppercase gold-text p-0">Ver Detalhes</button>
                        </div>
                    </div>
                </div>
            `; //
            li.querySelector("button").addEventListener("click", () => displayProductModal(product));
            grid.appendChild(li);
        }
    }
    container.appendChild(grid);
    return container;
} //

// ###################################################################
//                        PRODUCT MODAL
// ###################################################################

function displayProductModal(product) {
    productModal.innerHTML = /*html*/ `
        <div class="modal-box bg-[#1a1a1a] max-w-2xl border border-white/10 p-0 overflow-hidden rounded-none">
            <div class="flex flex-col md:flex-row">
                <div class="md:w-1/2 bg-white flex items-center justify-center">
                    <img src="${product.image}" class="w-full h-full object-contain p-8" />
                </div>
                <div class="p-10 md:w-1/2 text-left flex flex-col justify-center space-y-6">
                    <h3 class="modal-title text-3xl gold-text italic">${product.title}</h3>
                    <p class="text-sm opacity-60 font-light">${product.description}</p>
                    <p class="text-3xl font-bold text-white">${product.price.toFixed(2).replace('.', ',')} €</p>
                    <div class="flex flex-col gap-3 pt-4">
                        <button class="btn bg-gold border-none rounded-none w-full font-bold uppercase" id="modal-reserve">Reservar Mesa</button>
                        <button class="btn btn-ghost btn-sm opacity-40 uppercase" id="modal-close">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `; //
    productModal.querySelector("#modal-close").addEventListener("click", () => productModal.close());
    productModal.querySelector("#modal-reserve").addEventListener("click", () => {
        productModal.close();
        bookingModal.showModal();
    });
    productModal.showModal();
} //

// ###################################################################
//                       BOOKINGS MODAL
// ###################################################################

document.getElementById("btn-open-bookings-modal").addEventListener("click", () => bookingModal.showModal()); //

document.querySelectorAll(".close-bookings-modal").forEach(btn => {
    btn.addEventListener("click", () => bookingModal.close());
}); //

const bookingsForm = document.getElementById("form-reserva");
bookingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    bookingModal.close();
    bookingsForm.reset();
}); //

document.getElementById("nav-home").addEventListener("click", () => handleRouteChange("home")); //
document.getElementById("nav-sobre-nós").addEventListener("click", () => handleRouteChange("sobre-nós")); //