import IndexedDB from '@/utils/indexedDB.js'

const db = new IndexedDB('UserDatabase', 1)

class Category{

  constructor(){
    this.tableName = 'categories'
  }

  async getById(id) {
    return await db.get(this.tableName, id)
  }

  async loadCategories() {
    return await db.getAll('categories')
  }

  add(category) {

  }
}

export default Category