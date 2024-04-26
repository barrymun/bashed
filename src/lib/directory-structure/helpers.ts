import { DirectoryTreeNode } from "lib/directory-structure/directory-tree-node";

export function getPathFromNode(node: DirectoryTreeNode): string {
  // handle base case whereby the current node is the root node
  if (node.parent === null) {
    return node.name;
  }
  const parentPath = getPathFromNode(node.parent);
  return `${parentPath}/${node.name}`;
}
