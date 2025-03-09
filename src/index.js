const input = document.getElementById("input")

function addToInput(event){
    input.value += event
}
function clearInput(){
    input.value = ""
}
function backSpace(){
    input.value = input.value.slice(0,-1)
}
function Calculate(){
    try{
        input.value = eval(input.value)
    }
    catch{
        alert("خطا")
        clearInput()
    }
}
