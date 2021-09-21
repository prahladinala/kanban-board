// import KanbanAPI from "./api/KanbanAPI.js";

import Kanban from "./view/Kanban.js";

// TEST ADD ITEM
// console.log(KanbanAPI.insertItem(2, "Prahlad Inala"))

// TEST UPDATE ITEM
// KanbanAPI.updateItem(64537)

// TEST UPDATE ITEM
// KanbanAPI.updateItem(64537, {
//     columnId: 1,
//     position: 0,
//     content: "I've Changed"
// });

// TEST DELETE ITEM
// KanbanAPI.deleteItem(64537);

new Kanban(
    document.querySelector(".kanban")
);