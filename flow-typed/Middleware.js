declare type WSMiddleware = Generator<*>
    | (req: any, res: any, next: Function)=>void
    | any
    | Array<any>;
