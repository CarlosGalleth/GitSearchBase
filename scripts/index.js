


async function getData() {
    const inputSearch = document.getElementById("search-user")
    const submitBtn = document.getElementById("submit")
    const baseUrl = "https://api.github.com/users"

    await submitBtn.addEventListener('click', () => {
        fetch(`${baseUrl}/${inputSearch.value}`)
        .then(elem => elem.json())
        .then(elem => searchIsValid(elem))

        buttonAnimation(submitBtn)
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
}
function searchIsValid(elem) {
    const notFoundAlert = document.getElementsByClassName("not-found")[0]
    const inputSearch = document.getElementById("search-user")
    
    if (elem.message == "Not Found") {
        notFoundAlert.classList.remove("dont-show")
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
    const foundedList = document.getElementsByClassName("founded-recently-list")[0]
    let data = localStorage.getItem("usuario-recente")
    if (data) {
        let img = document.createElement("img")
        img.src = elem.avatar_url
        foundedList.append(img)
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