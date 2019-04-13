import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions ={
    name: {
        id: 'name',
        label: 'Nome',
    },
    email: {
        id: 'email',
        label: 'Email',
    },
    password: {
        id: 'password',
        label: 'Senha',
        validationMessage: {
            maxlength: 16,
            minlength: 6
        }
    }
};

export default fieldsOptions;