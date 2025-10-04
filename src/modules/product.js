const buy_button_query_class = "buybutton"; 
const buy_input_query_class = "buyinput"; 

/**
 * A product that can be bought.
 * @class
 */
export class Product {
    /**
     * A receipt manager, that will handle the money and buying
     * @type {ReceiptManager}
     * @private
     */
    #Receipt;
    /**
     * The id of the product.
     * @type {int}
     * @private
     */
    #id;
    /**
     * The name of the product.
     * @type {String}
     * @private
     */
    #name;
    /**
     * The description of the product.
     * @type {String}
     * @private
     */
    #description;
    /**
     * The price of the product.
     * @type {int}
     * @private
     */
    #price;
    /**
     * The maximum amount of the product that can be bought. -1 means no limit.
     * @type {int}
     * @private
     */
    #maxAmount;
    /**
     * The html element of the product.
     * @type {HTMLElement}
     * @private
     */
    #HtmlElement;
    /**
     * The amount of the product that has been bought.
     * @type {int}
     * @private
     */
    #boughtAmount;
    /**
     * The input field of the product.
     * @type {HTMLInputElement}
     * @private
     */
    #input;
    /**
     * The buy button of the product.
     * @type {HTMLButtonElement}
     * @private
     */
    #button;

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
        this.#price = jsonOfProduct.cost; 
        this.#maxAmount = jsonOfProduct.max_amount;
        this.#HtmlElement = HtmlElement;
        this.#boughtAmount = 0;
    }

    /**
     * Updates the input field to reflect the current bought amount.
     * @return {null} Nothing
     */
    #updateInput() {
        this.#input.value = this.#boughtAmount;
    }

    /**
     * Callback Handles the event when the buy button is clicked.
     * @return {null} Nothing
     */
    #OnBuyButton() {
            const goal_amount = parseInt(this.#boughtAmount) + 1;
            if ((this.#maxAmount == -1 || this.#maxAmount >= goal_amount) && goal_amount >= 0) {
                const transaction_response = this.#Receipt.buy(this, goal_amount);
                if (transaction_response){
                    this.#boughtAmount = goal_amount;
                    this.#updateInput();
                    this.#Receipt.reDrawReceipt();
                }
            }
            else {
                this.#input.value = this.#boughtAmount;
            }
    }
    /**
     * Callback Handles the event when the input field is changed.
     * @return {null} Nothing
     */
    #OnBuyInput() {
            const goal_amount = this.#input.value;
            if ((this.#maxAmount == -1 || this.#maxAmount >= goal_amount) && goal_amount >= 0){
                const transaction_response = this.#Receipt.buy(this, goal_amount);
                if (transaction_response) {
                    this.#boughtAmount = goal_amount;
                    this.#Receipt.reDrawReceipt();
                }
                else {
                    this.#updateInput();
                }
            }
            else {
                this.#input.value = this.#boughtAmount;
            }
    }

    getName (){
        return this.#name;
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

    /**
     * Connects the product with a receipt manager to handle buying and money.
     * @param {ReceiptManager} Receipt The receipt that will handle the money and buying
     * @return {null} Nothing
     */
    connectButtons(Receipt){
        if (this.#Receipt) { console.error("Error: Receipt is already connected"); return; }
        if (!Receipt) { console.error("Error: Receipt was not recieved. The receipt itself - " + Receipt); return; }
        this.#Receipt = Receipt;

        this.#button = this.#HtmlElement.getElementsByClassName(buy_button_query_class)[0];
        this.#input = this.#HtmlElement.getElementsByClassName(buy_input_query_class)[0];

        this.#button.addEventListener("click", this.#OnBuyButton.bind(this)); // .bind(this) - does the context saving
        this.#input.addEventListener("change", this.#OnBuyInput.bind(this)); // .bind(this) - does the context saving
    }
}
