//This variable map is used to set up the parameters
//New items can be added by adjusting this Object
//A branch terminates when a "script" is met
//The words "free" and "type" allow for special funcationality
//DO NOT USE SCRIPT/FREE/TYPE AS KEYS, THEY IMPLY SPECIAL FUNCTIONALITY
//Free has a child of script and the *** in the script is replaced with the
//  value of free.
//if script == "***ADD ME!" the parameter will go red to show this is not ready

var variable_map = {
    "General": {
        "Date": {
            script: "new Date().toString()"
        }
    },
    "Record": {
        "ID": {
            "Alt ID": {
                script: "capId.getCustomID()"
            },
            "CAP ID": {
                script: "cap"
            }
        },
        "Structure": {
            "Module": {
                script: "appTypeString.split[0]"
            },
            "Type": {
                script: "appTypeString.split[1]"
            },
            "Sub-Type": {
                script: "appTypeString.split[2]"
            },
            "Category": {
                script: "appTypeString.split[3]"
            },
        },
        "Status": {
            script: "capStatus"
        }
    },
    "Address": {
        "Street": {
            "Number": {
                script: "***ADD ME!"
            },
            "Direction": {
                script: "***ADD ME!"
            },
            "Type": {
                script: "***ADD ME!"
            },
            "Name": {
                script: "***ADD ME!"
            }
        },
        "Line": {
            "1": {
                script: "***ADD ME!"
            },
            "2": {
                script: "***ADD ME!"
            },
            "3": {
                script: "***ADD ME!"
            }
        },
        "Unit": {
            "Number": {
                script: "***ADD ME!"
            },
            "Type": {
                script: "***ADD ME!"
            }
        },
        "CSZ": {
            "City": {
                script: "***ADD ME!"
            },
            "State": {
                script: "***ADD ME!"
            },
            "Zip": {
                script: "***ADD ME!"
            }
        }
    },
    "Parcel": {
        script: "***ADD ME!"
    },
    "Owner": {
        "Street": {
            "Number": {
                script: "***ADD ME!"
            },
            "Direction": {
                script: "***ADD ME!"
            },
            "Type": {
                script: "***ADD ME!"
            },
            "Name": {
                script: "***ADD ME!"
            }
        },
        "Address": {
            "Line": {
                "1": {
                    script: "***ADD ME!"
                },
                "2": {
                    script: "***ADD ME!"
                },
                "3": {
                    script: "***ADD ME!"
                }
            },
            "CSZ": {
                "City": {
                    script: "***ADD ME!"
                },
                "State": {
                    script: "***ADD ME!"
                },
                "Zip": {
                    script: "***ADD ME!"
                }
            }
        }
    },
    "Contact": {
        type: {
            "Personal Information": {
                "First Name": {
                    script: "***ADD ME!"
                },
                "Last Name": {
                    script: "***ADD ME!"
                },
                "Middle Name": {
                    script: "***ADD ME!"
                },
                "Email": {
                    script: "***ADD ME!"
                },
                "Phone 1": {
                    script: "***ADD ME!"
                },
                "Phone 2": {
                    script: "***ADD ME!"
                },
                "Phone 3": {
                    script: "***ADD ME!"
                },
                "Fax?": {
                    script: "***ADD ME!"
                }
            },
            "Address": {
                "Line": {
                    "1": {
                        script: "***ADD ME!"
                    },
                    "2": {
                        script: "***ADD ME!"
                    },
                    "3": {
                        script: "***ADD ME!"
                    }
                }
            },
            "CSZ": {
                "City": {
                    script: "***ADD ME!"
                },
                "State": {
                    script: "***ADD ME!"
                },
                "Zip": {
                    script: "***ADD ME!"
                }
            }
        }
    },
    "Custom Field": {
        free: {
            script: "getAppSpecific(\"***\")"
        }
    },
    "Event Specific": {
        'Workflow': {
            "Task": {
                script: "wfTask"
            },
            "Status": {
                script: "wfStatus"
            },
            "Date": {
                script: "wfDate"
            },
            "Comment": {
                script: "wfComment"
            }
        }
    },
    "Accela Globals": {
        "CAP String": {
            script: "capIDString"
        },
        "CAP Alias": {
            script: "appTypeAlias"
        },
        "CAP Type": {
            script: "appTypeString"
        },
        "CAP Name": {
            script: "capName"
        },
        "CAP Status": {
            script: "capStatus"
        },
        "File Date": {
            script: "fileDate"
        },
        "Total Fees (Invoiced)": {
            script: "feesInvoicedTotal"
        },
        "Balance Due": {
            script: "balanceDue"
        },
        "Parent CAP ID": {
            script: "parentCapId"
        }
    }
}

export default {variable_map};
