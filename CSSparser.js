const cssPrefix = /(?<prefix>#|rgba?\(|scale\(|rotate\(|translate\()/gm;
const cssValue = /(?<value>(?<=\()[0-9.]*(?=\))|(?<=#)[a-zA-Z0-9]+|[0-9.-]+)/gm;
const cssUnit = /(?<suffix>px|%|r?em|deg)/gm;
const cssSuffix = /(?<suffix>\))/gm;

function parseCSStoJS(obj) {
    let cssFormatted = {};
    // console.log(obj);
    for (const [property, value] of Object.entries(obj)) {
        switch (property) {
            case 'transform':
                let incoming = value.split(/(?<=\))/), outcoming = { prefix: [], numeric: [], unit: [], suffix: []};
                incoming.forEach((value) => {
                    outcoming.prefix = [...outcoming.prefix, value.match(cssPrefix) !== null && value.match(cssPrefix) !== '' ? Object.values(value.match(cssPrefix)).at(0) : ''];
                    outcoming.numeric = [...outcoming.numeric, Array.from(value.match(cssValue)).map(el => Number(el)) || ''];
                    outcoming.unit = [...outcoming.unit, value.match(cssUnit) !== null && value.match(cssUnit) !== '' ? Object.values(value.match(cssUnit)).at(0) : ''];
                    outcoming.suffix = [...outcoming.suffix, value.match(cssSuffix) !== null && value.match(cssSuffix) !== '' ? Object.values(value.match(cssSuffix)).at(0) : ''];
                });
                cssFormatted[property] = outcoming;
                break;
            
            default:
                let prefix = value.match(cssPrefix) !== null && value.match(cssPrefix) !== '' ? Object.values(value.match(cssPrefix)).at(0) : '';
                let numeric = Array.from(value.match(cssValue)).map(el => Number(el)) || '';
                let unit = value.match(cssUnit) !== null && value.match(cssUnit) !== '' ? Object.values(value.match(cssUnit)).at(0) : '';
                let suffix = value.match(cssSuffix) !== null && value.match(cssSuffix) !== '' ? Object.values(value.match(cssSuffix)).at(0) : '';
                cssFormatted[property] = {
                    prefix,
                    numeric,
                    unit,
                    suffix
                };
        }
            
        // if (value.includes(' ')) {
        //     let arr = value.split(') ');
        //     arr.forEach((value, index) => {
        //         let prefix = value.match(cssPrefix) !== null && value.match(cssPrefix) !== '' ? Object.values(value.match(cssPrefix)).at(0) : '';
        //         let numeric = Array.from(value.match(cssValue)).map(el => Number(el)) || '';
        //         let unit = value.match(cssUnit) !== null && value.match(cssUnit) !== '' ? Object.values(value.match(cssUnit)).at(0) : '';
        //         let suffix = value.match(cssSuffix) !== null && value.match(cssSuffix) !== '' ? Object.values(value.match(cssSuffix)).at(0) : '';

        //     });
        // } else {
        //     let prefix = value.match(cssPrefix) !== null && value.match(cssPrefix) !== '' ? Object.values(value.match(cssPrefix)).at(0) : '';
        //     let numeric = Array.from(value.match(cssValue)).map(el => Number(el)) || '';
        //     let unit = value.match(cssUnit) !== null && value.match(cssUnit) !== '' ? Object.values(value.match(cssUnit)).at(0) : '';
        //     let suffix = value.match(cssSuffix) !== null && value.match(cssSuffix) !== '' ? Object.values(value.match(cssSuffix)).at(0) : '';
        //     cssFormatted[property] = {
        //         prefix,
        //         numeric,
        //         unit,
        //         suffix
        //     };
        // }
    }
    return cssFormatted;
}

export default class CSSparser {

    constructor(obj) {
        this.formatted = parseCSStoJS(obj);
    }

    static parse(obj) {
        return new CSSparser(obj);
    }

}