"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/styles");
const Chip = (props) => {
    const StyledChip = (0, styles_1.withStyles)({
        root: {
            'color': 'white',
            'backgroundColor': `${props.color} !important`,
            '&:hover': {
                backgroundColor: props.color,
                filter: 'brightness(120%)',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: props.color,
                borderColor: props.color,
            },
        },
        outlined: {
            color: props.color,
            border: `1px solid ${props.color}`,
            backgroundColor: `transparent !important`,
        },
        icon: {
            color: props.variant === 'outlined' ? props.color : 'white',
        },
        deleteIcon: {
            color: props.variant === 'outlined' ? props.color : 'white',
        },
    })(material_1.Chip);
    return <StyledChip {...props}/>;
};
/*Chip.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.oneOf(['regular, outlined']),
};*/
exports.default = Chip;
