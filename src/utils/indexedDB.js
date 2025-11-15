class IndexedDB {
  constructor(dbName, version = 2) {
    this.dbName = dbName
    this.version = version
    this.db = null
  }

  // 打开数据库
  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }

      // 数据库升级时创建对象存储空间
      request.onupgradeneeded = (event) => {
        const db = event.target.result

        // 如果不存在 users 存储空间，则创建
        if (!db.objectStoreNames.contains('search_engines')) {
          const store = db.createObjectStore('search_engines', {
            keyPath: 'id',
            autoIncrement: true,
          })
          // store.createIndex('key', 'name', { unique: false });
          // store.createIndex('email', 'email', { unique: true });
        }

        // 如果不存在 分类 存储空间，则创建
        if (!db.objectStoreNames.contains('categories')) {
          const store = db.createObjectStore('categories', {
            keyPath: 'id',
            autoIncrement: true,
          })
        }

        if (!db.objectStoreNames.contains('friendship_links')) {
          const store = db.createObjectStore('friendship_links', {
            keyPath: 'id',
            autoIncrement: true,
          })
        }
        if (!db.objectStoreNames.contains('bookmarks')) {
          const store = db.createObjectStore('bookmarks', {
            keyPath: 'id',
            autoIncrement: true,
          })
        }

        // 可以在这里添加更多存储空间
        console.log('Database upgraded successfully')
      }
    })
  }

  // 添加数据
  add(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.add(data)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // 获取所有数据
  getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // 根据 ID 获取数据
  get(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // 更新数据
  update(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(data)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // 删除数据
  delete(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // 清空存储空间
  clear(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // 关闭数据库
  close() {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }
}

export default IndexedDB
