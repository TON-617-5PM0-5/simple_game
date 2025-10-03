import ReceiptManager from "./receipt.js";

const buy_button_query_class = "buybutton"; 
const buy_input_query_class = "buyinput"; 
export class Product {
    /**
     * A receipt manager, that will handle the money and buying
     * @type {ReceiptManager}
     * @private
     */
    #Receipt;
    #id;
    #name;
    #description;
    #price;
    #maxAmount = -1; // -1 means no limit
    #HtmlElement;
    #boughtAmount = 0;

    /**
     * Creates an instance of Product.
     * @param {Object} jsonOfProduct The name of the product.
     * @param {HTMLElement} HtmlElement The html element of the product.
     * @returns {Product} I think you can guess what does the constructor return
     */
    constructor(jsonOfProduct, HtmlElement) {   
        this.#id = jsonOfProduct.id;
        this.#name = jsonOfProduct.name;
        this.#description = jsonOfProduct.description;
        this.#price = jsonOfProduct.price; 
        this.#maxAmount = jsonOfProduct.max_amount;
        this.#HtmlElement = HtmlElement;
    }

    #updateInput() {
        input.value = this.#boughtAmount;
    }

    #OnBuyButton() {
            console.warn("Little serializer is not done");
            // make a serializer with product_manager
            const goal_amount = this.#boughtAmount + 1;
            if (this.#maxAmount == -1 || this.#maxAmount > goal_amount) {
                const transaction_response = this.#Receipt.buy(this, goal_amount);
                if (transaction_response){
                    this.#boughtAmount = goal_amount;
                    this.#updateInput();
                }
            }
    }

    #OnBuyInput() {
            console.warn("Little serializer is not done");
            // make a serializer with product_manager
            const goal_amount = input.value;
            if (this.#maxAmount == -1 || this.#maxAmount > input.value){
                const transaction_response = this.#Receipt.buy(this, goal_amount);
                if (transaction_response) {
                    this.#boughtAmount = goal_amount;
                }
                else {
                    this.#updateInput();
                }
            }
            else {
                input.value = this.#maxAmount;
            }
    }

    getBoughtAmount(){
        return this.#boughtAmount;
    }

    getId() {
        return this.#id;
    }

    getCost() {
        return this.#price;
    }

    connectButtons(Receipt){
        if (this.#Receipt) console.error("Error: Receipt is already connected");
        if (!Receipt) console.error("Error: Receipt was not recieved. The receipt itself - " + Receipt);
        this.#Receipt = Receipt;

        let button = this.#HtmlElement.getElementsByClassName(buy_button_query_class)[0];
        let input = this.#HtmlElement.getElementsByClassName(buy_input_query_class)[0];

        button.addEventListener("click", this.#OnBuyButton);
        input.addEventListener("change", this.#OnBuyInput);
    }
}

//export default Product;