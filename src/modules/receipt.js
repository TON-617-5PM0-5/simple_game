/**
 * @classdesc Represent what client has bought, and counts the money
 */
class ReceiptManager {
    /**
     * Balance of the account.
     * @type {number}
     * @private
     */
    #money
    /**
     * Products, Usually is a pointer to Product manager's Product list.
     * @type {Object[]}
     * @private 
     */
    #products
    /**
     * Give forces to control the HMTL
     * @type {HtmlController}
     * @private
     */
    #HtmlController;
    
    /**
     * Creates an instance of ReceiptManager.
     * @param {Product} products Usually is a pointer to Product manager's Product list.
     * @param {HtmlController} HTML_controller Give forces to control the HMTL
     * @returns {ReceiptManager} I think you can guess what does the constructor return
     */
    constructor (products, HTML_controller, startingMoney) {
        this.#money = startingMoney
        this.#products = products
        this.#HtmlController = HTML_controller;
    }

    /**
     * Check if the client can buy the product
     * @param {Product} Product of the item client want to buy
     * @param {int} to_amount bought amount will be setted to 
     * @returns {boolean} True if can buy, false otherwise
     */
    buy(product, to_amount){
        const current_bought_amount = product.getBoughtAmount();
        const price = product.getCost();
        const money_on_buy = (to_amount - current_bought_amount) * price;
        if (this.#money >= money_on_buy) {
            this.#money -= money_on_buy;
            this.updateMoney()
            return true;
        }
        return false;
    }

    /**
     * Updates UI of money through HTML_controller
     * @return {null} Nothing
     */
    updateMoney(){
        this.#HtmlController.showMoney(this.#money);
    }

    drawReceipt(){
        
    }
}

export default ReceiptManager;