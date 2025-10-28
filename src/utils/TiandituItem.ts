import type { IExpireItem } from "./IExpireItem";

export class TiandituItem implements IExpireItem{
    time: number;
    id: string;
    blob:Blob;
}