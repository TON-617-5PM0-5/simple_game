class HtmlCardBuilder {
    buildingContainer;
    constructor(){
        if (!HtmlCardBuilder.instance){
            HtmlCardBuilder.instance = this;
            this.buildingContainer = document.getElementById('cards_container');
        }
        return HtmlCardBuilder.instance
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

    buildCard(data){
        const builded = this.#getLayout(data.name, data.description, data.cost, data.image);

        const template = document.createElement('template');
        template.innerHTML = builded.trim();
        const element = template.content.firstElementChild;
        this.buildingContainer.appendChild(element);

        return element;
    }
}
//singleton
export default new HtmlCardBuilder();