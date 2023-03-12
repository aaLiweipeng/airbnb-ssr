/**
 * @dataExample openStore({ elephant: { keyPath: 'id', indexs: ['nose', 'ear'] } })
 * 
 * @dataExample openStore({
 * elephant: { keyPath: 'id', indexs: ['nose', 'ear'] },
 * elephant2: { keyPath: 'id', indexs: ['nose', 'ear'] },
 * elephant3: { keyPath: 'id', indexs: ['nose', 'ear'] } 
})
 */
interface storesItemValue { keyPath: string, indexs?: Array<string> }
interface storesItem {
  [storeName : string] : storesItemValue
}

/**
 * 数据库回调都用Promise封装起来，做【异步监听】
 * 操作不用异步，因为【操作】的【启动执行】是 【同步】 的；
 * 【回调函数】才是【异步】的，因为操作之后，需要隔一段时延 才会触发 回调函数；
 * 
 * 配合 await, 如 await airbnb.airbnbDB.openStore(...), 使得操作之后 线程阻塞，
 * 等待回调被触发时（resolve 或者 reject），才会继续往下执行
 * 
 * 注意不要漏了 用 resolve返回 数据，用reject返回 异常信息
 */
export default class DB {
  private dbName: string // 数据库名称
  private db: any // 数据库对象 onsuccess中 打开数据库时赋值

  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  public openStore(stores: storesItem) {
    // 打开数据库
    // name: string, version?: number | undefined
    // 返回一个 IDBOpenDBRequest 对象，通过监听这个对象的回调，来处理事件
    const request = window.indexedDB.open(this.dbName, 1)
    
    // 初始化数据库时，会先走 onupgradeneeded 再走 onsuccess
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据库打开成功')
        this.db = event.target.result
        console.log(event)
  
        // 这里注意返回true，不然执行会有问题！！！
        resolve(true)
      }
  
      request.onerror = (event) => {
        console.log('数据库打开失败')
        console.log(event)
  
        reject(event)
      }
  
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        console.log('数据库升级成功')
        const { result }: any = event.target
  
        for (const storeName in stores) { // 初始化 多个 ojectStore对象仓库【表】
          const { keyPath, indexs } = stores[storeName]
          if (!result.objectStoreNames.contains(storeName)) { // 没有表则新建表

            // createObjectStore：会返回 一个对象仓库 objectStore(即新建一个表)
            // storeName：对象仓库名【表名】
            // keyPath：主键名，主键（key）是 默认建立索引的属性；
            // autoIncrement：是否自增；
            const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
  
            if (indexs && indexs.length) {
              indexs.map((v: string) =>
  
                // createIndex可以新建索引，unique字段是否唯一
                // 一参 索引名称
                // 二参 索引属性
                // 三参 Configoptions 配置对象
                store.createIndex(v, v, { unique: false })
              )
            }
  
            // 创建对象仓库成功 的 回调
            store.transaction.oncomplete = (e: any) => {
              console.log('创建对象仓库成功')
            }
          }
        }
      }
    })
  }

  // 新增/修改 数据库数据   新增的话使用add。这里要同时兼容 新增和修改，于是使用put
  // 一参 对象仓库名, data 包含要插入的数据
  updateItem(storeName: string, data: any) {
    console.log(this.db)
    // transaction 即 事务！通过事务对数据进行操作的
    // 一参 对象仓库名；   二参，操作模式  readwrite，读写
    // 返回 操作句柄
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

    // put函数 接收一个对象，包含要插入的数据
    // put函数 返回一个  对象，通过监听这个对象的回调，来处理事件
    const request = store.put({
      ...data,
      updateTIme: new Date().getTime() // 给每条数据添加时间戳，使得新增同样内容的数据（不包含id字段）会产生不同的记录；
                                       // 修改时，使用 id + 数据字段 即可
                                       // data中没id字段，为增操作；包含id字段，为改操作；
    })

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据写入成功')
        console.log(event)
        resolve(event)
      }
      request.onerror = (event: any) => {
        console.log('数据写入失败')
        console.log(event)
        reject(event)
      }
    })
  }

  // 删除数据【数据字段意义 同上】
  // key 为 数据行id
  deleteItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

    const request = store.delete(key)

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据删除成功')
        console.log(event)
        resolve(event)
      }
      request.onerror = (event: any) => {
        console.log('数据删除失败')
        console.log(event)
        reject(event)
      }
    })
  }

  // 查询所有数据【数据字段意义 同上】
  getList(storeName: string) {
    const store = this.db.transaction(storeName).objectStore(storeName)

    const request = store.getAll()

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('查询所有数据成功')
        console.log(event.target.result)
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        console.log('查询所有数据失败')
        console.log(event)
        reject(event)
      }
    })
  }

  // 查询某一条数据【数据字段意义 同上】
  getItem(storeName: string, key: number | string) {
    const store = this.db.transaction(storeName).objectStore(storeName)

    const request = store.get(key)

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('查询某一条数据成功')
        console.log(event.target.result)
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        console.log('查询某一条数据失败')
        console.log(event)
        reject(event)
      }
    })
  }
}
