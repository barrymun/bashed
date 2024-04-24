export class DirectoryTreeNode {
  name: string;

  files: File[];

  directories: DirectoryTreeNode[];

  constructor(name: string) {
    this.addChild = this.addChild.bind(this);

    this.name = name;
    this.files = [];
    this.directories = [];
  }

  addChild(child: DirectoryTreeNode) {
    this.directories = [...this.directories, child];
  }
}
