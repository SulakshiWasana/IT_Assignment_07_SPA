import {Order} from "../models/Order.js";
import {Cart} from "../models/Cart.js";
import {getAllItems, getCustomerDB, placeOrder} from "../DB/db.js";
var cartArray = [];


export class Order_controller{
    constructor() {
        $("#itemIdSet").on('change',(event)=>{
            console.log(event.target.value);
            this.handleItemDetail(event.target.value);
        });

        $("#addToCart").click(this.handleAddToCart.bind(this));
        this.handleLoadIds();
        this.handleTotal();
        this. deleteField();

        $("#place-btn").click(this.handlePlaceOrder.bind(this));


    }

    handleLoadIds(){
        getCustomerDB().map(value => {
            $('#custIdSet').append("<option>"+ value._custId+"</option>")
        });

        getAllItems().map(value => {
            $('#itemIdSet').append("<option>"+ value._itemId+"</option>")
        });
    }

    handleItemDetail(id){
        getAllItems().map(value => {
            if (value._itemId === id){
                $("#itemName").val(value._name);
                $("#avQty").val(value._qty);
                $("#unitPrice").val(value._price);
            }
        });
    }

    handleTotal(){
        $("#qty").on('keyup',(e)=>{
            let price = parseInt($("#unitPrice").val());
            let qty = parseInt($("#qty").val());

            let total = price * qty;
            console.log(e.keyCode);

            if(e.key === "Backspace"){
                e.preventDefault();
                $("#total").val("");
            }else {
                $("#total").val(total);
            }
        });

    }

    handleAddToCart(){
        let itemId = $("#itemIdSet").val();
        let qty = $("#qty").val();
        let total = $("#total").val();

        let ct = new Cart(itemId,qty,total);

        $("#cartTbl").append(`
         <tr>
            <td>${ct.itemID}</td>> 
            <td>${ct.qty}</td>> 
            <td>${ct.total}</td>> 
            <td><button type="button" style="margin: 0; padding: 3px 10px; color: #edeff1;background-color: #ff253a; border: none" class="raw">Delete</button></td>
            
        </tr>`);

        cartArray.push(ct);
        console.log(cartArray);
        this.clearTextField();
        this.findTotalCost();
    }

    deleteField(){
        $("#cartTbl").on('click', (e)=>{
            console.log(e);
            if (!e.target.classList.contains("raw")){
                return;
            }
            const btn = e.target;
            btn.closest("tr").remove();

            this.findTotalCost();

        });


    }

    findTotalCost(){
        var table = document.getElementById("cartTbl");
        var totalCost = 0;

        for (var i = 1; i < table.rows.length; i++){
            totalCost = totalCost + parseInt(table.rows[i].cells[2].innerHTML);
            console.log(totalCost);
            $("#total-cost").val(totalCost);

        }

    }

    handlePlaceOrder(){

        let orderId = $("#orderID").val();
        let custId = $("#custIdSet").val();

        let order = new Order(orderId,custId,cartArray);

        placeOrder(order);

    }

    clearTextField(){
        $("#itemIdSet").val("");
        $("#itemName").val("");
        $("#avQty").val("");
        $("#unitPrice").val("");
        $("#qty").val("");
        $("#total").val("");

    }

}

new Order_controller();