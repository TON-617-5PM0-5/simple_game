const buy_button_query_class = "buybutton"; 
const buy_input_query_class = "buyinput"; 
export class Product {
    #ProductManager;
    #name;
    #description;
    #price;
    #maxAmount = -1; // -1 means no limit
    HtmlElement;
    boughtAmount = 0;

    /**
     * Creates an instance of Product.
     * @param {Object} jsonOfProduct The name of the product.
     * @param {HTMLElement} HtmlElement The html element of the product.
     * @returns {null} Nothing
     */
    constructor(jsonOfProduct, HtmlElement) {   
        this.#name = jsonOfProduct.name;
        this.#description = jsonOfProduct.description;
        this.#price = jsonOfProduct.price; 
        this.#maxAmount = jsonOfProduct.max_amount;
        this.HtmlElement = HtmlElement;
    }

    connect_buttons(){
        let button = this.HtmlElement.getElementsByClassName(buy_button_query_class)[0];
        let input = this.HtmlElement.getElementsByClassName(buy_input_query_class)[0];

        button.addEventListener("click", ()=>{
            console.warn("Little serializer is not done");
            // make a serializer with product_manager
            if (this.#maxAmount == -1 || this.#maxAmount > this.boughtAmount + 1) {
                this.boughtAmount+=1;
                input.value = this.boughtAmount;
            }
        })
        input.addEventListener("change", ()=>{
            console.warn("Little serializer is not done");
            // make a serializer with product_manager
            if (this.#maxAmount > input.value){
                this.boughtAmount=input.value;
            }
            else {
                input.value = this.#maxAmount;
            }
        })
    }
}

//export default Product;