import KanbanAPI from "../api/KanbanAPI.js";
import Item from "../view/Item.js";
import DropZone from "./DropZone.js";

export default class Column {
    constructor(id, title) {
        // ADDING DROPZONE ON TOP OF COLUMN TO DROP ON TOP AS WELL
        const topDropZone = DropZone.createDropZone();

        // GIVES THE SINGLE COLUMN IN USER INTERFACE
        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        // ADDING DROPZONE ON TOP OF COLUMN TO DROP ON TOP AS WELL
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click", () => {
            // ADD ITEM
            const newItem = KanbanAPI.insertItem(id, "");
            this.renderItem(newItem);
        })

        KanbanAPI.getItems(id).forEach(item => {
            // console.log(item)
            this.renderItem(item);
        })
    }

    static createRoot() {
        const range = document.createRange();
        // document.createRange is just a technique to create html using javascript

        range.selectNode(document.body);
        return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-title"></div>
                <div class="kanban__column-items"></div>
                <button class="kanban__add-item" type="button">+ Add</button>
            </div>
        `).children[0];
    }


    renderItem(data) {
        // CREATE A NEW ITEM INSTANCE
        const item = new Item(data.id, data.content);

        this.elements.items.appendChild(item.elements.root);
    }
}
