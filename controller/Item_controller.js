import {Item} from "../models/item.js";
import {saveItem, getAllItems, updateItem,deleteItem} from "../DB/db.js";

export class Item_controller{
    constructor() {
        $("#btnSaveItem").click(this.handleSaveItem.bind(this));
        $("#btnUpdateItem").click(this.handleUpdateItem.bind(this));
        $("#btnDeleteItem").click(this.handleDeleteItem.bind(this));
        this.handleLoadItem();
        this.itemTableSelectedRaw();

    }

    handleLoadItem(){
        let item_data = getAllItems();
        $('#itemTable tbody').empty();

        item_data.map((result, index) => {
            const row = "<tr>" + "<td>" +
                result._itemId +
                "</td>" + "<td>" +
                result._name +
                "</td>" + "<td>" +
                result._qty +
                "</td>" + "<td>" +
                result._price +
                "</td>" + "</tr>";
            $("#itemTable tbody").append(row);
        });
    }

    handleSaveItemValidation(){

    }

    handleSaveItem(){
        console.log("Item-added");
        let item_id = $("#txtItemID").val();
        let item_name = $("#txtItemName").val();
        let item_qty = $("#txtItemQty").val();
        let item_price = $("#txtItemPrice").val();

        let item = new Item(item_id,item_name,item_qty,item_price);
        saveItem(item);
        this.handleLoadItem();
        this.clearFields();


    }

    handleUpdateItem(){
        let item_id = $("#txtItemID").val();
        let item_name = $("#txtItemName").val();
        let item_qty = $("#txtItemQty").val();
        let item_price = $("#txtItemPrice").val();

        let item = new Item(item_id,item_name,item_qty,item_price);
        updateItem(item);
        this.handleLoadItem();
        this.clearFields();
    }

    handleDeleteItem(){
        let item_id = $("#txtItemID").val();
        let item_name = $("#txtItemName").val();
        let item_qty = $("#txtItemQty").val();
        let item_price = $("#txtItemPrice").val();

        let item = new Item(item_id,item_name,item_qty,item_price);
        deleteItem(item);
        this.handleLoadItem();
        this.clearFields();
    }

    itemTableSelectedRaw(){
        $("#itemTable").on("click", "tr", function (event) {
            console.log($(event.target).text());
            let id = $(this).children().eq(0).text();
            let name = $(this).children().eq(1).text();
            let qty = $(this).children().eq(2).text();
            let price = $(this).children().eq(3).text();

            $("#txtItemID").val(id);
            $("#txtItemName").val(name);
            $("#txtItemQty").val(qty);
            $("#txtItemPrice").val(price);
        });
    }

    clearFields(){
        $("#txtItemID").val("");
        $("#txtItemName").val("");
        $("#txtItemQty").val("");
        $("#txtItemPrice").val("");
    }



}

new Item_controller();


