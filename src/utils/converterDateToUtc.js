import moment from 'moment';
import 'moment/locale/pt-br.js';

export const convertDateToUTC = (date) => {
    moment.locale('pt-br');
    return moment(date);
}