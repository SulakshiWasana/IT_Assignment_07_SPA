import Item from "../models/Item.js"

const data = "items"; //local storage save key

var item_arr = []; //

export class Item_controller{
    constructor() {
        $('#btnSaveItem').click(this.handledSaveItem.bind(this))
        $('#btnUpdateItem').click(this.handledUpdateItem.bind(this))
        $('#btnDeleteItem').click(this.handledDeleteItem.bind(this))
        this.handleLoadItem()
    }

    handledSaveItem(){
        console.log("Handle Save Item!")

        var item_code = $('#txtItemID').val();
        var item_name = $('#txtItemName').val();
        var item_quantity = $('#txtItemQty').val();
        var item_price = $('#txtItemPrice').val();

        let pre_data = localStorage.getItem(data);
        let data_arr = [];

        // undefine/ null/ "" / false
        if (pre_data) {
            data_arr = JSON.parse(pre_data);
        }

        let new_item = new Item(item_code,item_name,item_quantity,item_price);
        console.log(new_item)

        data_arr.push(new_item);
        console.log(data_arr);
        localStorage.setItem(data, JSON.stringify(data_arr));

        this.handleLoadItem()
        clearItem()
    }

    handleLoadItem(){
        let pre_data = localStorage.getItem(data);
        console.log(pre_data);
        let item_data_arr = JSON.parse(pre_data);
        console.log(item_data_arr);

        $('table tbody tr').remove();

        item_data_arr.map((result, index) => {
            var row = "<tr>" +
                "<td>" + result._item_code + "</td>" +
                "<td>" + result._item_name + "</td>" +
                "<td>" + result._item_quantity + "</td>" +
                "<td>" + result._item_price + "</td>" +
                "</tr>";
            $('tbody').append(row);
        })

    }

    handledUpdateItem() {
        console.log("Handle Update Item!");

        $('#btnUpdateItem').on('click',(event)=>{
            let item_code = $("#textItemID").val();

            let pre_data = localStorage.getItem(dataI);
            let item_data_arr =JSON.parse(pre_data);

            let index = item_data_arr.findIndex(value => value._item_code === item_code);
            if (index > -1){
                console.log(item_data_arr[index]);
                item_data_arr[index]._item_name = $("#txtItemName").val();
                item_data_arr[index]._item_quantity = $("#txtItemQty").val();
                item_data_arr[index]._item_price = $("#txtItemPrice").val();
                localStorage.setItem(data,JSON.stringify(item_data_arr));
                this.handleLoadItem()
                clearItem()
            }
        });
    }

    handledDeleteItem(){
        console.log("Handle Delete Item!");

        $('#btnDeleteItem').on("click",(event)=>{

            let code = $("#txtItemID").val();

            let per_arr = localStorage.getItem(data);
            let arr = [];
            if(per_arr){
                arr = JSON.parse(per_arr);
            }

            let index = arr.findIndex(value => value._item_code === code);
            console.log(index);
            arr.splice(index, 1);

            localStorage.setItem(data, JSON.stringify(arr));
            this.handleLoadItem()
        })
    }
}

function clearItem() {
    $("#txtItemID").val("");
    $("#txtItemName").val("");
    $("#txtItemQty").val("");
    $("#txtItemPrice").val("");
}

new Item_controller()



