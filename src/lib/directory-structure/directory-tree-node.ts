export class DirectoryTreeNode {
  name: string;

  files: File[];

  children: DirectoryTreeNode[];

  constructor(name: string) {
    this.addChild = this.addChild.bind(this);

    this.name = name;
    this.files = [];
    this.children = [];
  }

  addChild(child: DirectoryTreeNode) {
    this.children = [...this.children, child];
  }
}
