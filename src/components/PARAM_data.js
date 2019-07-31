//This variable map is used to set up the parameters
//New items can be added by adjusting this Object
//A branch terminates when a "script" is met
//The words "free" and "type" allow for special funcationality
//DO NOT USE SCRIPT/FREE/TYPE AS KEYS, THEY IMPLY SPECIAL FUNCTIONALITY
//Free has a child of script and the *** in the script is replaced with the
//  value of free.
//if script == "***ADD ME!" the parameter will go red to show this is not ready

//EVENT SPECIFIC ALSO HAS CUSTOM SCRIPTING, contact Nick Zoner for information.

var variable_map = {
    "General":
    {
        "Date":
        {
            script: "new Date().toString()"
        }
    },
    "Record":
    {
        "ID":
        {
            "Alt ID":
            {
                script: "capId.getCustomID()"
            },
            "CAP ID":
            {
                script: "cap"
            }
        },
        "Structure":
        {
            "Module":
            {
                script: "appTypeString.split[0]"
            },
            "Type":
            {
                script: "appTypeString.split[1]"
            },
            "Sub-Type":
            {
                script: "appTypeString.split[2]"
            },
            "Category":
            {
                script: "appTypeString.split[3]"
            },
        },
        "Status":
        {
            script: "capStatus"
        }
    },
    "Address":
    {
        "Street":
        {
            "Number":
            {
                script: "getAddressComponent(capId, 'houseNumber')"
            },
            "Direction":
            {
                script: "getAddressComponent(capId, 'streetDirection')"
            },
            "Type":
            {
                script: "getAddressComponent(capId, 'streetSuffix')"
            },
            "Name":
            {
                script: "getAddressComponent(capId, 'streetName')"
            }
        },
        "Line":
        {
            "1":
            {
                script: "getAddressComponent(capId, 'addressLine1')"
            },
            "2":
            {
                script: "getAddressComponent(capId, 'addressLine2')"
            },
            "3":
            {
                script: "getAddressComponent(capId, 'addressLine3')"
            },
        },
        "Unit":
        {
            "Number":
            {
                script: "getAddressComponent(capId, 'unitStart')"
            },
            "Type":
            {
                script: "getAddressComponent(capId, 'unitType')"
            }
        },
        "CSZ":
        {
            "City":
            {
                script: "getAddressComponent(capId, 'city')"
            },
            "State":
            {
                script: "getAddressComponent(capId, 'state')"
            },
            "Zip":
            {
                script: "getAddressComponent(capId, 'zip')"
            }
        }
    },
    "Parcel":
    {
        "Parcel Number":
        {
            script: "getParcelComponent(capId, 'parcelNumber')"
        },
        "Tract" :
        {
            script: "getParcelComponent(capId, 'tract')"
        },
        "Block":
        {
            script: "getParcelComponent(capId, 'block')"
        },
        "GIS Sequence Number":
        {
            script: "getParcelComponent(capId, 'gisSeqNo')"
        },
        "Parcel Area":
        {
            script: "getParcelComponent(capId, 'parcelArea')"
        },
        "Land Value":
        {
            script: "getParcelComponent(capId, 'landValue')"
        },
        "Section":
        {
            script: "getParcelComponent(capId, 'section')"
        },
        "Legal Description":
        {
            script: "getParcelComponent(capId, 'legalDescription')"
        },
        "SubDivision":
        {
            script: "getParcelComponent(capId, 'subDivision')"
        },
        "Map Number":
        {
            script: "getParcelComponent(capId, 'mapNo')"
        },
        "Township":
        {
            script: "getParcelComponent(capId, 'townShip')"
        },
        "Lot":
        {
            script: "getParcelComponent(capId, 'lot')"
        }

    },
    "Owner":
    {
        "Personal Information":
        {
            "First Name":
            {
                script: "***ADD ME!"
            },
            "Last Name":
            {
                script: "***ADD ME!"
            },
            "Middle Name":
            {
                script: "***ADD ME!"
            },
            "Email":
            {
                script: "***ADD ME!"
            },
            "Phone 1":
            {
                script: "***ADD ME!"
            },
            "Phone 2":
            {
                script: "***ADD ME!"
            },
            "Phone 3":
            {
                script: "***ADD ME!"
            },
            "Fax?":
            {
                script: "***ADD ME!"
            }
        },
        "Address":
        {
            "Line 1":
            {
                script: "***ADD ME!"
            },
            "Line 2":
            {
                script: "***ADD ME!"
            },
            "Line 3":
            {
                script: "***ADD ME!"
            },
            "City":
            {
                script: "***ADD ME!"
            },
            "State":
            {
                script: "***ADD ME!"
            },
            "Zip":
            {
                script: "***ADD ME!"
            }
        },
    },
    "Contact":
    {
        type:
        {
            "Personal Information":
            {
                "First Name":
                {
                    script: "getContactComponent(capId, '^$*$^', 'firstName')"
                },
                "Last Name":
                {
                    script: "getContactComponent(capId, '^$*$^', 'lastName')"
                },
                "Middle Name":
                {
                    script: "getContactComponent(capId, '^$*$^', 'middleName')"
                },
                "Full Name":
                {
                    script: "getContactComponent(capId, '^$*$^', 'fullName')"
                },
                "Email":
                {
                    script: "getContactComponent(capId, '^$*$^', 'email')"
                },
                "Phone 1":
                {
                    script: "getContactComponent(capId, '^$*$^', 'phone1')"
                },
                "Phone 2":
                {
                    script: "getContactComponent(capId, '^$*$^', 'phone2')"
                },
                "Phone 3":
                {
                    script: "getContactComponent(capId, '^$*$^', 'phone3')"
                },
                "Fax":
                {
                    script: "getContactComponent(capId, '^$*$^', 'fax')"
                },
                "Business Name":
                {
                    script: "getContactComponent(capId, '^$*$^', 'businessName')"
                },
                "Business Name 2":
                {
                    script: "getContactComponent(capId, '^$*$^', 'businessName2')"
                },
                "Title":
                {
                    script: "getContactComponent(capId, '^$*$^', 'title')"
                },
                "Social Security Number":
                {
                    script: "getContactComponent(capId, '^$*$^', 'socialSecurity')"
                },
                "Driver's License Number":
                {
                    script: "getContactComponent(capId, '^$*$^', 'driversLicenseNumber')"
                },
                "Driver's License State":
                {
                    script: "getContactComponent(capId, '^$*$^', 'driversLicenseState')"
                },
                "Birth Date":
                {
                    script: "getContactComponent(capId, '^$*$^', 'birthDate')"
                },
                "Trade Name":
                {
                    script: "getContactComponent(capId, '^$*$^', 'tradeName')"
                }
            },
            "Address":
            {
                "Line 1":
                {
                    script:  "getContactComponent(capId, '^$*$^', 'contactAddressLine1')"
                },
                "Line 2":
                {
                    script: "getContactComponent(capId, '^$*$^', 'contactAddressLine2')"
                },
                "Line 3":
                {
                    script: "getContactComponent(capId, '^$*$^', 'contactAddressLine3')"
                },
                "City":
                {
                    script: "getContactComponent(capId, '^$*$^', 'contactAddressCity')"
                },
                "State":
                {
                    script: "getContactComponent(capId, '^$*$^', 'contactAddressState')"
                },
                "Zip":
                {
                    script: "getContactComponent(capId, '^$*$^', 'contactAddressZip')"
                },
                "Country":
                {
                    script: "getContactComponent(capId, '^$*$^', 'contactAddressCountry')"
                }
            },
            "External Address":
            {
                "Mailing":
                {
                    "Line 1":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalAddressLine1')"
                    },
                    "Line 2":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalAddressLine2')"
                    },
                    "Line 3":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalAddressLine3')"
                    },
                    "City":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalCity')"
                    },
                    "State":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalState')"
                    },
                    "Zip":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalZip')"
                    },
                    "Unit Number":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalUnitStart')"
                    },
                    "Unit Type":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalUnitType')"
                    },
                    "House Number":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalHouseNumber')"
                    },
                    "Street Prefix":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalStreetPrefix')"
                    },
                    "Street Direction":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalStreetDirection')"
                    },
                    "Street Suffix":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Mailing', 'externalStreetSuffix')"
                    }
                },
                "Billing":
                {
                    "Line 1":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalAddressLine1')"
                    },
                    "Line 2":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalAddressLine2')"
                    },
                    "Line 3":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalAddressLine3')"
                    },
                    "City":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalCity')"
                    },
                    "State":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalState')"
                    },
                    "Zip":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalZip')"
                    },
                    "Unit Number":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalUnitStart')"
                    },
                    "Unit Type":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalUnitType')"
                    },
                    "House Number":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalHouseNumber')"
                    },
                    "Street Prefix":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalStreetPrefix')"
                    },
                    "Street Direction":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalStreetDirection')"
                    },
                    "Street Suffix":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Billing', 'externalStreetSuffix')"
                    }
                },
                "Business":
                {
                    "Line 1":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalAddressLine1')"
                    },
                    "Line 2":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalAddressLine2')"
                    },
                    "Line 3":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalAddressLine3')"
                    },
                    "City":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalCity')"
                    },
                    "State":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalState')"
                    },
                    "Zip":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalZip')"
                    },
                    "Unit Number":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalUnitStart')"
                    },
                    "Unit Type":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalUnitType')"
                    },
                    "House Number":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalHouseNumber')"
                    },
                    "Street Prefix":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalStreetPrefix')"
                    },
                    "Street Direction":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalStreetDirection')"
                    },
                    "Street Suffix":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Business', 'externalStreetSuffix')"
                    }
                },
                "Home":
                {
                    "Line 1":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalAddressLine1')"
                    },
                    "Line 2":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalAddressLine2')"
                    },
                    "Line 3":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalAddressLine3')"
                    },
                    "City":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalCity')"
                    },
                    "State":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalState')"
                    },
                    "Zip":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalZip')"
                    },
                    "Unit Number":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalUnitStart')"
                    },
                    "Unit Type":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalUnitType')"
                    },
                    "House Number":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalHouseNumber')"
                    },
                    "Street Prefix":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalStreetPrefix')"
                    },
                    "Street Direction":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalStreetDirection')"
                    },
                    "Street Suffix":
                    {
                        script: "getContactAddressComponent(capId, '^$*$^', 'Home', 'externalStreetSuffix')"
                    }
                }
            },
        }
    },
    "ACA Document Name":
    {
        free:
        {
            script:"determineACADocumentAttached('***')"
        }
    },
    "Custom Field":
    {
        free:
        {
            script: "getAppSpecific(\"***\")"
        }
    },
    "Event Specific":
    {
        "Workflow":
        {
            "Task":
            {
                script: "wfTask"
            },
            "Status":
            {
                script: "wfStatus"
            },
            "Date":
            {
                script: "wfDate"
            },
            "Comment":
            {
                script: "wfComment"
            }
        },
        "Inspection":
        {
            "Type":
            {
                script: "inspTypeArr[0]"
            },
            "Result":
            {
                script: "inspResultArr[0]"
            },
            "ID":
            {
                script: "inspIdArr[0]"
            }
        }
    },
    "Accela Globals":
    {
        "CAP String":
        {
            script: "capIDString"
        },
        "CAP Alias":
        {
            script: "appTypeAlias"
        },
        "CAP Type":
        {
            script: "appTypeString"
        },
        "CAP Name":
        {
            script: "capName"
        },
        "CAP Status":
        {
            script: "capStatus"
        },
        "File Date":
        {
            script: "fileDate"
        },
        "Total Fees (Invoiced)":
        {
            script: "feesInvoicedTotal"
        },
        "Balance Due":
        {
            script: "balanceDue"
        },
        "Parent CAP ID":
        {
            script: "parentCapId"
        }
    }
}

export default {variable_map};
