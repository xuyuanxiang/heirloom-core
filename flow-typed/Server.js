declare interface WSServer {
    port: number;
    engine: WSEngine;

    apply(plugin: WSPlugin):void;
    start():void;
}
