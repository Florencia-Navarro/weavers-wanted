const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)
const cleanContainer = (selector) => $(selector).innerHTML = '' 
const showElement = (selector) => $(selector).classList.remove("hidden")
const hideElement = (selector) => $(selector).classList.add("hidden")


const getJobs = () => {
    fetch("https://649602f8b08e17c91792f028.mockapi.io/jobs")
    .then(res => res.json())
    .then(jobs => console.log(jobs))
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

    $("#category-side-btn").addEventListener("click", () => {
        hideElement("#filters-container")
        hideElement("#cards-container")
        hideElement("#sidebar-menu")
        showElement("#add-job-form")
    })

    

}

window.addEventListener("load", initializeApp)