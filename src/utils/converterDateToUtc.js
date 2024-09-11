const moment = require('moment');
require('moment/locale/pt-br');

exports.convertDateToUTC = (date) => {
    moment.locale('pt-br');
    return moment(date);
}