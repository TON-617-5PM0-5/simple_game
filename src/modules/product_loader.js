export class ProductLoader {
    /**
     * Path to file which is filled with json string
     * @type {String}
     * @private
     */
    #file;

    /**
    * Creates an instance of product_loader.
    * @param {String} Path_to_file Path to file which is filled with json string
    * @returns {null} Nothing
    */
    constructor (Path_to_file) {
        this.#file = Path_to_file;
    }

    /**
     * Reads the file from the given path.
     * @return {String} The content of the file as a string.
     */
    async #read_file(){ 
        try {
            const res = await fetch(this.#file);
            const text = await res.text();
            return text;
        } catch (e) {
            console.error(e);
            throw e;
    }
    }

    /** 
    * load and parse the json.
    * @returns {Object} The parsed json of all products
    */
    async load() {
        let parsed_json;
        try{
            const file_filling = await this.#read_file();
            if (!file_filling) throw new Error("Parsed value was not defined. value - " + file_filling);

            parsed_json = JSON.parse(file_filling);
        }
        catch (catchedError){
            console.warn("Parsing error: " + catchedError);
            throw catchedError;
        }
        return parsed_json;
    }
}
