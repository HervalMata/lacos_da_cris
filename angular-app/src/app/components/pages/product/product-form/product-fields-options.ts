import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions ={
    name: {
        id: 'name',
        label: 'Nome',
    },
    descrition: {
        id: 'description',
        label: 'Descrição',
        validationMessage: {
            cols: 30,
            rols: 10
        }
    },
    price: {
        id: 'price',
        label: 'Preço',
        validationMessage: {
            min: 1
        }
    },
    active: {
        id: 'active',
        label: 'Ativo?',
    }
};

export default fieldsOptions;