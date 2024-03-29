import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class FEE_FeeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cf_mode: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.switchMode = this.switchMode.bind(this);
    }

    switchMode() {
        this.setState({cf_mode: !this.state.cf_mode});
    }

    handleChange(event) {
        let newFees = _.cloneDeep(this.props.fees);
        let type = event.target.id.split("-");
        newFees[this.props.fee_number][type[0]] = event.target.value;
        this.props.update({
            fees: newFees
        });
        this.forceUpdate();
    }

    loadSchedules() {
        let used_schedules = []
        let schedules = [<option key={-1}/>].concat(this.props.loaded_fees.filter(item => {
            if (used_schedules.includes(item.schedule)) {
                return false;
            } else {
                used_schedules.push(item.schedule);
                return true;
            }
        }).filter(item => {
            if (this.props.loaded_id >= 0) {
                return this.props.loaded_data[this.props.loaded_id].fee_code === item.schedule;
            } else {
                return true;
            }
        }).sort((item1, item2) => {
            return item1.schedule.localeCompare(item2.schedule);
        }).map(item => {
            return <option key={item.key} label={item.schedule} value={item.schedule}/>
        }));
        return schedules;
    }

    loadCodes() {
        let codes = [<option key={-1}/>]
        if (this.props.fees[this.props.fee_number].schedule) {
            let used_codes = []
            codes = codes.concat(this.props.loaded_fees.filter(item => {
                return item.schedule === this.props.fees[this.props.fee_number].schedule;
            }).filter(item => {
                if (used_codes.includes(item.code)) {
                    return false;
                } else {
                    used_codes.push(item.code);
                    return true;
                }
            }).sort((item1, item2) => {
                return item1.code.localeCompare(item2.code);
            }).map(item => {
                return <option key={item.key} label={item.code+" - "+item.desc} value={item.code}/>
            }));
        }
        return codes;
    }

    loadOptionsFromData() {
        return [<option key={-1}/>].concat(this.props.loaded_asis.filter(item => {
            if (this.props.loaded_id >= 0) {
                return this.props.loaded_data[this.props.loaded_id].asi_code === item.code;
            } else {
                return true;
            }
        }).filter(item => {
            return item.group === "APPLICATION";
        }).sort((item1, item2) => {
            if (item1.code.localeCompare(item2.code) === 0) {
                if (item1.type.localeCompare(item2.type) === 0) {
                    return (item1.alias ? item1.alias : item1.name).localeCompare((item2.alias ? item2.alias : item2.name));
                } else {
                    return item1.type.localeCompare(item2.type)
                }
            } else {
                return item1.code.localeCompare(item2.code);
            }
        }).map(item => {
            return <option key={item.key} label={item.alias ? item.code+" - "+item.type+" - "+item.alias : item.code+" - "+item.type+" - "+item.name} value={item.name}/>
        }));
    }

    render() {
        return (
        <tr>
            <td>{this.props.fee_number}</td>
            <td>
                {this.props.loaded_fees ?
                    <Form.Control id={"schedule-"+this.props.fee_number} defaultValue={this.props.fees[this.props.fee_number].schedule} type="text" as="select" onChange={this.handleChange}>
                        {this.loadSchedules()}
                    </Form.Control>
                :
                    <Form.Control id={"schedule-"+this.props.fee_number} defaultValue={this.props.fees[this.props.fee_number].schedule} type="text" onChange={this.handleChange}/>
                }
            </td>
            <td>
                {this.props.loaded_fees ?
                    <Form.Control id={"code-"+this.props.fee_number} type="text" as="select" onChange={this.handleChange}>
                        {this.loadCodes()}
                    </Form.Control>
                :
                    <Form.Control id={"code-"+this.props.fee_number} type="text" onChange={this.handleChange}/>
                }
            </td>
            {this.props.isAdvanced ?
            <td>
                <Form.Control id={"period-"+this.props.fee_number} defaultValue={this.props.fees[this.props.fee_number].period} as="select" onChange={this.handleChange}>
                    <option>FINAL</option>
                </Form.Control>
            </td>
            : null}
            {this.props.loaded_fees ?
                <td>
                    <Form.Check checked={this.state.cf_mode} onChange={this.switchMode}/>
                </td>
            : null }
            {this.props.loaded_fees ?
                <td>
                    {this.state.cf_mode ?
                        <Form.Control id={"quantity-"+this.props.fee_number} as="select" onChange={this.handleChange}>
                            {this.loadOptionsFromData()}
                        </Form.Control>
                    :
                        <Form.Control id={"quantity-"+this.props.fee_number} type="number" onChange={this.handleChange}/>
                    }
                </td>
            :
                <td>
                    <OverlayTrigger overlay={<Tooltip>
                        This field will accept either a number or text.  If text is provided, the quantity will be set using a custom field. This field will become bold if text is detected.
                    </Tooltip>}>
                        <Form.Control varient="danger" id={"quantity-"+this.props.fee_number} onChange={this.handleChange} style={{fontWeight: (this.props.fees[this.props.fee_number].quantity && !isNaN(parseFloat(this.props.fees[this.props.fee_number].quantity))) ? "normal":"bold"}}/>
                    </OverlayTrigger>
                </td>
            }
            {this.props.isAdvanced ?
            <td>
                <Form.Control id={"invoice-"+this.props.fee_number} defaultValue={this.props.fees[this.props.fee_number].invoice} as="select" onChange={this.handleChange}>
                    <option value={"Y"}>Yes</option>
                    <option value={"N"}>No</option>
                </Form.Control>
            </td>
            : null}
            {this.props.fee_number !== 1 ?
            <td>
                <button onClick={() => {
                    this.props.delete(this.props.fee_number);
                }}>
                    Delete
                </button>
            </td>
            : null}
        </tr>
        );
    }
}

const mapStateToProps = state => ({
    fees: state.fees,
    isAdvanced: state.functionality.fees_advanced,
    loaded_fees: state.loaded_data.fees,
    loaded_data: state.loaded_data.caps,
    loaded_id: state.structure.loaded_id,
    loaded_asis: state.loaded_data.asis
});

const mapDispatchToProps = dispatch => ({
    update: fees => dispatch({
        type: "update_fees",
        payload: fees
    }),
    delete: f => dispatch({
        type: "delete_fee",
        payload: f
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FEE_FeeItem);
