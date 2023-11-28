import { Api } from "./api";

class SearchService extends Api {
    async searchFromPrompt(prompt: string) {
        return this.getAPIGuest(`/searchbyprompt?prompt=${prompt}`)
    }

    async getItemDetail(itemId: number) {
        return this.getAPIGuest(`/itemdetail?id=${itemId}`)
    }
}

const searchService =  new SearchService();

export default searchService;