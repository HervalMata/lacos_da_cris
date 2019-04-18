import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions ={
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 255
        }
    },
    email: {
        id: 'email',
        label: 'Email',
        validationMessage: {
            maxlength: 255
        }
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