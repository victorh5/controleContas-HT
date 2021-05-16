class dateFormatterUtil {

    ISOtoBR(data) {
        data = data.slice(0, 10)
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }
}

export default new dateFormatterUtil()