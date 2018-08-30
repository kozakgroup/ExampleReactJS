import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";

export class PromoConfirmationPopup extends Component {
    static propTypes = {
        show: PropTypes.bool,

        name: PropTypes.string,

        onRegisterPromo: PropTypes.func,
        onCancelButtonClick: PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let diamond = require("../../../../resources/icons/svg/diamond.svg");

        return (
            <Modal id="PromoConfirmationPopup" show={this.props.show} onHide={this.onModalHide}>
                <div className="form-wrapper">
                    <div className="form__header">
                        <div className="form__header__cancelBtn-wrapper">
                            <button className="form__header__cancelBtn"
                                onClick={this.props.onCancelButtonClick}>
                                <i className="fa fa-times fa-lg" aria-hidden="true"/>
                            </button>
                        </div>

                        <div className="form__header__logo-wrapper">
                            <SVGInline svg={diamond} className="form__header__logo-img"/>
                            <div className="form__header__logo__siteName-wrapper">
                                <div className="form__header__logo__siteName__topRow">treasure</div>
                                <div className="form__header__logo__siteName__bottomRow">systems</div>
                            </div>
                        </div>

                        <div className="form__header__title-wrapper">
                            <h1 className="modal-header">{`Send Promo ${this.props.name} to treasure admin for review`}</h1>
                        </div>
                    </div>

                    <div className="form__content-wrapper">
                        <div className="form__content__inputBtn-wrapper">
                            <Button className="black__btn form__content__actionBtn"
                                onClick={this.onRegisterPromo}
                            >
                                {"SEND"}
                            </Button>

                            <Button className="black__btn form__content__actionBtn"
                                onClick={this.props.onCancelButtonClick}
                            >
                                {"Cancel"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    onRegisterPromo = () => {
        this.props.onCancelButtonClick();
        this.props.onRegisterPromo();
    }
}