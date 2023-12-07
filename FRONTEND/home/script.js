const myHeaders = {
    "Content-Type": "application/json",
};

async function selectProducts() {
    const products = await fetch("http://localhost:3001/products")
    const productsJson = await products.json()
    const selectProduct = document.querySelector("#select-product")
    productsJson.forEach(product => {
        selectProduct.insertAdjacentHTML("beforeend", `
            <option value="${product.id}">${product.nome}</option>
        `)
    })
} selectProducts()
async function renderProducts() {
    const products = await fetch("http://localhost:3001/products")
    const productsJson = await products.json()
    const ulProduct = document.querySelector('#ul-product')
    productsJson.forEach(product => {
        ulProduct.insertAdjacentHTML("beforeend", `
                <li>${product.nome}</li>
                <li><a href="/changeProduct/index.html">Editar Produto</a></li>
        `)
    })

    const month = new Date().getUTCMonth()
    const day = new Date().getUTCDay()
    const resLucro = await fetch(`http://localhost:3001/sale`)
    const lucroJson = await resLucro.json()

    let lucroDiario = 0
    let despesasDiarias = 0
    let vendasTotaisDiarias = 0
    lucroJson.forEach(profit => {
        if (profit.day === day && profit.month === month) {
            console.log(profit)
            lucroDiario += vendasTotaisDiarias - despesasDiarias
            vendasTotaisDiarias += profit.value
        }
    })
    const divDayLucro = document.querySelector("#div-day")
    divDayLucro.insertAdjacentHTML("beforeend", `
        <label for="input-dayLucro">Lucro de hoje</label>
        <input type="text" value="${lucroDiario}" name="input-day" id="input-dayLucro" placeholder="Lucro diário" readonly>
        <label for="input-dayDespesas">Despesas de hoje</label>
        <input type="text" value="${despesasDiarias}" name="input-day" id="input-dayDespesas" placeholder="Despesas diárias" readonly>
        <label for="input-dayVendasTotais">Vendas totais de hoje</label>
        <input type="text" value="${vendasTotaisDiarias} "name="input-day" id="input-dayVendastotais" placeholder="Vendas totais" readonly>
    `)

    let lucrosMensais = 0
    let despesasMensais = 0
    let vendasTotaisMensais = 0
    lucroJson.forEach(profit => {
        if (profit.month == month) {
            vendasTotaisMensais += profit.value
        }
    })
    const divMonthLucro = document.querySelector("#div-month")
    divMonthLucro.insertAdjacentHTML("beforeend", `
        <label for="input-monthLucro">Lucro do mês</label>
        <input type="text" value="${lucrosMensais}" name="input-month" id="input-monthLucro" placeholder="Lucro mensal" readonly>
        <label for="input-monthDespesas">Despesas do mês</label>
        <input type="text" value="${despesasMensais}" name="input-month" id="input-monthDespesas" placeholder="Despesas mensais" readonly>
        <label for="input-monthVendasTotais">Vendas totais do mês</label>
        <input type="text" value="${vendasTotaisMensais}" name="input-month" id="input-monthVendasTotais" placeholder="Vendas totais" readonly>
        <label for="input-monthTaxes">Custos fixos mensais</label>
        <input type="text" value="2550" name="input-month" id="input-monthTaxes" placeholder"Custos fixos" readonly>
    `)
} renderProducts()
async function sale() {
    const selectProduct = document.querySelector("#select-product").value
    const quantity = document.querySelector("#input-quantity").value
    const product = await fetch(`http://localhost:3001/products/${selectProduct}`)
    const productJson = await product.json()
    const month = new Date().getUTCMonth()
    const day = new Date().getUTCDay()
    const saleValue = parseInt(quantity) * parseInt(productJson.lucro)
    const sale = {
        "produto": productJson.id,
        "day": day,
        "month": month,
        "value": saleValue,
    }
    const bodyJson = JSON.stringify(sale)
    const resSale = await fetch(
        "http://localhost:3001/sale",
        {
            headers: myHeaders,
            method: "POST",
            body: bodyJson
        }
    )
}
const form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    sale()
})