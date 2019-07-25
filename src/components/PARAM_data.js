var variable_map = {
    "General": {
        "Date": {
            script: "new Date();"
        }
    },
    "Record": {
        "ID": {
            "Alt ID": {
                script: "capId.getCustomID();"
            },
            "CAP ID": {
                script: "cap;"
            }
        },
        "Structure": {
            "Module": {
                script: "appTypeString.split[0];"
            },
            "Type": {
                script: "appTypeString.split[1];"
            },
            "Sub-Type": {
                script: "appTypeString.split[2];"
            },
            "Category": {
                script: "appTypeString.split[3];"
            },
        }
    },
    // "Address": {
    //
    // },
    // "Parcel": {
    //
    // },
    // "Owner": {
    //
    // },
    // "Contacts": {
    //
    // },
    "Custom Field": {
        free: {
            script: "getAppSpecific(\"FREE\");"
        }
    },
}

export default {variable_map};
