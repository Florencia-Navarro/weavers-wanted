const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const cleanContainer = (selector) => $(selector).innerHTML = '' 
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")
const addMarginL = (selector) => $(selector).classList.add("lg:ml-32")

let isSubmit = false


const getJobs = (filterName, filterValue) => {
    fetch(`https://649602f8b08e17c91792f028.mockapi.io/jobs${filterName && filterValue ? `?${filterName}=${filterValue}` : ""}`)
    .then(res => res.json())
    .then(jobs => {
        if (jobs.length > 0) {
            renderJobs(jobs)
          } else {
            cleanContainer("#cards-container")
            showElement("#no-results-message")
          }
    } 
)}

const getJob = (jobId) => {
    fetch(`https://649602f8b08e17c91792f028.mockapi.io/jobs/${jobId}`)
    .then(res => res.json())
    .then(job => {
        renderJobDetail(job)
        populateForm(job)
    })
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
const editJob = (jobId) => {
    fetch(`https://649602f8b08e17c91792f028.mockapi.io/jobs/${jobId}`, {
        method: "PUT",     
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveJobData())
    }).finally(() => window.location.reload())
}

const deleteJob = (jobId) => {
    fetch(`https://649602f8b08e17c91792f028.mockapi.io/jobs/${jobId}`, {
        method: "DELETE"
    }).finally(() => window.location.reload())
}

const saveCheckboxData = () => {
    let checkboxesSelected = []
    for (const checkbox of $$(".requested-techniques")){
        if (checkbox.checked){
            checkboxesSelected.push(checkbox.value)
        }
    }
    console.log(checkboxesSelected)
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
        salary: $("#salary").value,
        basicTechniques: saveCheckboxData(),
        locationAddress: $("#location-address").value,
        benefits: {
            obra_social: $("#health_ensurance").value,
            materiales_incluidos: $("#raw-material").value ? true : false
        }
    }
}

const populateForm = ( job) => {
    $("#job-name").value = job.jobName 
    $("#url-image").value = job.image
    $("#description-job").value = job.description
    $("#location-mode").value = job.location
    $("#location-address").value = job.locationAddress
    $("#category-select").value = job.category
    $("#experience").value = job.hasExperience
    $("#company-name").value = job.companyName
    $("#company-description").value = job.companyDescription
    $("#salary").value = job.salary
    $("#location-address").value = job.locationAddress
    $("#health_ensurance").value = job.benefits.obra_social
    $("#raw-material").value = job.benefits.materiales_incluidos
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
                                        <button class="btn-edit m-4 p-2 bg-[#E1A41F] rounded-md hover:bg-[#99490D] hover:shadow-md hover:shadow-[#DA991B] hover:text-white" data-id="${id}" onclick="getJob('${id}')">Ver detalle</button>
                                    </article>
                                </article>
                            </article>
                            </article>
                            </section>
                            
                            `

            for (const btn of $$(".btn-edit")){
                btn.addEventListener("click", () => {
                    hideElement("#filters-cont")
                })
            }

            }
                        
            hideElement("#spinner-cont")
        
        }, 2000)
    }
}

const renderJobDetail = ({ image, jobName, description, companyName, companyDescription, location, hasExperience, benefits: {obra_social, materiales_incluidos } ,id }) => {
    
    hideElement("#cards-container")
    showElement("#card-detail-cont")
    cleanContainer("#cards-container")
    
        $("#card-detail-cont").innerHTML += `
            <section class="my-3 mx-5">
                <article class="bg-white w-80 h-96 rounded-md border-l-8 border-blue-950 shadow-md shadow-blue-950"
                style="background-image: url('${image}');"
                >
                    <article class="w-full h-full bg-gradient-to-r from-[#08101F] from-10% to-transparent flex justify-end items-end relative">
                        <article class="bg-white w-11/12 pl-3.5 absolute -bottom-4 -right-4">
                            <h5 class="mb-2">${companyName}</h5>
                            <p class="text-xs">${companyDescription}</p>
                            <h3>Buscamos: ${jobName}</h3>
                            <p class="text-xs">${description}</p>
                            
                            <article class="flex justify-around">
                                <article class="w-full pb-1 flex flex-row justify-between">
                                    <article class="m-1 border-2 border-slate-100 rounded-md">
                                        <p class="mt-3 text-xs">
                                            <i class="fa-regular fa-building"></i>
                                            ${location}</p>
                                        <p class="text-xs"> 
                                            <i class="fa-solid fa-hammer"></i>
                                            ${hasExperience ? "Con experiencia" : "Sin experiencia"}</p>
                                    </article>
                                    <article class="m-1 border-2 border-slate-100 rounded-md">
                                        <p class="mt-3 text-xs ">
                                            Ofrecemos: 
                                            ${obra_social}. ${materiales_incluidos ? "Materiales incluidos" : ""} </p>
                                        
                                    </article> 
                                    <article class=" flex justify-end">
                                        <button class="btn-edit m-1 px-1 bg-[#E1A41F] rounded-md hover:bg-[#99490D] hover:shadow-md hover:shadow-[#DA991B] hover:text-white" data-id="${id}">Editar</button>
                                        <button class="btn-delete text-white m-1 px-1 bg-gradient-to-r from-[#08101F] to-[#507DBC] rounded-md hover:bg-[#99490D] hover:shadow-md hover:shadow-[#08101F] hover:text-white" data-id="${id}">Eliminar</button>
                                    </article>
                                </article>
                            </article>
                        </article>
                    </article>
                </article>
            </section>
        `
        for (const btn of $$(".btn-edit")) {
            btn.addEventListener("click", () => {
                hideElement("#card-detail-cont")
                hideElement("#add-job-btn")
                showElement("#add-job-form")
                showElement("#edit-form-btn")
                const jobId = btn.getAttribute("data-id")
                $("#edit-form-btn").setAttribute("data-id", jobId)
                isSubmit = false
            })
        } 
        
        for (const btn of $$(".btn-delete")){
            btn.addEventListener("click", () => {
                showElement("#modal-confirm-delete")
                $("#delete-company-job").innerHTML = companyName
                const jobId = btn.getAttribute("data-id")
                $("#modal-btn-delete").setAttribute("data-id", jobId)
            })
        }

    
}


const filterByCategory = () => {
    for (const btn of $$(".filter-btn-category")){
        
        btn.addEventListener("click", (e) => {
            console.log(e.target)
            filterValue = e.target.getAttribute("name")
            getJobs("category", filterValue)
           
        })
    }
}

const filterByExperience = () => {
    for (const btn of $$(".filter-btn-experience")){
        
        btn.addEventListener("click", (e) => {
            console.log(e.target)
            filterValue = e.target.getAttribute("name")
            getJobs("hasExperience", filterValue)
            
        })
    }
}

const filterByLocation = () => {
    for (const btn of $$(".filter-btn-location")){
        
        btn.addEventListener("click", (e) => {
            console.log(e.target)
            filterValue = e.target.getAttribute("name")
            getJobs("location", filterValue)
            
        })
    }
}

/* const filterJobs = () => {
    let filterName = ""
    let filterValue = ""

    console.log(filterName)
  
    for (const link of $$(".select-filter")) {
      link.addEventListener("click", (e) => {
        filterName = e.target.getAttribute("name").toString()
        console.log(filterName)
       

      })
    }
  
    for (const btn of $$(".filter-option")) {
      btn.addEventListener("click", (e) => {
        filterValue = e.target.getAttribute("name").toString()
        console.log(filterValue)
        getJobs(filterName, filterValue) 
    })
    }
    console.log(filterName)

  }  */
  


const initializeApp = () => {

    filterByCategory()
    filterByExperience()
    filterByLocation()


    $("#sidebar-open").addEventListener("click", () => {
        showElement("#sidebar-menu")
    })

    $("#sidebar-close").addEventListener("click", () => {
        hideElement("#sidebar-menu")
    })

    $("#filters-header-btn").addEventListener("click" , () => {
        showElement("#filters-header")
    })

    $("#close-filter-menu").addEventListener("click", () => {
        hideElement("#filters-header")

    })

    $(".category-filter-show").addEventListener("click", () => {
        showElement("#filters-cont")
        showElement("#category-filter")
        hideElement("#filters-header")
        hideElement("#experience-filter")
        hideElement("#location-filter")
        addMarginL("#main-cont-cards")

    })

    $("#category-filter-show2").addEventListener("click", () => {
        showElement("#filters-cont")
        showElement("#category-filter")
        showElement("#cards-container")
        hideElement("#sidebar-menu")
        hideElement("#filters-header")
        hideElement("#experience-filter")
        hideElement("#location-filter")
        hideElement("#card-detail-cont")

    })

    $(".experience-filter-show").addEventListener("click", () => {
        showElement("#filters-cont")
        showElement("#experience-filter")
        hideElement("#filters-header")
        hideElement("#category-filter")
        hideElement("#location-filter")
        addMarginL("#main-cont-cards")

    })

    $("#experience-filter-show2").addEventListener("click", () => {
        showElement("#filters-cont")
        showElement("#experience-filter")
        showElement("#cards-container")
        hideElement("#sidebar-menu")
        hideElement("#filters-header")
        hideElement("#category-filter")
        hideElement("#location-filter")
        hideElement("#card-detail-cont")


    })

    $(".location-filter-show").addEventListener("click", ()=> {
        showElement("#filters-cont")
        showElement("#location-filter")
        hideElement("#filters-header")
        hideElement("#category-filter")
        hideElement("#experience-filter")
        addMarginL("#main-cont-cards")
    })

    $("#location-filter-show2").addEventListener("click", ()=> {
        showElement("#location-filter")
        showElement("#filters-cont")
        showElement("#cards-container")
        hideElement("#sidebar-menu")
        hideElement("#filters-header")
        hideElement("#category-filter")
        hideElement("#experience-filter")
        hideElement("#card-detail-cont")

    })


    $("#add-job-form-show").addEventListener("click", () => {
        hideElement("#filters-cont")
        hideElement("#cards-container")
        hideElement("#card-detail-cont")
        hideElement("#filters-header")
        showElement("#add-job-form")
        isSubmit = true
    })

    $("#add-form-side-btn").addEventListener("click", () => {
        hideElement("#filters-cont")
        hideElement("#cards-container")
        hideElement("#sidebar-menu")
        hideElement("#card-detail-cont")
        showElement("#add-job-form")
    })

    /* $("#search-btn").addEventListener("click", () => {
        filterByCategory()
    })
 */
    $("#form").addEventListener("submit", (e) => {
        e.preventDefault()
        if(isSubmit){
            addJob()
        } else {
            const jobId = $("#edit-form-btn").getAttribute("data-id")
            editJob(jobId)
            hideElement("#add-job-form")
        }
        $("#form").reset()
    })

    $("#modal-btn-delete").addEventListener("click", () => {
        const jobId = $("#modal-btn-delete").getAttribute("data-id")
        deleteJob(jobId)
    })

    $("#modal-cancel-btn").addEventListener("click", () => {
        hideElement("#modal-confirm-delete")
    })

    $("#cancel-form-btn").addEventListener("click", () => {
        hideElement("#add-job-form")
        showElement("#cards-container")
    })

}

window.addEventListener("load", () => {
    initializeApp()
    getJobs()
    
})