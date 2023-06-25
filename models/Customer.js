export class Customer {
    constructor(custId, name, address, salary) {
        this._custId = custId;
        this._name = name;
        this._address = address;
        this._salary = salary;
    }


    get custId() {
        return this._custId;
    }

    set custId(value) {
        this._custId = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get salary() {
        return this._salary;
    }

    set salary(value) {
        this._salary = value;
    }
}