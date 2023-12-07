async function register() {
    const myHeaders = {
        "Content-Type": "application/json",
    };
    const inputDescription = document.querySelector("#input-description")
    const inputValue = document.querySelector("#input-value")
    const inputSell = document.querySelector('#input-sell')
    const product = {
        nome: inputDescription.value,
        custo: parseInt(inputValue.value),
        preco: parseInt(inputSell.value),
        lucro: inputSell.value - inputValue.value
    }
    console.log(product)
    const bodyJson = JSON.stringify(product)
    const res = await fetch(
        "http://localhost:3001/products", {
            headers: myHeaders,
            method: "POST",
            body: bodyJson
        }
    )
    if (res.status == 200) {
        const resJson = await res.json()
        localStorage.setItem("@token-exemplo", resJson.accessToken)
        localStorage.setItem("@user-exemplo", JSON.stringify(resJson.user))
        setTimeout(() => {
            window.location.href = "./home"
        }, 3000)
    } else {
        console.log("Algo deu errado!")
    }
}
const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    register()
})