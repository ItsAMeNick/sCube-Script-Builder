var data = {
    condition_types: [
        {
            label: "--Select--",
            value: null
        },
        {
            label: "Application Status",
            value: "appStatus"
        },
        {
            label: "Workflow",
            value: "wf"
        },
        {
            label: "Custom Fields",
            value: "cf"
        },
        {
            label: "CAP",
            value: "cap"
        },
        {
            label: "Contact",
            value: "contact"
        },
        {
            label: "Address",
            value: "address"
        },
    ],
    comparison_x: {
        "appStatus": [
            {
                label: "",
                value: null,
                type: null,
            },
            {
                label: "Application Status",
                value: "appStatus",
                type: "string",
            }
        ],
        "wf": [
            {
                label: "",
                value: null,
                type: null,
            },
            {
                label: "Task",
                value: "wfTask",
                type: "string",
            },
            {
                label: "Status",
                value: "wfStatus",
                type: "string",
            }
        ],
        "cf": [{
            label: "cf",
            value: null,
            type: "string",
        }],
        "cap": [
            {
                label: "",
                value: null,
                type: null,
            },
            {
                label: "ALT ID",
                value: "altId",
                type: "string",
            },
            {
                label: "SERV PROV CODE",
                value: "svp",
                type: "string",
            },
            {
                label: "ID 1",
                value: "id1",
                type: "string",
            },
            {
                label: "ID 2",
                value: "id2",
                type: "string",
            },
            {
                label: "ID 3",
                value: "id3",
                type: "string",
            }
        ],
        "contact": [
            {
                label: "",
                value: null,
                type: null,
            },
            {
                label: "Full Name",
                value: "name",
                type: "string",
            }
            ],
        "address": [
            {
                label: "",
                value: null,
                type: null,
            },
            {
                label: "Full Address",
                value: "address",
                type: "string",
            }
        ]
    },
    comparison_types: {
        "string": [
            {
                label: "",
                value: null
            },
            {
                label: "=",
                value: "equal"
            }
        ]
    }
};

export { data };
