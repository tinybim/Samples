import type { IAssetManager, IBackgroundImgae, IEnvMap, ISkybox } from "../dev";

export class AssetManager implements IAssetManager{

    private _skybox:ISkybox[];
    private _bk_img:IBackgroundImgae[]=[];
    private _env_map:IEnvMap[]=[];

    constructor(){
        this._skybox=[
            {
                name:"天空1",
                positiveX:`/skybox/sky2/px.png`,
                negativeX:`/skybox/sky2/nx.png`,
                positiveY:`/skybox/sky2/py.png`,
                negativeY:`/skybox/sky2/ny.png`,
                positiveZ:`/skybox/sky2/pz.png`,
                negativeZ:`/skybox/sky2/nz.png`
            },
            {
                name:"天空2",
                positiveX:`/skybox/cloudy/px.jpg`,
                negativeX:`/skybox/cloudy/nx.jpg`,
                positiveY:`/skybox/cloudy/py.jpg`,
                negativeY:`/skybox/cloudy/ny.jpg`,
                positiveZ:`/skybox/cloudy/pz.jpg`,
                negativeZ:`/skybox/cloudy/nz.jpg`
            },
            {
                name:"天空3",
                positiveX:`/skybox/sky1/px.webp`,
                negativeX:`/skybox/sky1/nx.webp`,
                positiveY:`/skybox/sky1/py.webp`,
                negativeY:`/skybox/sky1/ny.webp`,
                positiveZ:`/skybox/sky1/pz.webp`,
                negativeZ:`/skybox/sky1/nz.webp`
            },
            {
                name:"天空4",
                positiveX:`/skybox/dusk/px.png`,
                negativeX:`/skybox/dusk/nx.png`,
                positiveY:`/skybox/dusk/py.png`,
                negativeY:`/skybox/dusk/ny.png`,
                positiveZ:`/skybox/dusk/pz.png`,
                negativeZ:`/skybox/dusk/nz.png`
            }
        ];

        this._bk_img=[
            {
                name:"背景1",
                url:'/background/背景1.png'
            },
            {
                name:"背景2",
                url:'/background/背景2.png'
            },
            {
                name:"背景3",
                url:'/background/背景3.png'
            },
            {
                name:"背景4",
                url:'/background/背景4.png'
            }
        ];
        this._env_map=this._skybox;
    }

    get_skybox(): ISkybox[] {
        return this._skybox;
    }
    get_background_img(): IBackgroundImgae[] {
        return this._bk_img;
    }
    get_envmap(): IEnvMap[] {
        return this._env_map;
    }

}