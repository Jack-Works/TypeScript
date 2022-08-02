interface Module {
    get source(): ModuleSource | null;
}
interface ModuleConstructor {
    new (id: string): Module;
}
interface ModuleSource {
    // TODO: bindings properties
}
interface ModuleSourceConstructor {
    new (sourceText: string): ModuleSource;
}

declare var Module: ModuleConstructor;
declare var ModuleSource: ModuleSourceConstructor;
