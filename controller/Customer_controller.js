import Customer from "../models/Customer.js"

const data = "customers"; //local storage save key

var customer_arr = []; //

export class Customer_controller{
    constructor() {
        $('#btnSaveCus').click(this.handledSaveCustomer.bind(this))
        $('#btnUpdateCus').click(this.handledUpdateCustomer.bind(this))
        $('#btnDeleteCus').click(this.handledDeleteCustomer.bind(this))
        this.handleLoadCustomer()
    }

    handledSaveCustomer(){
        console.log("Handle Save Customer!")

        var customer_id = $('#txtCusID').val();
        var customer_name = $('#txtCusName').val();
        var customer_address = $('#txtCusAdd').val();
        var customer_salary = $('#txtCusSal').val();

        let pre_data = localStorage.getItem(data);
        let data_arr = [];

        // undefine/ null/ "" / false
        if (pre_data) {
            data_arr = JSON.parse(pre_data);
        }

        console.log("at data arr"+data_arr)
        let new_customer = new Customer(customer_id,customer_name,customer_address,customer_salary);
        console.log(new_customer)

        data_arr.push(new_customer);
        console.log(data_arr);
        localStorage.setItem(data, JSON.stringify(data_arr));

        this.handleLoadCustomer()
    }

    handleLoadCustomer(){
        let pre_data = localStorage.getItem(data);
        console.log(pre_data);
        let customer_data_arr = JSON.parse(pre_data);
        console.log(customer_data_arr);

        $('table tbody tr').remove();

        customer_data_arr.map((result, index) => {
            var row = "<tr>" +
                "<td>" + result._customer_id + "</td>" +
                "<td>" + result._customer_name + "</td>" +
                "<td>" + result._customer_address + "</td>" +
                "<td>" + result._customer_salary + "</td>" +
                "</tr>";
            $('tbody').append(row);
        })

    }

    handledUpdateCustomer() {
        console.log("Handle Update Customer!");

            $('#btnUpdateCus').on('click',(event)=>{
                let customer_id = $("#txtCusID").val();

                let pre_data = localStorage.getItem(data);
                let customer_data_arr =JSON.parse(pre_data);

                let index = customer_data_arr.findIndex(value => value._customer_id === customer_id);
                if (index > -1){
                    console.log(customer_data_arr[index]);
                    customer_data_arr[index]._customer_name = $("#txtCusName").val();
                    customer_data_arr[index]._customer_address = $("#txtCusAdd").val();
                    customer_data_arr[index]._customer_salary = $("#txtCusSal").val();
                    localStorage.setItem(data,JSON.stringify(customer_data_arr));
                    this.handleLoadCustomer()
                    clearCustomer()
                }
            });
    }

    handledDeleteCustomer(){
        console.log("Handle Delete Customer!");

        $('#btnDeleteCus').on("click",(event)=>{

            let id = $("#txtCusID").val();

            let per_arr = localStorage.getItem(data);
            let arr = [];
            if(per_arr){
                arr = JSON.parse(per_arr);
            }

            let index = arr.findIndex(value => value._customer_id === id);
            console.log(index);
            arr.splice(index, 1);

            localStorage.setItem(data, JSON.stringify(arr));
            this.handleLoadCustomer()
        })
    }
}

function clearCustomer() {
    $("#txtCusID").val("");
    $("#txtCusName").val("");
    $("#txtCusAdd").val("");
    $("#txtCusSal").val("");
}


new Customer_controller()



