import { Background, BackgroundType, CategoryFilter, FileType, FilteredElementCollector, ModelViewType, OrFilter, RenderMode, SelectionMode, TbContextMenuUI, TinyApp, type IFileResolver, type IFilter, type IModelView, type IStore } from "@/dev";
import { AssetManager } from "./AssetManager";
import { CachedTiandituLoader } from "./CachedTiandituLoader";
import { CachedArcgisTerrainLoader } from "./CachedArcgisTerrainLoader";

//测试天地图Key,请求次数有限，请自行申请
let keys: string[] = ["26eb0c7b03694c6fe26d61fb85ba12fe"];

export async function load_tiny_app(loaders: IFileResolver[], div: HTMLDivElement, store: IStore = null) {
    if (!loaders || loaders.length == 0) {
        return null;
    }
    const app = new TinyApp({ recordable: false, asset_manager: new AssetManager() });
    await app.init(div);
    const uiview = app.default_view;
    uiview.selection.selection_mode = SelectionMode.element;
    uiview.active();

    const tasks: Promise<void>[] = [];
    const len = loaders.length;
    for (let i = 0; i < len; i++) {
        tasks.push(load_model(app, loaders[i], store));
    }
    await Promise.any(tasks);
    const lerc_url = "/lerc-wasm.wasm";
    const gis_manager = uiview.gis_manager;
    gis_manager.set_terrain_loader(new CachedArcgisTerrainLoader(lerc_url));
    gis_manager.set_img_loader(new CachedTiandituLoader(keys));

    const menu = new TbContextMenuUI(uiview);
    menu.add_default();
    menu.install();

    window.setTimeout(() => {
        const bk = new Background();
        bk.type = BackgroundType.skybox;
        bk.skybox = "天空1";
        uiview.background = bk;
        uiview.set_env("天空1");
    }, 1000);

    window.setTimeout(() => {
        uiview.render_mode = RenderMode.texture; 
    }, 3000);

    return app;
}

async function load_model(app: TinyApp, loader: IFileResolver, store: IStore = null) {

    const model = app.create_model();
    if (store) {
        await model.load(loader, store);
    }
    else {
        await model.load(loader);
    }

    const uiview = app.default_view;
    if (model.file_type != FileType.Dwg) {
        const mv = model.views.find(v => v.type == ModelViewType.ThreeD) as IModelView;
        if (mv) {
            await uiview.attach_view(mv);

            const c1 = model.categories.find(c => c.name == "面积");

            const filters: IFilter[] = [];
            if (c1) {
                filters.push(new CategoryFilter(model, c1.id));

            }
            const c2 = model.categories.find(c => c.name == "体量");
            if (c2) {
                filters.push(new CategoryFilter(model, c2.id));

            }
            const c3 = model.categories.find(c => c.name == "房间");
            if (c3) {
                filters.push(new CategoryFilter(model, c3.id));
            }
            const c4 = model.categories.find(c => c.name == "空间");
            if (c4) {
                filters.push(new CategoryFilter(model, c4.id));
            }
            if (filters.length > 0) {
                const filter = new OrFilter(filters);
                const collector = new FilteredElementCollector(model);
                const ids = collector.pass(filter).get_elements();
                if (ids.length > 0) {
                    uiview.hide(new Map([[model, ids]]))
                }
            }

        }
    }
    else {
        const mv = model.views.find(v => v.type == ModelViewType.Floor) as IModelView;
        if (mv) {
            await uiview.attach_view(mv);
        }
    }
}