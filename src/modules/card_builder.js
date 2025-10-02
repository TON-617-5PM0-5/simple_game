 class HtmlCardBuilder {
    buildingContainer;
    constructor(){
        if (!HtmlCardBuilder.instance){
            HtmlCardBuilder.instance = this;
            buildingContainer = document.getElementById('cards_container');
        }
        return HtmlCardBuilder.instance
    }

    buildCard(data){
        let builded = '<div class = "col-4"> ';
        builded += '<div class="ratio" style="--bs-aspect-ratio: 120%;">';
        builded += '<div class = "card h-100">';
        builded += '<img src="'+ data.image +'" class="card-img-top">';
        builded += '<div class = "card-body d-flex flex-column">';
        builded += '<h6 class = "card-title">'+ data.name +'</h5>';
        builded += '<div class = "card-text">'+ data.description +'</div>';
        builded += '<div class="mt-auto input-group">';
        builded += '<input type="number" class="form-control buyinput" style="width: 30px;" placeholder="0" min="0">';
        builded += '<button type="button" class = "btn btn-primary buybutton">'+ data.cost +'</button>';
        builded += '</div></div></div></div></div>';

        const template = document.createElement('template');
        template.innerHTML = builded.trim();
        const element = template.content.firstElementChild;
        document.body.appendChild(element);

        return element;
    }
}