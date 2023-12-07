export function toastify(message, type){
    const body  = document.body
    body.insertAdjacentHTML("afterbegin",`
    <div class="toastify">
        <img src="./checkbox-circle-line.png" alt="">
        <p>${message}</p>
    </div>
    `)
    if(type == "error"){
        const toast = document.querySelector(".toastify")
        toast.classList.add("error")
    }
}