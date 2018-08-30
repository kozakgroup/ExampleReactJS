import "./Checkbox.scss";
import React, {Component} from "react";
import {Checkbox as BootstrapCheckbox, Tooltip, OverlayTrigger} from "react-bootstrap";
import PropTypes from "prop-types";
import * as classname from "classname";

export class Checkbox extends Component {
    static propTypes = {
        isChecked: PropTypes.bool,

        tooltipText: PropTypes.string,
        checkboxClass: PropTypes.string,
        small: PropTypes.bool,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
    };

    render() {
        const {
            tooltipText,
            onChange,
            isChecked,
            disabled,
            checkboxClass,
            small,
            onClick
        } = this.props;

        const tooltip = (
            <Tooltip id="tooltip"><strong>{tooltipText}</strong></Tooltip>
        );

        const overlayTrigger = tooltipText && tooltipText.length ? (
            <OverlayTrigger
                placement="top"
                overlay={tooltip}>
                <div className="questionMark">
                    ?
                </div>
            </OverlayTrigger>
        ) : "";

        return (
            <div className={classname ("Checkbox", "checkbox__wrapper", checkboxClass, {small: small})}
                 onClick={onClick}>
                <div className="checkbox_label_and_questionMark__wrapper">
                    <label className="checkboxLabel">
                        {this.props.children}
                    </label>
                    {overlayTrigger}
                </div>
                <BootstrapCheckbox
                    inline
                    className={classname ({"regular-checkbox": !small})}
                    onChange={onChange}
                    checked={isChecked}
                    disabled={disabled}/>
            </div>
        );
    }
}