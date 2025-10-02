class ProductLoader {
    #json;
    /**
    * Creates an instance of product_loader.
    * @param {String} json The json of all products
    * @returns {null} Nothing
    */
    constructor (json) {
        this.#json = json;
    }

    /** 
    * load and parse the json.
    * @returns {Object} The parsed json of all products
    */
    load() {
        let parsed_json;
        try{
            if (!this.#json) throw new Error("Parsed value was not defined. value - " + this.#json);

            parsed_json = JSON.parse(this.#json);
        }
        catch (catchedError){
            console.warn("Parsing error: " + catchedError + ". the pre_defined value will be return");
            throw catchedError;
        }
        return parsed_json;
    }
}