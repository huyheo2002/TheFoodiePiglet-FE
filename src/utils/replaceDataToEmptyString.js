function replaceNullUndefinedWithEmptyString(obj) {
    if (typeof obj === "object" && obj !== null) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = replaceNullUndefinedWithEmptyString(obj[key]);
            }
        }
        return obj;
    } else if (obj === null || obj === undefined) {
        return "";
    } else {
        return obj;
    }
}

export default replaceNullUndefinedWithEmptyString;
