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
function toggleSign(){
    if(input.value !== "0"){
        input.value = (parseFloat(input.value) * -1).toString()
    }
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
