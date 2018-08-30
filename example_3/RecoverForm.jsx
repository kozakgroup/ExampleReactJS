import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import {Input} from "../../../common/components/Input";
import {getErrorText} from "../../../common/util/errorUtil";
import {Alert} from "../../../common/components/Alert/Alert";
import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";

export class RecoverForm extends Component {
    static propTypes = {
        failed: PropTypes.bool,
        show: PropTypes.bool,
        sent: PropTypes.bool,

        errorCode: PropTypes.bool,
        email: PropTypes.string,

        onRecoverEmailChange: PropTypes.func,
        onSwitchToSigninForm: PropTypes.func,
        onRecoverPass: PropTypes.func,
    };

    render() {
        const diamond = require("../../../../resources/icons/svg/diamond.svg");
        const disabled = !(this.props.email && this.props.email.length > 4);

        return (
            <Modal show={this.props.show} onHide={this.onModalHide}>
                <div className="form-wrapper">
                    <div className="form__header">
                        <div className="form__header__cancelBtn-wrapper">
                            <button className="form__header__cancelBtn"
                                onClick={this.props.onSwitchToSigninForm}
                            >
                                <i className="fa fa-times fa-lg" aria-hidden="true"/>
                            </button>
                        </div>

                        <div className="form__header__logo-wrapper">
                            <SVGInline svg={diamond} width='30px' className="form__header__logo-img"/>
                            <div className="form__header__logo__siteName-wrapper">
                                <div className="form__header__logo__siteName__topRow">treasure</div>
                                <div className="form__header__logo__siteName__bottomRow">systems</div>
                            </div>
                        </div>
                        <div className="form__header__title-wrapper">
                            <h1>{"RECOVER PASSWORD"}</h1>
                        </div>
                    </div>

                    <div className="form__content-wrapper">
                        {this.props.failed && <Alert type={"error"} text={getErrorText(this.props.errorCode)}/>}

                        {this.props.sent &&
                        <Alert type={"success"} text={"Letter was sent successfully. Check your mailbox!"}/>}

                        <div className="form__content__inputs-wrapper">
                            <Input label={""}
                                value={this.props.email}
                                onChange={this.props.onRecoverEmailChange}
                                inputClass={"input__wrapper-w100"}
                                placeholder={"Verified email"}
                            />
                        </div>

                        <div className="form__content__inputBtn-wrapper">
                            <Button className="black__btn form__content__actionBtn"
                                onClick={this.props.onSwitchToSigninForm}
                            >
                                {"CANCEL"}
                            </Button>

                            <Button className="black__btn form__content__actionBtn"
                                disabled={disabled}
                                onClick={this.onClick}
                            >
                                {"RESET PASSWORD"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    onClick = () => {
        this.props.onRecoverPass(this.props.email);
    };

    onModalHide = () => {
        // do nothing
    };
}