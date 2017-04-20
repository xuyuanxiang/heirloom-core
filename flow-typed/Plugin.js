declare interface WSPlugin {
    name: string;
    version: string;

    apply(): WSMiddleware
}
