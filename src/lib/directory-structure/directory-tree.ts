import { DirectoryTreeNode } from "lib/directory-structure/directory-tree-node";
import { homeDirectory } from "utils";

export class DirectoryTree {
  root: DirectoryTreeNode;

  cwd: DirectoryTreeNode;

  constructor() {
    const rootNode = new DirectoryTreeNode(homeDirectory);
    this.root = rootNode;
    this.cwd = rootNode;
  }

  add(name: string, parent: DirectoryTreeNode) {
    const newNode = new DirectoryTreeNode(name);
    if (!this.root) {
      this.root = newNode;
    } else if (parent) {
      parent.addChild(newNode);
    }
  }
}
