//This variable map is used to set up the parameters
//New items can be added by adjusting this Object
//A branch terminates when a "script" is met
//The words "free" and "type" allow for special funcationality
//DO NOT USE SCRIPT/FREE/TYPE AS KEYS, THEY IMPLY SPECIAL FUNCTIONALITY
//------------------------------------
//Free has a child of script and the *** in the script is replaced with the
//  value of free.
//------------------------------------
// SO I went around to beefing up "type".
// now use "type.SOMETHING"
// in the eventual script use ^$SOMETHING$^ as your placeholder
// the SOMETHING can techincally be anything, but nested
// types' SOMETHING must be evaluate as > the preceding one
// they are evaluated as strings for comparison purposes
// Basically if you use string good luck, but numbers should have no issue as
// long as you remain below 9 (0-9)
// you could also use a-Z which would provide 52 levels if you really need
// that kind of mess in your life.
//-----------------------------------------
//EVENT SPECIFIC ALSO HAS CUSTOM SCRIPTING, contact Nick Zoner for information.
// I probably wont even know... :'(

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
        "type.1":
        {
            "Personal Information":
            {
                "First Name":
                {
                    script: "getContactComponent(capId, '^$1$^', 'firstName')"
                },
                "Last Name":
                {
                    script: "getContactComponent(capId, '^$1$^', 'lastName')"
                },
                "Middle Name":
                {
                    script: "getContactComponent(capId, '^$1$^', 'middleName')"
                },
                "Full Name":
                {
                    script: "getContactComponent(capId, '^$1$^', 'fullName')"
                },
                "Email":
                {
                    script: "getContactComponent(capId, '^$1$^', 'email')"
                },
                "Phone 1":
                {
                    script: "getContactComponent(capId, '^$1$^', 'phone1')"
                },
                "Phone 2":
                {
                    script: "getContactComponent(capId, '^$1$^', 'phone2')"
                },
                "Phone 3":
                {
                    script: "getContactComponent(capId, '^$1$^', 'phone3')"
                },
                "Fax":
                {
                    script: "getContactComponent(capId, '^$1$^', 'fax')"
                },
                "Business Name":
                {
                    script: "getContactComponent(capId, '^$1$^', 'businessName')"
                },
                "Business Name 2":
                {
                    script: "getContactComponent(capId, '^$1$^', 'businessName2')"
                },
                "Title":
                {
                    script: "getContactComponent(capId, '^$1$^', 'title')"
                },
                "Social Security Number":
                {
                    script: "getContactComponent(capId, '^$1$^', 'socialSecurity')"
                },
                "Driver's License Number":
                {
                    script: "getContactComponent(capId, '^$1$^', 'driversLicenseNumber')"
                },
                "Driver's License State":
                {
                    script: "getContactComponent(capId, '^$1$^', 'driversLicenseState')"
                },
                "Birth Date":
                {
                    script: "getContactComponent(capId, '^$1$^', 'birthDate')"
                },
                "Trade Name":
                {
                    script: "getContactComponent(capId, '^$1$^', 'tradeName')"
                }
            },
            "Address":
            {
                "Line 1":
                {
                    script:  "getContactComponent(capId, '^$1$^', 'contactAddressLine1')"
                },
                "Line 2":
                {
                    script: "getContactComponent(capId, '^$1$^', 'contactAddressLine2')"
                },
                "Line 3":
                {
                    script: "getContactComponent(capId, '^$1$^', 'contactAddressLine3')"
                },
                "City":
                {
                    script: "getContactComponent(capId, '^$1$^', 'contactAddressCity')"
                },
                "State":
                {
                    script: "getContactComponent(capId, '^$1$^', 'contactAddressState')"
                },
                "Zip":
                {
                    script: "getContactComponent(capId, '^$1$^', 'contactAddressZip')"
                },
                "Country":
                {
                    script: "getContactComponent(capId, '^$1$^', 'contactAddressCountry')"
                }
            },
            "External Address":
            {
                "Mailing":
                {
                    "Line 1":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalAddressLine1')"
                    },
                    "Line 2":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalAddressLine2')"
                    },
                    "Line 3":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalAddressLine3')"
                    },
                    "City":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalCity')"
                    },
                    "State":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalState')"
                    },
                    "Zip":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalZip')"
                    },
                    "Unit Number":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalUnitStart')"
                    },
                    "Unit Type":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalUnitType')"
                    },
                    "House Number":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalHouseNumber')"
                    },
                    "Street Prefix":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalStreetPrefix')"
                    },
                    "Street Direction":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalStreetDirection')"
                    },
                    "Street Suffix":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Mailing', 'externalStreetSuffix')"
                    }
                },
                "Billing":
                {
                    "Line 1":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalAddressLine1')"
                    },
                    "Line 2":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalAddressLine2')"
                    },
                    "Line 3":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalAddressLine3')"
                    },
                    "City":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalCity')"
                    },
                    "State":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalState')"
                    },
                    "Zip":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalZip')"
                    },
                    "Unit Number":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalUnitStart')"
                    },
                    "Unit Type":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalUnitType')"
                    },
                    "House Number":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalHouseNumber')"
                    },
                    "Street Prefix":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalStreetPrefix')"
                    },
                    "Street Direction":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalStreetDirection')"
                    },
                    "Street Suffix":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Billing', 'externalStreetSuffix')"
                    }
                },
                "Business":
                {
                    "Line 1":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalAddressLine1')"
                    },
                    "Line 2":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalAddressLine2')"
                    },
                    "Line 3":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalAddressLine3')"
                    },
                    "City":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalCity')"
                    },
                    "State":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalState')"
                    },
                    "Zip":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalZip')"
                    },
                    "Unit Number":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalUnitStart')"
                    },
                    "Unit Type":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalUnitType')"
                    },
                    "House Number":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalHouseNumber')"
                    },
                    "Street Prefix":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalStreetPrefix')"
                    },
                    "Street Direction":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalStreetDirection')"
                    },
                    "Street Suffix":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Business', 'externalStreetSuffix')"
                    }
                },
                "Home":
                {
                    "Line 1":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalAddressLine1')"
                    },
                    "Line 2":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalAddressLine2')"
                    },
                    "Line 3":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalAddressLine3')"
                    },
                    "City":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalCity')"
                    },
                    "State":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalState')"
                    },
                    "Zip":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalZip')"
                    },
                    "Unit Number":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalUnitStart')"
                    },
                    "Unit Type":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalUnitType')"
                    },
                    "House Number":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalHouseNumber')"
                    },
                    "Street Prefix":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalStreetPrefix')"
                    },
                    "Street Direction":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalStreetDirection')"
                    },
                    "Street Suffix":
                    {
                        script: "getContactAddressComponent(capId, '^$1$^', 'Home', 'externalStreetSuffix')"
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
        "From This Record": {
            free:
            {
                script: "getAppSpecific(\"***\")"
            }
        },
        "From Parent": {
            free:
            {
                script: "getAppSpecific(\"***\", getParent())"
            }
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
    },
    "Inspection":
    {
        "type.1":
        {
            "type.2":
            {
                "type.3":
                {
                    "type.4":
                    {
                        "type.5":
                        {
                            "type.6":
                            {
                                "type.7":
                                {
                                    script: "zachsCoolFunction('^$1$^', '^$2$^', '^$3$^', '^$4$^', '^$5$^', '^$6$^', '^$7$^')"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default {variable_map};
