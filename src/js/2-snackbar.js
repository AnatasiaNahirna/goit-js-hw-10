import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", makePromise);

function makePromise(ev) {
    ev.preventDefault()
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => { 
            if (form.elements.state.value === "fulfilled") {
            resolve(iziToast.show({
                message: `✅ Fulfilled promise in ${form.elements.delay.value}ms`,
                backgroundColor: "#59A10D",
                messageColor: "#fff",
                position: "topRight",
            }))
            } else {
                reject(iziToast.show({
                message: `❌ Rejected promise in ${form.elements.delay.value}ms`,
                backgroundColor: "#EF4040",
                messageColor: "#fff",
                position: "topRight",
            }))
            }
        }, form.elements.delay.value)
        }
    )
}