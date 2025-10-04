const card_container_query_id = 'cards_container';
const money_label_query_id = 'money-label';
const receipt_table_query_id = "receipt_table";

/**
 * Singleton class to control HTML elements.
 * @class
 */ 
class HtmlController {
    /**
     * Container in what will be built cards.
     * @type {HTMLElement}
     */
    buildingContainer;
    /**
     * Label that shows how much money was spent.
     * @type {HTMLElement}
     */
    moneyLabel;
    /**
     * Container for receipt table
     * @type {HTMLElement}
     */
    receiptContainer;

    /**
     * Creates a singleton of HtmlController.
     * @returns {HtmlController} The instance of the singleton
     */
    constructor(){
        if (!HtmlController.instance){
            HtmlController.instance = this;
            this.buildingContainer = document.getElementById(card_container_query_id);
            this.moneyLabel = document.getElementById(money_label_query_id);
            this.receiptContainer = document.getElementById(receipt_table_query_id);
        }
        return HtmlController.instance
    }

    /**
     * Gives the HTML layout of Bootstrap card with pasted value
     * @param {String} name 
     * @param {String} description 
     * @param {Int} cost 
     * @param {String} image 
     * @returns {String} The html string of the card
     */
    #getLayout(name, description, cost, image){
        let builded = '<div class = "col-4"> ';
        builded += '<div class="ratio" style="--bs-aspect-ratio: 120%;">';
        builded += '<div class = "card h-100">';
        builded += '<div class="ratio ratio-4x3">';
        builded += '<img src="../images/'+ image +'" class="card-img-top" style="object-fit: contain;"></div>';
        builded += '<div class = "card-body d-flex flex-column">';
        builded += '<h6 class = "card-title">'+ name +'</h5>';
        builded += '<div class = "card-text">'+ description +'</div>';
        builded += '<div class="mt-auto input-group">';
        builded += '<input type="number" class="form-control buyinput" style="width: 30px;" placeholder="0" min="0">';
        builded += '<button type="button" class = "btn btn-primary buybutton">'+ cost +'$</button>';
        builded += '</div></div></div></div></div>';
        return builded
    }

    /**
     * Builds a card and appends it to the building container.
     * @param {Object} data The data of the product to build the card for.
     * @return {HTMLElement} The built HTML element of the card.
     */
    buildCard(data){
        const builded = this.#getLayout(data.name, data.description, data.cost, data.image);

        const template = document.createElement('template');
        template.innerHTML = builded.trim();
        const element = template.content.firstElementChild;
        this.buildingContainer.appendChild(element);

        return element;
    }

    /**
     * Updates the money label to show the current amount of money spent.
     * @param {number} money The current amount of money spent.
     * @return {null} Nothing
     */
    showMoney(money){
        const formattedNumber = new Intl.NumberFormat('en-US').format(money); // this expression I have taken from outer sources
        const result = "Spent " + formattedNumber + "$";
        this.moneyLabel.innerHTML = result;
    }

    /**
     * redraws the receipt in the end of the page
     * @param {{name: string, total_price: int, amount: int}[]} check according to check Receipt will be drawn
     * @return {null} Nothing 
     */
    drawReceipt(check){
        let result = "";
        check.forEach((item, index) => {
            let line = "<label>" + item.name + " " + item.amount + "x - " + item.total_price + "$</label><br>";
            result += line;
        });
        this.receiptContainer.innerHTML = result;
    }
}
//singleton
export default new HtmlController();