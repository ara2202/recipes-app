import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api/',
  timeout: 5000,
});

export const APIServices = {
  async getProductNames() {
    const res = await axios('http://localhost:4000/api/productDisplayNames');
    return res.data.displayNames.map(item => ({
      ...item,
      value: item.displayName,
      label: item.displayName,
    }));
  },

  async getTags() {
    const res = await axios('http://localhost:4000/api/tags');
    return res.data.tags.map(item => ({
      ...item,
      value: item.tagName,
      label: item.tagName,
    }));
  },

  getTagsCollection() {
    return instance.get('tagsCollection');
  },

  getRecipes(query = 'limit=10&page=1') {
    return axios(`http://localhost:4000/api/recipes?${query}`);
  },

  getRecipeById(id) {
    return axios(`http://localhost:4000/api/recipe?id=${id}`);
  },
};

export default APIServices;
