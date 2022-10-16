


async function getData() {
    const notFoundAlert = document.getElementsByClassName("not-found")[0]
    const inputSearch = document.getElementById("search-user")
    const submitBtn = document.getElementById("submit")
    const baseUrl = "https://api.github.com/users"

    if (inputSearch.value == "") {
        submitBtn.disabled = true
    }

    inputSearch.addEventListener('input', () => {

        if (inputSearch.value == "") {
            submitBtn.disabled = true
            notFoundAlert.classList.add("dont-show")
        }
        else{
            submitBtn.disabled = false
        }
    })

    submitBtn.addEventListener('click', () => {

        if (inputSearch.value != "") {
            buttonAnimation(submitBtn) 
         }
         setTimeout(() => {
            fetch(`${baseUrl}/${inputSearch.value}`)
        .then(elem => elem.json())
        .then(elem => searchIsValid(elem))
         }, 1000)
    })
}
function buttonAnimation(btn){
    btn.innerText = ""
    const div = document.createElement("div")
    div.classList = "spinner"
    div.innerText = "•"
    btn.style.backgroundColor = "rgba(214, 51, 108, 0.4)"
    btn.style.cursor = "default"
    btn.append(div)
    
    setTimeout(() => {
        btn.innerText = "Ver perfil do github"
        btn.style.backgroundColor = "var(--color-brand-2)"
        btn.style.cursor = "pointer"
    }, 2000)
}
function searchIsValid(elem) {
    const notFoundAlert = document.getElementsByClassName("not-found")[0]
    const inputSearch = document.getElementById("search-user")
    if (elem.message == "Not Found") {
        notFoundAlert.classList.remove("dont-show");
    }
    else{
        notFoundAlert.classList.add("dont-show")
        localStorage.setItem("usuario-recente", JSON.stringify(elem))
        localStor(elem)
       
        window.location.assign("../profile/index.html") //---------------------------------------------------------------
    }
    if (inputSearch.value == "") {
        notFoundAlert.classList.add("dont-show") 
    }
    return elem
}
function localStor(elem) {
    let arrayFounded = []
    const foundedList = document.getElementsByClassName("founded-recently-list")[0]
    let data = localStorage.getItem("usuario-recente")
    if (data) {
        let img = document.createElement("img")
        img.src = elem.avatar_url

        arrayFounded.push(img)
        arrayFounded.forEach(element => {
            foundedList.append(element)
        })
    }
    if (foundedList.children.length > 3) {
        foundedList.children[0].remove()
    }
}

function renderizarEncontrados() {
    const foundedList = document.getElementsByClassName("founded-recently-list")[0]
    let has = JSON.parse(localStorage.getItem("usuario-recente"))
    if (has) {
        let img = document.createElement("img")
        img.src = has.avatar_url
        foundedList.append(img)
    }
}
renderizarEncontrados()
getData()
