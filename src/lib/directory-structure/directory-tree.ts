import { DirectoryTreeNode } from "lib/directory-structure/directory-tree-node";
import { homeDirectory } from "utils";

export class DirectoryTree {
  root: DirectoryTreeNode;

  cwd: DirectoryTreeNode;

  constructor() {
    this.add = this.add.bind(this);

    const rootNode = new DirectoryTreeNode({ parent: null, name: homeDirectory });
    this.root = rootNode;
    this.cwd = rootNode;
  }

  add({ parent, name }: { parent: DirectoryTreeNode; name: string }) {
    const newNode = new DirectoryTreeNode({ parent: this.cwd, name });
    if (!this.root) {
      this.root = newNode;
    } else if (parent) {
      parent.addChild(newNode);
    }
  }
}
