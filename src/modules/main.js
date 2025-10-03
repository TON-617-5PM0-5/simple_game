import { ProductLoader } from "./product_loader.js";
import HtmlCardBuilder from "./card_builder.js";
import { ProductManager } from "./product_manager.js";

//const file = require("../json/products.json"); - work only in node js ...

class Main {
    static async main() {
        const json_loader = new ProductLoader('./json/products.json');
        const card_builder = HtmlCardBuilder;
        const product_manager = new ProductManager(card_builder);
        await product_manager.loadProducts(json_loader);
        product_manager.produceProducts();
    }
}

Main.main();