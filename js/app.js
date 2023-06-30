const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const cleanContainer = (selector) => $(selector).innerHTML = '' 
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")


const getJobs = () => {
    fetch("https://649602f8b08e17c91792f028.mockapi.io/jobs")
    .then(res => res.json())
    .then(jobs => renderJobs(jobs))
}

const addJob = () => {
    fetch("https://649602f8b08e17c91792f028.mockapi.io/jobs", {
        method: "POST",     
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveJobData())
    })
}

const saveJobData = () => {
    return{
        jobName: $("#job-name").value,
        image: $("#url-image").value,
        description: $("#description-job").value,
        location: $("#location-mode").value,
        locationAddress: $("#location-address").value,
        category: $("#category-select").value,
        hasExperience: $("#experience").value,
        companyName: $("#company-name").value,
        companyDescription: $("#company-description").value,
        benefits: {
            health_ensurance: $("#health_ensurance").value,
            material_paid: $("#raw-material").value
        },
        salary: $("#salary").value,
        basicTechniques: ["crochet", "tricot", "macrame", "telar"]
    }
}

const renderJobs = (jobs) => {
    showElement("#spinner-cont")
    
    if (jobs) {
        cleanContainer("#cards-container")
        setTimeout(() => {
            for (const { image, jobName, companyName, companyDescription, location, hasExperience,id } of jobs){
                
                $("#cards-container").innerHTML += `
                
                    <section class="my-3 mx-5">
                        <article class="bg-white w-96 h-96 m-5 mx-auto rounded-md border-l-8 border-blue-950 shadow-md shadow-blue-950 flex flex-col">
                            <article>
                                <figure>
                                <img class="object-cover w-full h-48" src="${image}" alt="${jobName}">
                                </figure>
                            </article>
                            <article class="m-2 gap-1 ">
                                <h5 class="mb-3">${companyName}</h5>
                                <h3 >${jobName}</h3>
                                <p class="text-xs">${companyDescription}</p>
                                <article class="w-full flex flex-row justify between">
                                    <article class="w-2/4">
                                    <p class="mt-3 text-xs">
                                    <i class="fa-regular fa-building"></i>
                                    ${location}</p>
                                    <p class="text-xs"> 
                                            <i class="fa-solid fa-hammer"></i>
                                            ${hasExperience ? "Con experiencia" : "Sin experiencia"}</p>
                                    </article>
                                    <article class="w-2/4 flex justify-end">
                                        <button class="m-4 p-2 bg-[#E1A41F] rounded-md hover:bg-[#99490D] hover:shadow-md hover:shadow-[#DA991B] hover:text-white" data-id=""${id}>Ver detalle</button>
                                    </article>
                                </article>
                            </article>
                            </article>
                            </section>
                            
                            `
            }
                        
            hideElement("#spinner-cont")
        
        }, 2000)
    }
}

const initializeApp = () => {

    $("#sidebar-open").addEventListener("click", () => {
        showElement("#sidebar-menu")
    })

    $("#sidebar-close").addEventListener("click", () => {
        hideElement("#sidebar-menu")
    })


    $("#add-job-form-show").addEventListener("click", () => {
        hideElement("#filters-container")
        hideElement("#cards-container")
        showElement("#add-job-form")
    })

    $("#add-form-side-btn").addEventListener("click", () => {
        hideElement("#filters-container")
        hideElement("#cards-container")
        hideElement("#sidebar-menu")
        showElement("#add-job-form")
    })

    
}
    $("#form").addEventListener("submit", (e) => {
        e.preventDefault()
        addJob()
        $("#form").reset()
    })

window.addEventListener("load", () => {
    initializeApp()
    getJobs()
})