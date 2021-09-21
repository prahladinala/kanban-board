// CODE FOR LOCAL STORAGE
export default class KanbanAPI {
    // GET ALL DATA IN THE COLUMN
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId)
        // read() > returns an array  //.find() > finds the element to match the given data
        // Now the column refers to one of the item in an array ie any one column of the kanbanboard

        // IF NO ITEMS IN A COLUMN OR SOMETHING WENT WRONG
        if (!column) {
            return [];
        }

        // IF EVERYTHING IS GOOD
        return column.items;
    }

    // INSERT A NEW ITEM
    static insertItem(columnId, content) {
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        };

        if (!column) {
            throw new Error("Column does not exist");
        }

        column.items.push(item);
        save(data)

        return item;
    }

    // UPDATE ITEM
    static updateItem(itemId, newProps) {
        //newProps can contain > content, columnId, newposition
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemId);
                if (item) {
                    return [item, column];
                }
            }

            // return [1, 2] > array destructuring
        })();

        if (!item) {
            throw new Error("Item not found")
        }

        item.content = newProps.content === undefined ? item.content : newProps.content;

        // console.log(item, currentColumn);
        // UPDATE COLUMN AND POSITION
        if (
            newProps.columnId !== undefined
            && newProps.position !== undefined
        ) {
            const targetColumn = data.find(column => column.id == newProps.columnId);
            // console.log(targetColumn)

            if (!targetColumn) {
                throw new Error("Target Column Not Found")
            }

            // DELETE ITEM FROM CURRENT COLUMN
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            // MOVE ITEM INTO NEW COLUMN AND POSITION
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save(data);
    }

    // DELETE ITEM
    static deleteItem(itemId) {
        const data = read();
        for (const column of data) {
            const item = column.items.find(item => item.id == itemId);

            // IF ITEM FOUND - DELETE ITEM
            if (item) {
                column.items.splice(column.items.indexOf(item), 1)
            }
        }

        save(data);
    }
}

// FUNCTION FOR INTERACTING WITH LOCAL STORAGE

// READ FROM LOCAL STORAGE
function read() {
    const json = localStorage.getItem("kanban-data");

    // IF USER IS OPENING FOR FIRST TIME (OR) NO ITEMS IN KANBAN
    if (!json) {
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
        ]
    }

    // IF EVERYTHING IS GOOD
    return JSON.parse(json);
}

// SAVE TO LOCAL STOARGE
function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
}