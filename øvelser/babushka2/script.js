let dest = document.querySelector(".retContainer"),
    retter = [],
    kategori = "alle";
    document.addEventListener("DOMContentLoaded", hentJson);

// Hent data til HTML //
async function hentJson() {
    let jsonData = await fetch("json/menu.json");
        retter = await jsonData.json();
        visRetter();
        }

// Filtrering af retter //
document.querySelectorAll(".menu-item").forEach(knap => {
    knap.addEventListener("click", filter)
    });

function filter() {
    dest.textContent = "";
    kategori = this.getAttribute("data-kategori");
    visRetter();
    }

function visRetter() {
    let temp = document.querySelector(".retTemplate");
    let dest = document.querySelector(".retContainer");
            
    // Løb menuen igennem og lav en klon //
    retter.forEach(ret => {
    if (ret.kategori == kategori || kategori == "alle") {
        let klon = temp.cloneNode(true).content;

// Indsæt data i klonen //
klon.querySelector("[data-navn]").textContent = ret.navn;
klon.querySelector("[data-billede]").src = "imgs/small/" + ret.billede + "-sm.jpg";
klon.querySelector("[data-billede]").alt = "Billede af " + ret.navn;
klon.querySelector("[data-billede]").addEventListener("click", () => {
    visModal(ret);
                    });
                    klon.querySelector("[data-kortbeskrivelse]").textContent = ret.kortbeskrivelse;
                    klon.querySelector("[data-pris]").textContent = ret.pris;
                    klon.querySelector("[data-id]").setAttribute("data-id", ret.id);

                    // Placer klon i DOM //
                    dest.appendChild(klon);
                }
            });
    }

// Modal view af individuel ret //
function visModal(retten) {
    modal.classList.add("vis");
    modal.querySelector(".modal-navn").textContent = retten.navn;
    modal.querySelector(".modal-billede").src = retten.billede;
    modal.querySelector(".modal-billede").alt = "Foto af" + retten.navn;
    modal.querySelector("button").addEventListener("click", skjulModal);
    }

function skjulModal() {
    document.querySelector("#modal").classList.remove("vis");   
 }