

function changeUser() {
    let btnBack = document.getElementsByClassName("button-change-user")[0]
    btnBack.addEventListener('click', () => {
        window.location.assign("../home/index.html")
    })
}
changeUser()

function renderizarInformacoes() {
    let user = localStorage.getItem("usuario-recente")
    let username = document.getElementById("user-name")
    let userDescription = document.getElementById("user-description")
    let userImg = document.getElementById("user-img")
    let btnEmail = document.getElementsByClassName("button-email")[0]

    let userParse = JSON.parse(user)
    
    username.innerText = userParse.name
    userDescription.innerText = userParse.bio
    userImg.src = userParse.avatar_url

    btnEmail.addEventListener('click', () => {
        btnEmail.href = userParse.html_url
    })

    fetch(userParse.repos_url)
    .then(elem => elem.json())
    .then(elem => renderizarRepos(elem))
}

function renderizarRepos(elem){
    let repos = document.getElementsByClassName("repositories")[0]

    elem.forEach(element => {

        let li = document.createElement("li")
        li.classList = "repository flex flex-col justify-center"
        let h3 = document.createElement("h3")
        h3.innerText = element.name
        let p = document.createElement("p")
        p.innerText = element.description
        let div = document.createElement("div")
        div.classList = "repository-buttons flex"
        let buttonRepo = document.createElement("button")
        buttonRepo.innerText = "Repositório"
        buttonRepo.classList = "btn-repository"
        let buttonDemo = document.createElement("button")
        buttonDemo.innerText = "Demo"

        div.append(buttonRepo, buttonDemo)
        li.append(h3, p, div)
        repos.append(li)
    }); 
}
renderizarInformacoes()



/*
<li class="repository flex flex-col justify-center">
    <h3>Project Module 2 - Kenzie...</h3>
    <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            In cum nemo, non saepe pariatur quasi dolorem deserunt
            tempore ea itaque eaque incidunt, nulla doloribus delectus
            culpa ipsam. Ad, quisquam porro.
    </p>
    <div class="repository-buttons flex"> 
        <button class="btn-repository">Repositório</button>
        <button>Demo</button>
    </div>
</li>
*/