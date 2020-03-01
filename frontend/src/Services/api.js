import axios from 'axios';

export const APIServices = {
    async getProductNames(){
        const res = await axios('http://localhost:4000/api/productDisplayNames');
        return res.data.displayNames.map(item =>
            ({...item, value: item.displayName, label: item.displayName}));
    },

    async getTags() {
        const res = await axios('http://localhost:4000/api/tags');
        return res.data.tags.map(item =>
            ({...item, value: item.tagName, label: item.tagName}));
    },

    async getRecipes(query='limit=10&page=1') {
        const res = await axios(`http://localhost:4000/api/recipes?${query}`);
        return res.data;
    },

    async getRecipeById(id) {
        const res = await axios(`http://localhost:4000/api/recipe?id=${id}`);
        return res.data;
    }
};

export default APIServices;