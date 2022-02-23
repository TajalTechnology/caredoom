export async function getAllColumns() {
    var responsedata: any = {};
    /* find list & responce */
    const list = {
        "status": 1,
        "data": [
            {
                "_id": "621494e22821d8df6c56c809",
                "columnOne": {
                    "columnName": "india",
                    "assignment": "auto",
                    "dataType": "string",
                    "maxLength": "40",
                    "minLength": "4",
                    "bSearch": "true",
                    "bDisplay": "true",
                    "bDisabled": "true",
                    "evaluationFormula": "true"
                },
                "columnTwo": {
                    "columnName": "districtName",
                    "assignment": "manual",
                    "dataType": "string",
                    "maxLength": "40",
                    "minLength": "4",
                    "bSearch": "true",
                    "bDisplay": "true",
                    "bDisabled": "true",
                    "evaluationFormula": "true"
                },
                "formName": "Digital Bangladesh owner",
                "createdAt": "2022-02-22T07:46:42.857Z",
                "updatedAt": "2022-02-22T07:46:42.857Z",
                "__v": 0
            },
            {
                "_id": "6214bfbc6a88100549ea0d94",
                "columnOne": {
                    "columnName": "countryName",
                    "assignment": "auto",
                    "dataType": "string",
                    "maxLength": "40",
                    "minLength": "4",
                    "bSearch": "true",
                    "bDisplay": "true",
                    "bDisabled": "true",
                    "evaluationFormula": "true"
                },
                "columnTwo": {
                    "columnName": "districtName",
                    "assignment": "manual",
                    "dataType": "string",
                    "maxLength": "40",
                    "minLength": "4",
                    "bSearch": "true",
                    "bDisplay": "true",
                    "bDisabled": "true",
                    "evaluationFormula": "true"
                },
                "formName": "Digital Bangladesh",
                "createdAt": "2022-02-22T10:49:32.605Z",
                "updatedAt": "2022-02-22T10:49:32.605Z",
                "__v": 0
            }
        ]
    };
    return responsedata.list = list;
};

export async function getColumn() {
    var responsedata: any = {};
    /* find columns & responce */
    const columns = {
        "_id": "621494e22821d8df6c56c809",
        "columnOne": {
            "columnName": "countryName",
            "assignment": "auto",
            "dataType": "string",
            "maxLength": "40",
            "minLength": "4",
            "bSearch": "true",
            "bDisplay": "true",
            "bDisabled": "true",
            "evaluationFormula": "true"
        },
        "columnTwo": {
            "columnName": "districtName",
            "assignment": "manual",
            "dataType": "string",
            "maxLength": "40",
            "minLength": "4",
            "bSearch": "true",
            "bDisplay": "true",
            "bDisabled": "true",
            "evaluationFormula": "true"
        },
        "formName": "Md Tajal Islam",
        "createdAt": "2022-02-22T07:46:42.857Z",
        "updatedAt": "2022-02-22T07:46:42.857Z",
        "__v": 0,
        "status": 1
    }
    if (!columns) return responsedata.message = 'Could not find any columns according to this column id';
    responsedata = columns;
    return responsedata;
};