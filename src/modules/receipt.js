import { Product } from './product.js';

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
     * Creates an instance of ReceiptManager.
     * @param {Product} products Usually is a pointer to Product manager's Product list.
     * @returns {ReceiptManager} I think you can guess what does the constructor return
     */
    constructor (products) {
        this.#products = products
    }

    /**
     * Check if the client can buy the product
     * @param {Product} Product of the item client want to buy
     * @param {int} to_amount bought amount will be setted to 
     * @returns {boolean} True if can buy, false otherwise
     */
    buy(Product, to_amount){
        const current_bought_amount = Product.getBoughtAmount();
        const price = Product.getCost();
        const money_on_buy = (to_amount - current_bought_amount) * price;
        if (this.#money >= money_on_buy) {
            this.#money -= money_on_buy;
            return true;
        }
        return false;
    }
}

export default ReceiptManager;