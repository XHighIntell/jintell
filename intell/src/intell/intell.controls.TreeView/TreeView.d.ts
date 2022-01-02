

declare namespace Intell.Controls.TreeView {
    interface Namespace {
        create(element: HTMLElement): TreeView;



        TreeView: TreeViewConstructor;
        TreeNode: TreeNodeConstructor;
    }


    interface TreeView {

        // property

        element: HTMLElement;
        elementItemAbstract: HTMLElement;
        selectedNode: TreeNode;
        children: TreeNode[];

        // methods
        add(name: string): TreeNode;
        add(node: TreeNode): number;
        add(option: TreeNodeOption): TreeNode;

        /** Removes all tree nodes from the collection. */
        clear(): void;

        // events
        onnodeclick: Intell.EventFunctionT<{ node: TreeNode, event: MouseEvent }>;
        onnodedoubleclick: Intell.EventFunctionT<{ node: TreeNode, event: MouseEvent }>;
        onnodeexpand: Intell.EventFunctionT<{ node: TreeNode, event: MouseEvent }>;
        onnodemousedown: Intell.EventFunctionT<{ node: TreeNode, event: MouseEvent }>;
        onnodemouseup: Intell.EventFunctionT<{ node: TreeNode, event: MouseEvent }>;
    }
    interface TreeViewPrivate {
        element: HTMLElement;
        elementItemAbstract: HTMLElement;
        rootNode: TreeNode;
        children: TreeNode[];
        selectedNode: TreeNode;
    }
    interface TreeViewConstructor {
        (element?: HTMLElement): TreeView;
        new(element?: HTMLElement): TreeView;
        prototype: TreeView;

        /** Gets private data of TreeView. */
        getPrivate(treeview: TreeView): TreeViewPrivate;
    }


    interface TreeNode {

        [T: Symbol]: TreeNodePrivate;

        // properties
        element: HTMLElement;

        name: string;

        icon: string;

        /** Gets the parent tree node of the current tree node. */
        parent: TreeNode;

        /** Gets the collection of TreeNode objects assigned to the current tree node. */
        children: TreeNode[];

        /** Gets the parent tree view that the tree node is assigned to. */
        treeView: TreeView;

        // methods
        add(name: string): TreeNode;
        add(node: TreeNode): number;
        add(option: TreeNodeOption): TreeNode;
        

        /** Removes the current tree node from the tree view control. */
        remove(): void;
        removeChildren(node: TreeNode): number;
        /** Removes all tree nodes from the collection. */
        clear(): void;

        showExpandButton(): void;
        hideExpandButton(): void;
    }
    interface TreeNodeOption {
        name: string;
        icon: string;
    }
    interface TreeNodePrivate {
        element: HTMLElement;
        elementLabel: HTMLElement;
        elementArrow: HTMLElement;
        elementIcon: HTMLElement;
        elementName: HTMLElement;
        elementChildren: HTMLElement;

        name: string;
        icon: string;
        children: TreeNode[];
        parent: TreeNode;
        treeView: TreeView;
    }
    interface TreeNodeConstructor {
        (element: HTMLElement): TreeNode;
        new(element: HTMLElement): TreeNode;
        prototype: TreeNode;

        /** Gets private data of TreeNode. */
        getPrivate(node: TreeNode): TreeNodePrivate;

    }
}




declare namespace Intell.Controls {
    interface Namespace {
        TreeView: Intell.Controls.TreeView.Namespace;
    }
}



