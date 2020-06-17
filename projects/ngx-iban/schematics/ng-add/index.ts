import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

export function ngAdd(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    _context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
