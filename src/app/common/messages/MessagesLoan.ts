import { LanguageEnum } from '../enums/Language.enum';

export class MessagesLoan {
    public static getMessageLoanError(): string {
        // localStorage.setItem('language', 'ES');
        if (localStorage.getItem(LanguageEnum.ES.toString()) === 'ES') {
            return 'Ocurrió un error al procesar el préstamo';
        }
        return 'ERROR EN INGLÉS';
    }

    public static getMessageLoanErrorByOps(): string {
        // localStorage.setItem('language', 'ES');
        if (localStorage.getItem(LanguageEnum.ES.toString()) === 'ES') {
            return 'Ocurrió un error al procesar el préstamo';
        }
        return 'ERROR EN INGLÉS';
    }
}
