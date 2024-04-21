export class DirectoryTreeNode {
  name: string;

  files: File[];

  children: DirectoryTreeNode[];

  constructor(name: string) {
    this.name = name;
    this.files = [];
    this.children = [];
  }

  addChild(child: DirectoryTreeNode) {
    this.children.push(child);
  }
}
