declare interface WSEngine {
    name: string;
    version: string;

    use(any: any):void;
    listen(port: number, callback: ()=>void):void;
    on(event: string, callback: (error: ?Error | ?any) => void):void;
}
