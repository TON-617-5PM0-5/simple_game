import { ProductLoader } from "./product_loader.js";
import HtmlController from "./HTML_controller.js";
import { ProductManager } from "./product_manager.js";
import ReceiptManager from "./receipt.js";

//const file = require("../json/products.json"); - work only in node js ...
const startingMoney = 100000000000;

class Main {
    static async main() {
        const json_loader = new ProductLoader('./json/products.json');
        const HTML_controller = HtmlController;
        const product_manager = new ProductManager(HTML_controller);
        await product_manager.loadProducts(json_loader);
        const products = product_manager.produceProducts();
        const receipt = new ReceiptManager(products, HTML_controller, startingMoney);
        product_manager.connectProducts(receipt);
    }
}

Main.main();