/**
 * @module heirloom-core
 * @description
 *  Server接口的常规实现
 *
 * @flow
 * @author xuyuanxiang
 * @date 2017/2/3
 */
import KoaEngine from './engines/KoaEngine';

export type NormalServerOptions = {
    port?: number,
    engine?: Heirloom$Engine,
    logger: Heirloom$Logger,
}

export default class NormalServer {

    port: number;
    engine: Heirloom$Engine;
    logger: Heirloom$Logger;

    constructor({
                    port = Number(process.env.PORT),
                    engine = KoaEngine.shareInstance(),
                    logger,
                }: NormalServerOptions = {}) {
        if (engine == null) {
            throw new TypeError('非法构造参数："engine"，不能为空！');
        }
        if (logger == null) {
            throw new TypeError('非法构造参数："logger"，不能为空！');
        }
        if (port == null || typeof port !== 'number') {
            throw new TypeError('非法构造参数："port"，不能为空且必须为有效的端口号！');
        }
        this.engine = engine;
        this.logger = logger;
        this.port = port;
        this.engine.on("error", (err) => {
            this.logger.error("occur error:", err);
        });
    }

    apply(plugin: Heirloom$Plugin): void {
        if (plugin == null) {
            throw new TypeError('应用插件失败，参数不能为空！');
        }
        const applied: any = plugin.apply({ engine: this.engine, port: this.port });
        if (!applied) {
            throw new TypeError(`应用插件失败，非法插件：${plugin.name}-${plugin.version}！`);
        }
        if (Array.isArray(applied)) {
            this.engine.use(...applied);
        } else {
            this.engine.use(applied);
        }
        this.logger.info(`Applied plugin: ${plugin.name || "unknown"}-${plugin.version || "N/A"}`);
    }

    start(): void {
        this.engine.listen(
            this.port,
            () => this.logger.info(`Engine: ${this.engine.name}-${this.engine.version} is running at localhost:${this.port}`),
        );
    }

}
