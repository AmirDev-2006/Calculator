const input = document.getElementById("input");


function historyButton() {
    if (document.getElementById('box').classList.contains('flex')) {
        document.getElementById('box').classList.add("display");
        document.getElementById('box').classList.remove('flex');
        document.getElementById("text").classList.add("flex");
        document.getElementById("text").classList.remove("display");
        fetchHistoryFromBackend();
    } else {
        document.getElementById('box').classList.add('flex');
        document.getElementById('box').classList.remove('display');
        document.getElementById("text").classList.add("display");
        document.getElementById("text").classList.remove("flex");
    }
}
function addToInput(event) {
    input.value += event;
}
function clearInput() {
    input.value = "";
}
function backSpace() {
    input.value = input.value.slice(0, -1);
}
function toggleSign() {
    if (input.value !== "0") {
        input.value = (parseFloat(input.value) * -1).toString();
    }
}
async function Calculate() {
    try {
        const newValue = eval(input.value);
        const operation = `${input.value} = ${newValue}`;
        input.value = newValue;
        await sendToBackend(operation);
        fetchHistoryFromBackend();
    } catch (error) {
        alert("خطا");
        clearInput();
    }
}
async function sendToBackend(operation) {
    try {
        const response = await fetch('https://yl1-ingenious-pascal.circumeo-apps.net/api/calculator/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ expression: operation })
        });
        if (!response.ok) {
            throw new Error('ارسال به بک‌اند ناموفق بود');
        }
        const data = await response.json();
        console.log('ارسال موفق:', data);
    } catch (error) {
        console.error('خطا در ارسال:', error);
    }
}
async function fetchHistoryFromBackend() {
    try {
        const response = await fetch('https://yl1-ingenious-pascal.circumeo-apps.net/api/calculator/');
        if (!response.ok) {
            throw new Error('دریافت هیستوری ناموفق بود');
        }
        const data = await response.json();
        console.log('هیستوری:', data);
        updateHistory(data);
    } catch (error) {
        console.error("خطا در دریافت هیستوری:", error);
    }
}
function updateHistory(historyArray) {
    const historyDiv = document.getElementById("text");
    historyDiv.innerHTML = "";
    const h = document.createElement('h1');
    h.classList.add('HISTORY');
    h.textContent = "History";
    historyDiv.appendChild(h);

    historyArray.forEach(item => {
        const p = document.createElement("p");
        p.classList.add('histext');
        p.textContent = item.expression;
        historyDiv.appendChild(p);
    });
}