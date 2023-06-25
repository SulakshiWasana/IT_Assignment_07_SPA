import {Customer} from "../models/Customer.js";
import {saveCustomerDB,getCustomerDB,updateCustomer,deleteCustomer} from "../DB/db.js";

export class Customer_controller{
    constructor() {

        $("#btnSaveCus").click(this.handleSaveCustomerValidation.bind(this));
        $("#btnUpdateCus").click(this.handleUpdateCustomer.bind(this));
        $("#btnDeleteCus").click(this.handleDeleteCustomer.bind(this));
        this.handleLoadCustomer();
        this.tableSelectedRaw();

    }
    handleLoadCustomer(){
        let customer_data_arr = getCustomerDB();
        $('#customerTable tbody').empty();

        console.log(customer_data_arr);

        customer_data_arr.map((result, index) => {
            const row = "<tr>" + "<td>" +
                result._custId +
                "</td>" + "<td>" +
                result._name +
                "</td>" + "<td>" +
                result._address +
                "</td>" + "<td>" +
                result._salary +
                "</td>" + "</tr>";
            $("#customerTable tbody").append(row);
        });

    }

    handleSaveCustomerValidation(){

        var customer_id = $("#txtCusID").val();
        var customer_name = $("#txtCusName").val();
        var customer_address = $("#txtCusAdd").val();
        var customer_salary = $("#txtCusSal").val();

        const regexNumber= /^\d+$/;
        if (!regexNumber.test(customer_id)){
            alert("Invalid Id");
        }else if(!customer_name){
            alert("Invalid Name");
        }else if(!customer_address){
            alert("Invalid Address");
        }else if(!customer_salary){
            alert("Invalid Salary");
        }else {
            this.handleSaveCustomer();
        }

    }


    handleSaveCustomer(){
        console.log("Handel save");
        var customer_id = $("#txtCusID").val();
        var customer_name = $("#txtCusName").val();
        var customer_address = $("#txtCusAdd").val();
        var customer_salary = $("#txtCusSal").val();

        let new_customer = new Customer(customer_id,customer_name,customer_address,customer_salary);
        saveCustomerDB(new_customer);
        this.handleLoadCustomer();
        this.clearTextField();

    }

    handleUpdateCustomer(){
        console.log("Handel Update");

        let customer_id = $("#txtCusID").val();
        let customer_name = $("#txtCusName").val();
        let customer_address = $("#txtCusAdd").val();
        let customer_salary = $("#txtCusSal").val();

        let customer = new Customer(customer_id,customer_name,customer_address,customer_salary);
        updateCustomer(customer);
        this.handleLoadCustomer();
        this.clearTextField();

    }


    handleDeleteCustomer(){
        console.log("Handel Delete");

        let customer_id = $("#txtCusID").val();
        let customer_name = $("#txtCusName").val();
        let customer_address = $("#txtCusAdd").val();
        let customer_salary = $("#txtCusSal").val();

        let customer  = new Customer(customer_id,customer_name,customer_address,customer_salary);
        deleteCustomer(customer);
        this.handleLoadCustomer();
        this.clearTextField();

    }


    tableSelectedRaw(){
        $("#cusTable").on("click", "tr", function (event) {
            console.log($(event.target).text());
            let id = $(this).children().eq(0).text();
            let name = $(this).children().eq(1).text();
            let address = $(this).children().eq(2).text();
            let salary = $(this).children().eq(3).text();

            $("#txtCusID").val(id);
            $("#txtCusName").val(name);
            $("#txtCusAdd").val(address);
            $("#txtCusSal").val(salary);
        });
    }

    clearTextField(){
        $("#txtCusID").val("");
        $("#txtCusName").val("");
        $("#txtCusAdd").val("");
        $("#txtCusSal").val("");
    }


}
new Customer_controller();
//---------------------------------------------------------
