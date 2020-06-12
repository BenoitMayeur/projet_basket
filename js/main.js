let shopping_cart_content = {};
let total_price = 0;
let total_amount_articles = 0;

let amount_articles = 0;
let local_amount_item = 0;
let id_article = 0;

//////////////////////////////////////////////////////////////////////////////////
////////////// QuerySelector

let input_amount_item = document.querySelector("input[name='amount_item']");
let button_validation = document.querySelector("input[name='button_validation']");

let description_item = document.querySelector(".description_item");
let aside_list_items = document.querySelector(".list_items");
let div_checkout = document.querySelector(".div_checkout");


let name_user = document.querySelector("h1[name='title_item']");
let image_item = document.querySelector("img[name='image_item']");
let author_item = document.querySelector("span[name='author_item']");
let country_item = document.querySelector("span[name='country_item']");
let price_item = document.querySelector("span[name='price_item']");
let comment_item = document.querySelector("p[name='comment_item']");


// Page Shopping - At the top of the aside bar on the right
let value_total_amount_articles = document.querySelector("span[name='total_amount_articles']");
let total_price_to_pay = document.querySelector("span[name='total_price_to_pay']");


// Page Basket - the two buttons under the table
let button_basket_chekckout = document.querySelector('div[name=button_previous_page]');
let empty_basket = document.querySelector('div[name=empty_basket]');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// Functions
///////////////

// Function under - Page Shopping: update the item displayed on the left part
function updateDataView(number){

    name_user.innerHTML = tab_img[number].titre;
    
    image_item.src = `./img/${tab_img[number].image.moyenne}`;


    author_item.innerHTML = tab_img[number].auteur;


    country_item.innerHTML = tab_img[number].Pays;


    price_item.innerHTML = tab_img[number].Prix;


    comment_item.innerHTML = tab_img[number].commentaire;

    input_amount_item.setAttribute('data-id', tab_img[number].id);
    input_amount_item.value = shopping_cart_content[number].quantite;
}


// Function under - Page Shopping/Basket: update of the quantity of an article in the basket
function updateAmountArticles(local_amount_item, id_article){

    for(article of shopping_cart_content){
        if(article.id == id_article){
            article.quantite = local_amount_item;
        }
    }
}


// Function under - Page Shopping: update the amount of articles visible on the screen
function updateTotalAmountArticle(){
    sum = 0;

    for(article of shopping_cart_content){
        sum = sum + parseInt(article.quantite);
    }

    
    value_total_amount_articles.innerHTML = sum;
}


// Function under - Page Shopping: update the total price to pay visible on the screen
function updateTotalPriceToPay(){
    total_to_pay =0;
    for(article of shopping_cart_content){
        total_to_pay = total_to_pay + (parseInt(article.quantite)*parseFloat(article.Prix));
    }

    total_price_to_pay.innerHTML = total_to_pay;
    total_price = total_to_pay;
}

shopping_cart_content = JSON.parse(JSON.stringify(tab_img));

for(article of shopping_cart_content){
    article.quantite = "0"; 

}

// Function under - Page Basket: the basket is displayed thanks to this function
function displayTheBasket(){
    list_line_table = document.querySelectorAll(".line_table");
    
    if(document.querySelectorAll(".line_table") != null){

        for(let i=0; i<list_line_table.length ; i++){
            list_line_table[i].remove();

        }
    }

//    document.querySelector(".line_table_total").remove();

    let variable_table = document.querySelector("table");
    message_basket_empty = document.querySelector(".message_basket_empty");

    for(article of shopping_cart_content){
        counter_lines = 1;
        if(article.quantite != 0){

            let line_table = document.createElement("TR");
            line_table.classList.add(`line_table`);
            line_table.setAttribute('data-line', counter_lines);

            variable_table.appendChild(line_table);

            let case_table_1 = document.createElement("TD");
            case_table_1.classList.add('case_table_1');
            line_table.appendChild(case_table_1);
            
            let image_item_table = document.createElement("IMG");
            image_item_table.src = `./img/${article.image.toute_petite}`;
            case_table_1.appendChild(image_item_table);

            let case_table_2 = document.createElement("TD");
            case_table_2.classList.add('case_table_2');
            line_table.appendChild(case_table_2);
            case_table_2.innerHTML = article.titre;

            let case_table_3 = document.createElement("TD");
            case_table_3.classList.add('case_table_3');
            line_table.appendChild(case_table_3);

            let input_case_table_3 = document.createElement("INPUT");
            input_case_table_3.classList.add('input_case_table_3');
            case_table_3.appendChild(input_case_table_3);
            input_case_table_3.setAttribute('data-id', article.id);
            input_case_table_3.setAttribute('min', '0');

            input_case_table_3.value = article.quantite;

            let case_table_4 = document.createElement("TD");
            case_table_4.classList.add('case_table_4');
            line_table.appendChild(case_table_4);
            case_table_4.innerHTML = article.Prix;

            let case_table_5 = document.createElement("TD");
            case_table_5.classList.add('case_table_4');
            line_table.appendChild(case_table_5);
            case_table_5.innerHTML = parseFloat(article.Prix)*parseFloat(article.quantite);
            
            counter_lines = counter_lines + 1;

        }
        else{
            
            console.log('Rien à afficher');

        } 
    }

    updateTotalPriceToPay();

    let line_table_total = document.createElement("TR");
    line_table_total.classList.add(`line_table`);
    variable_table.appendChild(line_table_total);

    let white_line_total = document.createElement("TD");
    white_line_total.classList.add('white_line_total');
    white_line_total.setAttribute('colspan', 3);
    line_table_total.appendChild(white_line_total);

    let text_total = document.createElement("TD");
    text_total.classList.add('td_total_price');
    line_table_total.appendChild(text_total);

    text_total.innerHTML = "Total";
    
    let td_total_price = document.createElement("TD");
    td_total_price.classList.add('td_total_price');
    line_table_total.appendChild(td_total_price);

    td_total_price.innerHTML = total_price;


    let list_input_case_table_3 = document.querySelectorAll('.input_case_table_3');

    for (let j = 0; j < list_input_case_table_3.length; j++){ 

        let input_case_3 = list_input_case_table_3[j]; 

        input_case_3.addEventListener("focusout", function() { 

            let id_taken = Number(input_case_3.getAttribute("data-id"));
            let quantity_taken = input_case_3.value;

            for(item of shopping_cart_content){

                
                if(item.id === id_taken){

                    item.quantite = quantity_taken;
                }
            }

            displayTheBasket();

            console.log(shopping_cart_content);
        }); 
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**********************************
*** THE CODE STARTS HERE
***********************************/
////////////////////////////////////

updateTotalAmountArticle();

updateDataView(0);


for(let i=0; i<Object.keys(tab_img).length; i++){
    let big_div_one_item = document.createElement("DIV");
    big_div_one_item.classList.add('div_one_item');
    big_div_one_item.setAttribute('data-id', i);
    document.querySelector(".list_items").appendChild(big_div_one_item);

    let div_img_one_item = document.createElement("DIV");
    div_img_one_item.classList.add('div_img_one_item');
    big_div_one_item.append(div_img_one_item);

    let small_img_side = document.createElement('img');
    small_img_side.classList.add('small_img_side');
    small_img_side.src = `./img/${tab_img[i].image.moyenne}`;
    div_img_one_item.append(small_img_side);

    let div_name_one_item = document.createElement('div');
    div_name_one_item.classList.add('div_name_one_item');
    big_div_one_item.append(div_name_one_item);

    div_name_one_item.innerHTML = tab_img[i].titre;

    let div_price_one_item = document.createElement('div');
    div_price_one_item.classList.add('div_price_one_item');
    big_div_one_item.append(div_price_one_item);

    div_price_one_item.innerHTML = tab_img[i].Prix;

}

// Thanks to the two lines under, the item with the id=0 will be clicked on the aside bar
let first_element = document.querySelector('.div_one_item[data-id="0"]');
first_element.classList.add('div_clicked');

// Code under: detect click on an element that has the class div_one_item
// ==> dectect when we click on an element on the aside bar

let list_big_div_one_item = document.querySelectorAll('.div_one_item');

for (let j = 0; j < list_big_div_one_item.length; j++) 
{ 

    let button = list_big_div_one_item[j]; 

    button.addEventListener("click", function() { 

        for(big_div_one_item of list_big_div_one_item){
            big_div_one_item.classList.remove('div_clicked');
        }

        let attribute_taken = button.getAttribute("data-id");

        list_big_div_one_item[j].classList.add('div_clicked');
        updateDataView(attribute_taken);
    }); 
}

button_validation.addEventListener("click", function() { 
    
    local_amount_item = parseInt(input_amount_item.value);

    alert(`${local_amount_item} photos de ${name_user.innerHTML} dans votre panier`);

    id_article = input_amount_item.getAttribute('data-id');

    updateAmountArticles(local_amount_item, id_article);

    updateTotalAmountArticle();

    updateTotalPriceToPay();

}); 

/*****************************************************************************
*     To go from one page to another
*/

big_div_basket = document.querySelector('.big_div_basket');

big_div_basket.addEventListener("click", function() { 

    description_item.classList.add('invisible');

    aside_list_items.classList.add('invisible');

    div_checkout.classList.remove('invisible');

    console.log(shopping_cart_content);

    displayTheBasket()
}); 

button_basket_chekckout.addEventListener("click", function() { 

    description_item.classList.remove('invisible');

    aside_list_items.classList.remove('invisible');

    div_checkout.classList.add('invisible');

    updateDataView(0);

    for(big_div_one_item of list_big_div_one_item){
        big_div_one_item.classList.remove('div_clicked');
    }

    let first_element = document.querySelector('.div_one_item[data-id="0"]');
    first_element.classList.add('div_clicked');
    

}); 

/**************************************
**** Page Basket: button to empty the basket
**************************************/

empty_basket.addEventListener("click", function() { 

    let confirmErase = confirm("Etes-vous sûr de vouloir vider votre panier?");
    if (confirmErase == true) {
        for(article of shopping_cart_content){
            article.quantite = "0"; 
        
        }
    
        displayTheBasket();
    } 
    
}); 
