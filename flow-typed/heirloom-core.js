declare interface Heirloom$Engine {
    name: string;
    version: string;

    use(any: any): void;
    listen(port: number, callback: () => void): void;
    on(event: string, callback: (error: ?Error | ?any) => void): void;
}

declare interface Heirloom$Logger {
    info(): void;
    error(): void;
    fatal(): void;
    warn(): void;
    trace(): void;
    debug(): void;
}

declare type Heirloom$Middleware = Function | Array<Function>;

declare interface Heirloom$Plugin {
    name: string;
    version: string;

    apply({ engine: Heirloom$Engine, port: number }): Heirloom$Middleware
}


declare interface Heirloom$Server {
    port: number;
    engine: Heirloom$Engine;

    apply(plugin: Heirloom$Plugin): void;
    start(): void;
}