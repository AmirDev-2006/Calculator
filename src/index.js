const input = document.getElementById("input");

function historyButton() {
    if (document.getElementById('box').classList.contains('flex')) {
        document.getElementById('box').classList.add("display");
        document.getElementById('box').classList.remove('flex');
        document.getElementById("text").classList.add("flex");
        document.getElementById("text").classList.remove("display");
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
const history = [];
function Calculate() {
    try {
        const newValue = eval(input.value);
        const opration = `${input.value} = ${newValue}`; 
        history.push(opration);
        input.value = newValue
        ShowHistory();
        updateHistory()
    } catch {
        alert("خطا");
        clearInput();
    }
}
async function ShowHistory() {
    for (const item of history) {
        console.log(item); 

        try {
            const response = await fetch('https://yl1-ingenious-pascal.circumeo-apps.net/api/calculator/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    expression: item 
                })
            });

            const data = await response.json();
            console.log('ارسال شد', data);
        } catch (error) {
            console.error('خطا', error);
        }
    }

    try {
        const response = await fetch('https://yl1-ingenious-pascal.circumeo-apps.net/api/calculator/');
        const data = await response.json();
        data.forEach(item => console.log(item.expression))
    } catch (error) {
        console.error("خطا", error);
    }
}
function updateHistory(){
    const historyDiv = document.getElementById("text")
    historyDiv.innerHTML =""
    const h = document.createElement('h1')
    h.classList.add('HISTORY')
    h.textContent = "History"
    historyDiv.appendChild(h)

    history.forEach(item => {
        const p = document.createElement("p")
        p.classList.add('histext')
        p.textContent = item
        historyDiv.appendChild(p)
    });
}