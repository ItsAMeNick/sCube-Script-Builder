import React, { Component } from 'react';
import { connect } from "react-redux";

import jszip from "jszip";
import fxp from "fast-xml-parser";

class CORE_Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.files[0])
        if (event.target.files[0] && event.target.files[0].type === "application/x-zip-compressed") {
            jszip.loadAsync(event.target.files[0]).then(zip => {
                let file_names = Object.keys(zip.files).filter(f => {
                    return !zip.files[f].dir
                });
                for (let f in file_names) {
                    let file = zip.files[file_names[f]]
                    file.async("text").then(file_text => {
                        switch(file_names[f]) {
                            case "CapTypeModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list;
                                let filteredJSON = [];
                                for (let i in rawJSON) {
                                    for (let a in rawJSON[i]) {
                                        let cap = rawJSON[i][a];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            module: cap.group,
                                            type: cap.type,
                                            subtype: cap.subType,
                                            category: cap.category,
                                            alias: cap.alias,
                                            asi_code: cap.specInfoCode,
                                            fee_code: cap.feeScheduleName
                                        });
                                    }
                                }
                                this.props.update("caps", filteredJSON);
                                break;
                            }
                            case "ASIGroupModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.asiGroup;
                                let filteredJSON = [];
                                for (let i in rawJSON) {
                                    for (let a in rawJSON[i].asiModels.asiModel) {
                                        let asi = rawJSON[i].asiModels.asiModel[a];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            code: asi.r1CheckboxCode,
                                            name: asi.r1CheckboxDesc,
                                            group: asi.r1CheckboxGroup,
                                            type: asi.r1CheckboxType,
                                            alias: asi.subGroupAlias
                                        });
                                    }
                                }
                                this.props.update("asis", filteredJSON);
                                break;
                            }
                            case "RefFeeScheduleModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.refFeeSchedule;
                                console.log(rawJSON);
                                let filteredJSON = [];
                                for (let i in rawJSON) {
                                    for (let f in rawJSON[i].refFeeItemModels.refFeeItem) {
                                        let fee = rawJSON[i].refFeeItemModels.refFeeItem[f];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            schedule: fee.feeScheduleName,
                                            code: fee.feeCod,
                                        });
                                    }
                                }
                                this.props.update("fees", filteredJSON);
                                break;
                            }
                            default: {
                                console.log("Ignoring File: " + file_names[f]);
                                break;
                            }
                        }
                    });
                }
            })
        } else {
            console.log("INVALID FILE UPLOAD!");
        }
    }

    render() {
        return (
        <div>
             <input type="file" name="file" onChange={this.handleChange}/>
        </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    update: (type, data) => dispatch({
        type: "load_file_data",
        payload: {
            type: type,
            data: data
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Upload);
