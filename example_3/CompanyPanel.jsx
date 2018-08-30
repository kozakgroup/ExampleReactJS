import React, {Component} from "react";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import {COLOR_BLUE, COLOR_GREEN, COLOR_WHITE} from "../../../common/constants/colors";

export class CompanyPanel extends Component {
    static propTypes = {
        companies: PropTypes.array,

        onChooseCompany: PropTypes.func,
        onNewCompany: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            activeCompany: null,
            isNew: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.activeCompany !== nextProps.companyId) {
            this.setState({
                activeCompany: nextProps.companyId,
            });
        }
    }

    render() {
        const suiteCase = require("../../../../resources/icons/svg/suiteCase.svg");
        const active = this.state.isNew ? "active" : "";

        return (
            <div className="navPage__leftBar__Subcategory-wrapper">
                <div className="navPage__leftBar__Subcategory__section-wrapper">
                    <div className="navPage__leftBar__Subcategory__text-title">
                        <h2>{"COMPANIES"}</h2>
                    </div>
                </div>

                <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                    <button
                        className={`navPage__leftBar__Subcategory__addBtn at-panel ${active}`}
                        onClick={this.onNewCompanyButtonClick}
                    >
                        <div className="navPage__leftBar__Subcategory__text-Subcategory">
                            <h3>{"+ Add New"}</h3>
                        </div>
                    </button>
                </div>

                <div className="navPage__leftBar__Subcategory__subsection-wrapper">
                    {this.props.companies && this.props.companies.map((item, index) => {
                        if (item._id !== 0) {
                            const selected = item._id === this.props.companyId ? " selected" : "";
                            let iconColor;

                            if (selected) {
                                iconColor = COLOR_BLUE;
                            } else {
                                if (item.completed) {
                                    iconColor = COLOR_GREEN;
                                } else {
                                    iconColor = COLOR_WHITE;
                                }
                            }
                            return (
                                <div key={index}
                                    id={item._id}
                                    className={`navPage__leftBar__Subcategory__text-item-wrapper ${selected}`}
                                    onClick={this.onCompanyItemClick}>
                                    <span id={item._id}
                                        className="navPage__leftBar__Subcategory__text-itemIcon">
                                        <SVGInline
                                            fill={iconColor}
                                            id={item._id}
                                            width='13px'
                                            height='13px'
                                            className={"img__smallIcon"}
                                            svg={suiteCase}
                                        />
                                    </span>
                                    <div className="navPage__leftBar__Subcategory__text-items"
                                        id={item._id}>
                                        {item.name}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }

    onCompanyItemClick = (e) => {
        this.setState({
            activeCompany: e.target.id,
            isNew: false,
        });

        this.props.onChooseCompany(e.target.id);
    };

    onNewCompanyButtonClick = () => {
        this.setState({isNew: true, activeCompany: null});
        this.props.onNewCompany();
    }
}