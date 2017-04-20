/**
 * @flow
 * @author xuyuanxiang
 * @date 2017/2/3
 */
import Koa from 'koa';

const pkg = require('koa/package.json');

export default class KoaEngine {
    name: string = pkg.name;
    version: string = pkg.version;
    koa: any;
    static defaultInstance: ?KoaEngine;

    static shareInstance(): KoaEngine {
        if (!this.defaultInstance) {
            this.defaultInstance = new KoaEngine();
        }
        return this.defaultInstance;
    }

    constructor() {
        this.koa = new Koa();
    }

    use(...generator: any): void {
        generator.forEach(it => this.koa.use(it));
    }

    listen(port: number, callback: () => void): void {
        this.koa.listen(port, callback);
    }

    on(event: string, callback: (error: Error) => void): void {
        this.koa.on(event, callback);
    }
}
