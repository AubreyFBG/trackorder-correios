"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoPackages = exports.getInfoPackage = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
/**
 * Retrieves package information based on the order code.
 *
 * @param {string} orderCode - The order code to retrieve package information.
 * @returns {Promise<PackageInfo | { orderCode: string; isOrderCode: boolean; error: any }>} - The package information or an error object.
 */
async function getInfoPackage(orderCode) {
    const correiosUrlGet = `https://www.linkcorreios.com.br/${orderCode}`;
    try {
        if (!orderCode)
            throw new Error('Order code is required.');
        const { data } = await axios_1.default.get(correiosUrlGet);
        const $ = cheerio_1.default.load(data);
        const updates = [];
        $('.linha_status').each((index, element) => {
            updates.push(formatStringToJson($(element).text()));
        });
        if (!updates.length)
            throw new Error('Not found code.');
        return {
            orderCode,
            inTransit: !updates[0].status.includes('Objeto entregue ao destinatário'),
            delivered: updates[0].status.includes('Objeto entregue ao destinatário'),
            postedDate: updates.reverse()[0].date,
            lastUpdateDate: updates.reverse().shift()?.date,
            updates,
        };
    }
    catch (error) {
        return {
            orderCode,
            isOrderCode: isOrderCode(orderCode),
            error,
        };
    }
}
exports.getInfoPackage = getInfoPackage;
/**
 * Retrieves package information based on an array of order codes.
 *
 * @param {string[]} orderCodes - The array of order codes to retrieve package information.
 * @returns {Promise<(PackageInfo | { orderCode: string; isOrderCode: boolean; error: any })[]>} - An array of package information or error objects.
 */
async function getInfoPackages(orderCodes) {
    const packagePromises = orderCodes.map((orderCode) => getInfoPackage(orderCode));
    return Promise.all(packagePromises);
}
exports.getInfoPackages = getInfoPackages;
/**
 * Formats a string containing package information into a PackageUpdate object.
 *
 * @param {string} stringInfos - The string containing package information.
 * @returns {PackageUpdate} - The formatted PackageUpdate object.
 */
function formatStringToJson(stringInfos) {
    const regexStatus = /Status: (.+)/;
    const regexDate = /Data\s+: (\d{2}\/\d{2}\/\d{4}) \| Hora: (\d{2}:\d{2})/;
    const regexLocale = /Local: (.+)/;
    const regexOrigin = /Origem: (.+)/;
    const regexDestination = /Destino: (.+)/;
    const statusMatch = stringInfos.match(regexStatus);
    const dateMatch = stringInfos.match(regexDate);
    const localeMatch = stringInfos.match(regexLocale);
    const originMatch = stringInfos.match(regexOrigin);
    const destinationMatch = stringInfos.match(regexDestination);
    const status = statusMatch?.[1].trim() || '';
    const date = formatDate(`${dateMatch?.[1]} ${dateMatch?.[2]}`);
    const origin = originMatch?.[1].trim() || null;
    const destination = destinationMatch?.[1].trim() || null;
    const locale = localeMatch?.[1].trim() || (origin || '');
    return {
        status,
        date,
        localeCity: replaceLocaleCity((locale || '').split(' - ')[1]),
        locale,
        transitInfos: destination
            ? {
                origin,
                destination,
            }
            : null,
    };
}
/**
 * Formats a date string into a Date object.
 *
 * @param {string} dateString - The date string to format.
 * @returns {Date} - The formatted Date object.
 */
function formatDate(dateString) {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hour, minute] = timePart.split(':');
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
}
/**
 * Replaces a city string with its shortened version if applicable.
 *
 * @param {string} cityString - The city string to replace.
 * @returns {string | null} - The shortened city string or null.
 */
function replaceLocaleCity(cityString) {
    return cityString.length > 3 ? cityString : null;
}
/**
 * Checks if the provided order code follows the expected pattern.
 *
 * @param {string} orderCode - The order code to validate.
 * @returns {boolean} - True if the order code is valid, otherwise false.
 */
function isOrderCode(orderCode) {
    const validRegex = /^[A-Z]{2}\d{9}[A-Z]{2}$/;
    return validRegex.test(orderCode);
}
