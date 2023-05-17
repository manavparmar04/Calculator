
const keys = document.querySelectorAll('.key') // The querySelectorAll() method is a built-in JavaScript method that is used to select all the HTML elements that match the specified CSS selector.
const display_input = document.querySelector('.display .input') 
const display_output = document.querySelector('.display .output') 


let input = "";

for (let key of keys){
    const value = key.dataset.key        // Getting data "key" from html (data-key), targetting its key element

    key.addEventListener('click', ()=>{
        if (value == "clear"){
            input = "";
            display_input.innerHTML = ""; //property of HTML elements in JavaScript that represents the content of an element as HTML markup
            display_output.innerHTML = "";
        } else if (value == "backspace"){
            input = input.slice(0,-1);
            display_input.innerHTML = CleanInput(input); 
        } else if (value == "="){
            let result = eval(prepareInput(input));
            display_output.innerHTML = CleanOutput(result);
        } else if (value == "brackets"){
            if (
            input.indexOf("(")==-1 || 
            input.indexOf("(")!= -1 && 
            input.indexOf(")") != -1 &&
            input.lastIndexOf("(")< input.lastIndexOf(")")){ 
                input += "("
            //This if statement is checking if any 
            //opening parentheses "(" are missing from the input string or
            //iff the input string contains closing parentheses ")" and 
            //there are more closing parentheses than opening parentheses. 
            //If either of these conditions are met, then a opening 
            //parentheses "(" is appended to the end of the input string.
            } else if (
              input.indexOf("(")!= -1 &&
              input.indexOf(")")==-1 ||
              input.indexOf("(")!= -1 &&
              input.indexOf(")") != -1 &&
              input.indexOf("(") > input.indexOf(")")
              )
              {
                input += ")";


            //This else-if statement is checking if the input string 
            //contains any opening parentheses "(" but no closing 
            //parentheses ")". If this is the case, then a closing 
            //parentheses ")" is removed from the end of the input string.                 //Alternatively, if the input string contains both opening 
            //and closing parentheses and the index of the last opening
            //parentheses is greater than the index of the last closing 
            //parentheses, then a closing parentheses ")" is 
            //removed from the end of the input string.
            }
            display_input.innerHTML = CleanInput(input);


        } else{
            if (validation(value)){
                input += value;
            display_input.innerHTML = CleanInput(input);
                
            }
            
        }


    })
}

function CleanInput(input){
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*"){
            input_array[i] = ' <span class="operator">x</span> ';
        } else if (input_array[i] == "/") {
            input_array[i] = ' <span class = operator>÷</span> ';
        } else if (input_array[i] == "+") {
            input_array[i] = ' <span class = operator>+</span> ';
        } else if (input_array[i] == "-") {
            input_array[i] = ' <span class = operator>-</span> ';
        } else if (input_array[i] == "(") {
            input_array[i] = '<span class = brackets>(</span>';
        } else if (input_array[i] == ")") {
            input_array[i] = '<span class = brackets>)</span>';
        } else if (input_array[i] == "%") {
            input_array[i] = ' <span class = percent>%</span>  ';
        } 

    }

    return input_array.join("")
}

function CleanOutput(output){     
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];   // Splitting at the deicmal ex. 12.625, 12 [0] 625[1]
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if (output_array.length > 3){ // Checking to see if the length is greater than 3
        for (let i = output_array.length - 3; i > 0; i -= 3){ //Loop starts third to last and iterates backwards by 3 until it reaches the first index 
            output_array.splice(i, 0, ",")  // At each iteration we are placing a comma, basically adding comma at each current index
        }
    }

    if (decimal) {
        output_array.push(".");    // Appending decimal (if exist) to the list 
        output_array.push(decimal);  // Appending the numbers after the deicmal to the list 

    }

    return output_array.join("")


}


function validation(value){   // Making sure input is valid 
    let last_input = input.slice(-1);
    let operators = ["+", "-", "*", "/"];

    if (value == "." && last_input == "."){   // Making sure you cannot repeat back to back decimal placement 
        return False;
    }

    if (operators.includes(value)){
        if (operators.includes(last_input)){
            return False;
        } else{
            return True;
        }
    }

    return True;


}

function validation(value){   // Making sure input is valid 
    let last_input = input.slice(-1);
    let operators = ["+", "-", "*", "/"];
    
    if (value == "." && last_input == "."){   // Making sure you cannot repeat back to back decimal placement 
        return false;
    }


    if (operators.includes(value)){
        if (operators.includes(last_input)){
            return false;
        } else{
            return true;
        }
    }

    return true;


}

function prepareInput(input) {
    let input_array = input.split("");

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100"; // Will give the percentage value

        }

    }
    return input_array.join("");
}




const themetogglebtn = document.querySelector('theme.toggler')
const calculator = document.querySelector('.calculator')
const toggleicon = document.querySelector("toggler-icon")

let isDark = true;
themetogglebtn.oneclick = () => {
    calculator.classList.toggle("light")
    themetogglebtn.classList('active')
}

