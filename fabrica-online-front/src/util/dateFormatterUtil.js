class dateFormatterUtil {

    ISOtoBR(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }
}

export default new dateFormatterUtil()