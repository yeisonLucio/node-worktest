import * as fs from 'fs';
import path from 'path';

export interface Translator {
    [key: string]: string;
}


export const translateObjectKeys = <T>(object: T, translator: Translator): T => {
    let objectTranslated: any = {};

    for (const key in object) {
        if (translator.hasOwnProperty(key)) {
            const translatedKey = translator[key];

            if (Array.isArray(object[key])) {
                objectTranslated[translatedKey] = (object[key] as any[]).map(item => {
                    if (typeof item === 'string') {
                        return item;
                    }
                    return translateObjectKeys(item, translator);
                });
            } else {
                objectTranslated[translatedKey] = object[key];
            }
        } else {
            objectTranslated[key] = object[key];
        }
    }

    return objectTranslated as T;
};


export const loadTranslations = (language: string): Translator => {
    const filePath = path.join(__dirname, '..', 'lang', `${language}.json`);

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Ocurrio un error leyendo el archivo')
    }
}