const messages = {
    required: ':name é requerido',
    minLength: ':name precisa ter no minino :min caracteres',
    maxLength: ':name precisa ter no minino :max caracteres',
    email: ':name não é um email válido',
    min: ':name deve começar de :min'
}

export class ValidationMessage {
    static getMessage(error: string, replaceTokens: Array<any>) {
        let message = messages[error];
        const tokens = message.match(/\:[a-z]+/g);
        tokens.forEach((token, index) => message = message.replace(token, replaceTokens[index]));
        return message;
    }
}