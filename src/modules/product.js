const buy_button_query_class = "buybutton"; 
const buy_input_query_class = "buyinput"; 
class Product {
    #name;
    #description;
    #price;
    #max_amount = -1; // -1 means no limit
    html_element;
    bought_amount = 0;

    /**
     * Creates an instance of Product.
     * @param {Object} json_of_product The name of the product.
     * @param {HTMLElement} html_element The html element of the product.
     * @returns {null} Nothing
     */
    constructor(json_of_product, html_element) {   
        this.name = json_of_product.name;
        this.description = json_of_product.description;
        this.price = json_of_product.price; 
        this.max_amount = json_of_product.max_amount;
        this.html_element = html_element;
    }

    connect_buttons(){
        let button = html_element.getElementsByClassName(buy_button_query_class)[0];
        let input = html_element.getElementsByClassName(buy_input_query_class)[0];

        button.AddEventListener("click", ()=>{
            console.warn("Little serializer is not done");
            // make a serializer with product_manager
            if (this.#max_amount == -1 || this.#max_amount > this.bought_amount + 1) {
                this.bought_amount+=1;
                input.value = this.bought_amount;
            }
        })
        input.AddEventListener("change", ()=>{
            console.warn("Little serializer is not done");
            // make a serializer with product_manager
            if (this.#max_amount > input.value){
                this.bought_amount=input.value;
            }
            else {
                input.value = this.#max_amount;
            }
        })
    }
}

