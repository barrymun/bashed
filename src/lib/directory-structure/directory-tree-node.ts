interface DirectoryTreeNodeProps {
  parent: DirectoryTreeNode | null;
  name: string;
}

export class DirectoryTreeNode {
  parent: DirectoryTreeNode | null = null;

  name: string;

  files: File[];

  directories: DirectoryTreeNode[];

  constructor({ parent, name }: DirectoryTreeNodeProps) {
    this.addChild = this.addChild.bind(this);

    this.parent = parent;
    this.name = name;
    this.files = [];
    this.directories = [];
  }

  addChild(child: DirectoryTreeNode) {
    this.directories = [...this.directories, child];
  }
}
