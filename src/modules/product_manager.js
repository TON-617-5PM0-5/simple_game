 import { Product } from './product.js';

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
    products;

    /**
     * Creates an instance of product_manager and create an html for products.
     * @param {Object} CardBuilder The special output to the html.
     * @returns {null} Nothing
     */
    constructor(CardBuilder) {
        this.#CardBuilder = CardBuilder;
    }

    /**
     * Load products parametres for further work
     * @param {Object} ProductLoader 
     * @returns {ProductManager} Nothing
     */
    async loadProducts(ProductLoader) {
        try{
            this.#productsParameters = await ProductLoader.load();
            return;
        }
        catch (error){
            console.warn(error);
            // trying to read
            // than notifying
        }
    }

    produceProducts() {
        for (let i = 0; i < this.#productsParameters.Products.length; i++) { 
            const product_data = this.#productsParameters.Products[i];
            const HTML_representation = this.#CardBuilder.buildCard(product_data);
            const product = new Product(product_data, HTML_representation);
            product.connectButtons();
        }
    }    
}

//export default ProductManager;