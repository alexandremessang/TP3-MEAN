import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { FolderService } from '../services/folder.service';
import { ToastComponent } from '../shared/toast/toast.component';

/**
 * Node for to-do item
 */
export class Node {
  name: string;
  _id?: string;
  parent: string;
  children?: Node[];
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  expandable: boolean;
  name: string;
  // _id: string;
  parent: string;
  level: number;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA : Node[] = [
  {
    name: 'Flat Group 1',
    _id: "1",
    parent: "0",
    children: [
      {name: 'Flat Leaf 1.1', _id:"1.1", parent: "1"},
      {name: 'Flat Leaf 1.2',_id:"1.2", parent: "1"},
      {name: 'Flat Leaf 1.3',_id:"1.3", parent: "1"},
    ]
  }, {
    _id: "2",
    name: 'Flat Group 2',
    parent: "0",
    children: [
      {
        _id: "2.1",
        name: 'Flat Group 2.1',
        parent: "2",
        children: [
          {name: 'Flat Leaf 2.1.1',_id: "2.1.1", parent: "2.1"},
          {name: 'Flat Leaf 2.1.2',_id: "2.1.2", parent: "2.1"},
          {name: 'Flat Leaf 2.1.3',_id: "2.1.3", parent: "2.1"},
        ]
      }
    ]
  },{
    name: 'Flat Group 3',
    _id: "3",
    parent: "0",
    children: [{name: 'Flat Leaf 3.1', _id:"3.1", parent: "3"}]
  },
];

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<Node[]>([]);

  get data(): Node[] { return this.dataChange.value; }

  constructor(private folderService: FolderService,
    public toast: ToastComponent) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `Node` with nested
    //     file node as children.
    // this.folderService.getFolders().subscribe(
    //   response =>  {
    //     if(response.length < 1 ) {
    //       const newFolder = {
    //         rootFolder: {
    //           folder:[]
    //         }
    //       };
    //       const data = this.buildFileTree(TREE_DATA, 0);
    //       this.dataChange.next(data);
    //     } else {
    //       const data = this.buildFileTree(response, 0);
    //       this.dataChange.next(data);
    //     }
    //   },
    //   error => console.log(error),
    // );

    // Notify the change.
    
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `Node`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): Node[] {
    return Object.keys(obj).reduce<Node[]>((accumulator, key) => {
      const value = obj[key];
      const node = new Node();
      node.name = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.name = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: Node, name: string) {
    if (parent.children) {
      parent.children.push({name: name} as Node);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: Node, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
  providers: [ChecklistDatabase]
})
export class FoldersComponent {

  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      _id: node._id,
      name: node.name,
      parent: node.parent,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<TodoItemFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private folderService: FolderService,
    public toast: ToastComponent,
    public checklist:ChecklistDatabase) {
    this.dataSource.data = TREE_DATA;
  }

  addFolder(node: Node) {
    var parentNode = TREE_DATA.find(n => n._id === node._id);
    if(parentNode === undefined) {
      var embededParent = TREE_DATA.find(n => n._id === node.parent);
      console.log(embededParent);
      var check = embededParent.children.find(n => n._id === node._id);
      check.children = []
      var newNode = {
        name: "",
        parent: node._id,
        children: [],
      }
      check.children.push(newNode);
      console.log(check);
    } else {
      console.log(parentNode);
    }
  }

  hasChild = (_: number, node: TodoItemFlatNode) => node.expandable;
  // /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  // flatNodeMap = new Map<TodoItemFlatNode, Node>();

  // /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  // nestedNodeMap = new Map<Node, TodoItemFlatNode>();

  // /** A selected parent node to be inserted */
  // selectedParent: TodoItemFlatNode | null = null;

  // /** The new item's name */
  // newItemName = '';

  // treeControl = new FlatTreeControl<TodoItemFlatNode>(
  //   node => node.level, node => node.expandable);

  //   private _transformer = (node: Node, level: number) => {
  //     return {
  //       expandable: !!node.children && node.children.length > 0,
  //       name: node.name,
  //       level: level,
  //     };
  //   }

  //   treeFlattener = new MatTreeFlattener(
  //     this._transformer, node => node.level, node => node.expandable, node => node.children);

  // dataSource: MatTreeFlatDataSource<Node, TodoItemFlatNode>;

  // /** The selection for checklist */
  // checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

  // constructor(private _database: ChecklistDatabase) {
  //   this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
  //     this.isExpandable, this.getChildren);
  //   this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
  //   this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  //   _database.dataChange.subscribe(data => {
  //     this.dataSource.data = data;
  //   });
  // }

  // getLevel = (node: TodoItemFlatNode) => node.level;

  // isExpandable = (node: TodoItemFlatNode) => node.expandable;

  // getChildren = (node: Node): Node[] => node.children;

  // hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  // hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.name === '';

  // /**
  //  * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
  //  */
  //  transformer = (node: Node, level: number) => {
  //   const existingNode = this.nestedNodeMap.get(node);
  //   const flatNode = existingNode && existingNode.name === node.name
  //       ? existingNode
  //       : new TodoItemFlatNode();
  //   flatNode.name = node.name;
  //   flatNode.level = level;
  //   flatNode.expandable = !!node.children?.length;
  //   this.flatNodeMap.set(flatNode, node);
  //   this.nestedNodeMap.set(node, flatNode);
  //   return flatNode;
  // }

  // /** Whether all the descendants of the node are selected. */
  // descendantsAllSelected(node: TodoItemFlatNode): boolean {
  //   const descendants = this.treeControl.getDescendants(node);
  //   const descAllSelected = descendants.length > 0 && descendants.every(child => {
  //     return this.checklistSelection.isSelected(child);
  //   });
  //   return descAllSelected;
  // }

  // /** Whether part of the descendants are selected */
  // descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
  //   const descendants = this.treeControl.getDescendants(node);
  //   const result = descendants.some(child => this.checklistSelection.isSelected(child));
  //   return result && !this.descendantsAllSelected(node);
  // }

  // /** Toggle the to-do item selection. Select/deselect all the descendants node */
  // todoItemSelectionToggle(node: TodoItemFlatNode): void {
  //   this.checklistSelection.toggle(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   this.checklistSelection.isSelected(node)
  //     ? this.checklistSelection.select(...descendants)
  //     : this.checklistSelection.deselect(...descendants);

  //   // Force update for the parent
  //   descendants.forEach(child => this.checklistSelection.isSelected(child));
  //   this.checkAllParentsSelection(node);
  // }

  // /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  // todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
  //   this.checklistSelection.toggle(node);
  //   this.checkAllParentsSelection(node);
  // }

  // /* Checks all the parents when a leaf node is selected/unselected */
  // checkAllParentsSelection(node: TodoItemFlatNode): void {
  //   let parent: TodoItemFlatNode | null = this.getParentNode(node);
  //   while (parent) {
  //     this.checkRootNodeSelection(parent);
  //     parent = this.getParentNode(parent);
  //   }
  // }

  // /** Check root node checked state and change it accordingly */
  // checkRootNodeSelection(node: TodoItemFlatNode): void {
  //   const nodeSelected = this.checklistSelection.isSelected(node);
  //   const descendants = this.treeControl.getDescendants(node);
  //   const descAllSelected = descendants.length > 0 && descendants.every(child => {
  //     return this.checklistSelection.isSelected(child);
  //   });
  //   if (nodeSelected && !descAllSelected) {
  //     this.checklistSelection.deselect(node);
  //   } else if (!nodeSelected && descAllSelected) {
  //     this.checklistSelection.select(node);
  //   }
  // }

  // /* Get the parent node of a node */
  // getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
  //   const currentLevel = this.getLevel(node);

  //   if (currentLevel < 1) {
  //     return null;
  //   }

  //   const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

  //   for (let i = startIndex; i >= 0; i--) {
  //     const currentNode = this.treeControl.dataNodes[i];

  //     if (this.getLevel(currentNode) < currentLevel) {
  //       return currentNode;
  //     }
  //   }
  //   return null;
  // }

  // /** Select the category so we can insert the new item. */
  // addNewItem(node: TodoItemFlatNode) {
  //   const parentNode = this.flatNodeMap.get(node);
  //   this._database.insertItem(parentNode!, '');
  //   this.treeControl.expand(node);
  // }

  // /** Save the node to database */
  // saveNode(node: TodoItemFlatNode, itemValue: string) {
  //   const nestedNode = this.flatNodeMap.get(node);
  //   this._database.updateItem(nestedNode!, itemValue);
  // }
}