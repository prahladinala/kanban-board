import Column from "./Column.js";

// ENTERY POINT TO USER INTERFACE CODE
export default class Kanban {
    constructor(root) {
        // root defines > html body > div.kanban > as the first element that wraps the page is called root element
        this.root = root;

        Kanban.columns().forEach(column => {
            // Create an instance of column class
            const columnView = new Column(column.id, column.title);

            // APPEND ROOT TO KANBAN BOARD
            this.root.appendChild(columnView.elements.root);
        })
    }

    static columns() {
        return [
            {
                id: 1,
                title: "Not Started"
            },
            {
                id: 2,
                title: "In Progress"
            },
            {
                id: 3,
                title: "Completed"
            },
        ]
    }
}