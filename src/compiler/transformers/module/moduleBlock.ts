/** @internal */
namespace ts {
    // This should run before module transform (import.meta used), but run after language transform
    export function transformModuleBlockAsModuleSource(moduleKind: ModuleKind, context: TransformationContext) {
        return function transformSourceFile(sourceFile: SourceFile) {
            function visitor(node: Node): VisitResult<Node> {
                if (node.kind !== SyntaxKind.ModuleBlockExpression) {
                    return visitEachChild(node, visitor, context);
                }
                // nested module block, deep visit first
                if ((node as ModuleBlockExpression).isStatic) return visitEachChild(node, visitor, context);

                node = visitEachChild(node, visitor, context);
                Debug.assertNode(node, isModuleBlockExpression);
                const source = factory.createModuleBlockExpression(/** isStatic */ true, node.statements);
                const optionsBag: Expression[] = [source];
                if (hasImportMeta(moduleKind, sourceFile)) {
                    optionsBag.push(factory.createObjectLiteralExpression([
                        factory.createPropertyAssignment("importMeta", factory.createMetaProperty(SyntaxKind.ImportKeyword, factory.createIdentifier("meta")))
                    ]));
                }
                return factory.createNewExpression(factory.createIdentifier("Module"), /** typeArguments */ undefined, optionsBag);
            }
            return visitor(sourceFile) as SourceFile;
        };
    }

    function hasImportMeta(moduleKind: ModuleKind, sourceFile: SourceFile) {
        if (moduleKind === ModuleKind.System) return true;
        if (moduleKind === ModuleKind.Node16 || moduleKind === ModuleKind.NodeNext) {
            return getSourceFileOfNode(sourceFile).impliedNodeFormat === ModuleKind.ESNext;
        }
        return moduleKind >= ModuleKind.ES2020;
    }
}
