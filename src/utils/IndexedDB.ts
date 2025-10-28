
import type { IExpireItem } from "./IExpireItem";

export class IndexedDB<T extends IExpireItem>{
    #_table:string;
    #_key_path:string;
    #_db:IDBDatabase = null;
    constructor(table:string,key_path:string){
        this.#_table = table;
        this.#_key_path = key_path;
    }

    async open(){
        const self = this;
        return await new Promise<boolean>(resolve=>{            
            const req = indexedDB.open(self.#_table);
            req.onerror = evt=>{
                resolve(false);
            };
            req.onupgradeneeded  = evt=>{
                const d = evt.target as IDBOpenDBRequest;
                const db = d.result;
                db.createObjectStore(self.#_table,{keyPath:self.#_key_path});
            }
            req.onsuccess =evt=>{
                const d = evt.target as IDBOpenDBRequest;
                self.#_db = d.result;
                resolve(true);
            }
        });
    }

    async add(item: T | T[]) {
        const self = this;
        return await new Promise<boolean>(resolve => {
            const trans = this.#_db.transaction(self.#_table, "readwrite");
            const store = trans.objectStore(self.#_table);
            trans.oncomplete = () => {
                resolve(true);
            };
            trans.onerror = evt => {
                resolve(false);
            }
            if (Array.isArray(item)) {
                const len = item.length;
                for (let i = 0; i < len; i++) {
                    const itm = item[i];
                    store.add(itm);
                }
            } else {
                store.add(item);
            }
            trans.commit();
        });
    }

    async get(key:string){ 
        const self = this;
        return await new Promise<T>(resolve=>{
            const db = self.#_db;
            const trans = db.transaction(self.#_table,'readwrite');
            const store = trans.objectStore(self.#_table)
            const req = store.get(key);
            req.onsuccess = evt=>{
                const r = evt.target as IDBRequest;
                resolve(r.result);
            }
            req.onerror = evt=>{
                resolve(null);
            }
        })        
    }
    async get_all_keys(){
        const self = this;
        return await new Promise<string[]>(resolve=>{
            const db = self.#_db;
            const trans = db.transaction(self.#_table,'readwrite');
            const store = trans.objectStore(self.#_table)
            const req = store.getAllKeys();
            req.onsuccess = evt=>{
                const result:string[]=[];
                const keys = req.result;
                keys.forEach(k=>{
                    result.push(k as string);
                });
                resolve(result);
            }
            req.onerror = evt=>{
                resolve(null);
            }
        })    
    }

    async delete_expired(){
        const self = this;
        const keys = await new Promise<string[]>(resolve=>{
            const db = self.#_db;
            const trans = db.transaction(self.#_table,'readwrite');
            const store = trans.objectStore(self.#_table);
            const cursor = store.openCursor();
            const tmp_keys:string[]=[];
            cursor.onsuccess =async (event:any)=>{
                const c = event.target.result as IDBCursorWithValue;
                if(c){
                    const item = c.value as IExpireItem;
                    const now = Date.now();
                    const _1h = 1000*60*60*24*30;
                    if(now - item.time>_1h){
                        tmp_keys.push(item.id);
                    }
                    c.continue();
                }
                else{
                    resolve(tmp_keys);
                }
            }
        }) ;
        const len = keys.length;
        for(let i=0;i<len;i++){
            await self.delete(keys[i]);
        }

    }

    async delete(key:string){
        const self = this;
        return await new Promise<boolean>(resolve=>{
            const db = self.#_db;
            const trans = db.transaction(self.#_table,'readwrite');
            const store = trans.objectStore(self.#_table)
            const req = store.delete(key);
            req.onsuccess = evt=>{
                resolve(true);
            }
            req.onerror = evt=>{
                resolve(false);
            }
        }); 
    }

    close(){
        this.#_db.close();
    }
}