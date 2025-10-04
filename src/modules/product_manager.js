 import { Product } from './product.js';

/**
 * Manages products, including loading, creating, and connecting them to the receipt system.
 * @class
 */
export class ProductManager {
    /**
     * An html ui Builder for products.
     * @type {Object}
     * @private
     */
    #CardBuilder;
    /**
     * Paramtres - How to build card, how much does they cost and all that jazz.
     * @type {Object}
     * @private
     */
    #productsParameters;
    /**
     * Already builded cards, contains an array of products.
     * @type {Object[]}
     */
    #products;

    /**
     * Creates an instance of product_manager and create an html for products.
     * @param {Object} CardBuilder The special output to the html.
     * @returns {null} Nothing
     */
    constructor(CardBuilder) {
        this.#CardBuilder = CardBuilder;
        this.#products = [];
    }   

    /**
     * Load products parametres for further work
     * @param {Object} ProductLoader 
     * @returns {ProductManager} Nothing
     */
    async loadProducts(ProductLoader) {
        try {
            for (let attempt = 0; attempt < 6; attempt++){
                try{
                    this.#productsParameters = await ProductLoader.load();
                    return;
                }
                catch (error){
                    console.warn(error + ". attempt -" + attempt);
                }
            }
            throw new Error("error: loading products failed");
        }
        catch (error){
            console.error("Loading products failed");   
            throw error;
        }
    }

    /**
     * this function creates products according to Loaded_products
     * @return {Object[]} an array of created products
     */
    produceProducts() {
        for (let i = 0; i < this.#productsParameters.Products.length; i++) { 
            const product_data = this.#productsParameters.Products[i];
            const HTML_representation = this.#CardBuilder.buildCard(product_data);
            const product = new Product(product_data, HTML_representation);
            this.#products.push(product);
        }
        return this.#products;
    } 
    /**
     * Connects products with receipt, so they can buy stuff
     * @param {ReceiptManager} Receipt The receipt that will handle the money and buying
     * @return {null} Nothing
     */
    connectProducts(Receipt) {
        if (!Receipt) { console.error("Error: Receipt was not recieved. The receipt itself - " + Receipt); return; }
        for (let i = 0; i < this.#products.length; i++) { 
            this.#products[i].connectButtons(Receipt);
        }
    }  
}
