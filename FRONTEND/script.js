import { toastify } from "./toastify.js"
import { baseUrl } from "./api.js"
const myHeaders = {
    "Content-Type": "application/json",
};

async function login() {
    const inputEmail = document.querySelector("#input-email")
    const inputPassword = document.querySelector("#input-password")
    const user = {
        email: inputEmail.value,
        password: inputPassword.value
    }
    const bodyJson = JSON.stringify(user)
    const resLogin = await fetch(
        `${baseUrl}/login`,
        {

            headers: myHeaders,
            method: "POST",
            body: bodyJson
        }
    )
    if (resLogin.status == 200) {
        const resJson = await resLogin.json()
        toastify("Ok, login efetuado com sucesso!", "ok")
        localStorage.setItem("@token-exemplo", resJson.accessToken)
        localStorage.setItem("@user-exemplo", JSON.stringify(resJson.user))
        setTimeout(() => {
            window.location.href = "/home"
        }, 3000)
    } else {
        toastify("Email ou senha incorretos", "error")
    }
}

const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    login()
})
