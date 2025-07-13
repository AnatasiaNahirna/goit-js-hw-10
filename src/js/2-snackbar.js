import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", makePromise);

function makePromise(ev) {
    ev.preventDefault()
    const seconds = form.elements.delay.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (form.elements.state.value === "fulfilled") {
                resolve(seconds);
            } else {
                reject(seconds);
            }
        }, form.elements.delay.value)
    });
    promise.then(() => {
        iziToast.show({
            message: `✅ Fulfilled promise in ${seconds}ms`,
            backgroundColor: "#59A10D",
            messageColor: "#fff",
            position: "topRight",
        });
    }).catch(() => {
        iziToast.show({
            message: `❌ Rejected promise in ${seconds}ms`,
            backgroundColor: "#EF4040",
            messageColor: "#fff",
            position: "topRight",
        });
    });
}