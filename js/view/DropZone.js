import KanbanAPI from "../api/KanbanAPI.js";

export default class DropZone {
    static createDropZone() {
        const range = document.createRange();

        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
			<div class="kanban__dropzone"></div>
		`).children[0];

        // DO THINGS BEFORE RETURN
        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("kanban__dropzone--active");
        })

        dropZone.addEventListener("dragleave", () => {
            // REMOVE  ACTIVE CLASS
            dropZone.classList.remove("kanban__dropzone--active");

        });

        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("kanban__dropzone--active");

            // FIND COLUMN (1 2 3)
            const columnElement = dropZone.closest('.kanban__column');
            const columnId = Number(columnElement.dataset.id)
            // console.log(columnElement, columnId)

            // FIND POSITION (0 1 2 ...)
            const dropZoneInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            const droppedIndex = dropZoneInColumn.indexOf(dropZone)
            // console.log(dropZoneInColumn)
            // console.log(droppedIndex)

            // FIND DRAGGED ITEM
            const itemId = Number(e.dataTransfer.getData("text/plain"))
            // console.log(itemId)

            // GET ACTUAL ITEM THAT WE ARE DRAGGING AND DROPPING
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`)
            // console.log(droppedItemElement)

            // CHECKS IF DROPZONE IS A PART OF KANBAN OR NOT
            const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;
            // console.log(insertAfter)

            // IF DRAGGING AN ITEM INTO ITS OWN DROPZONE
            if (droppedItemElement.contains(dropZone)) {
                return;
            }

            insertAfter.after(droppedItemElement)

            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            })
        })

        return dropZone;
    }
}