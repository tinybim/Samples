
import { ImageLayerType, TiandituLoader, type IImageLoader } from "@/dev";
import { IndexedDB } from "./IndexedDB";
import { TiandituItem } from "./TiandituItem";

export class CachedTiandituLoader implements IImageLoader{
    private _loader:TiandituLoader;
    private _cache:IndexedDB<TiandituItem>;
    constructor(key:string){
        this._loader = new TiandituLoader(key);
        this._cache = new IndexedDB("__tiny_view_tianditu__","id");

    }
    async get_image(level: number, row: number, column: number): Promise<Blob> {
        await this._cache.open();
        const key = `tianditu_${level}_${row}_${column}`;
        const r =await this._cache.get(key);
        if(r){
            return r.blob;
        }
        else{
            const blob = await this._loader.get_image(level,row,column);
            const item:TiandituItem = {
                id:key,
                blob:blob,
                time:Date.now()
            }
            this._cache.add(item);
            return blob;
        }       
    }
    get type(): ImageLayerType {
        return ImageLayerType.Tianditu;
    }
}