import { IndexedDB } from "./IndexedDB";
import type { TiandituItem } from "./TiandituItem";
import { ArcgisTerrainLoader } from "../dev";

export class CachedArcgisTerrainLoader extends ArcgisTerrainLoader{
        
    private _cache:IndexedDB<TiandituItem>;
    constructor(lerc_wasm_url: string){
        super(lerc_wasm_url);           
        this._cache = new IndexedDB("__tiny_view_arcgis_terrain__","id");    
    }
    async get_image(level: number, row: number, column: number): Promise<Blob> {
        await this._cache.open();
        const key = `arcgis_terrain_${level}_${row}_${column}`;
        const r =await this._cache.get(key);
        if(r){
            return r.blob;
        }
        else{
            const blob = await super.get_image(level,row,column);
            if(blob){
                const item:TiandituItem = {
                    id:key,
                    blob:blob,
                    time:Date.now()
                }
                this._cache.add(item);
            }
            return blob;
        }
    }
    override get max_level(): number {
        return 8;
    }

}