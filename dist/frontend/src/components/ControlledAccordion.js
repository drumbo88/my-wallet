"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const Accordion_1 = __importDefault(require("@mui/material/Accordion"));
const AccordionDetails_1 = __importDefault(require("@mui/material/AccordionDetails"));
const AccordionSummary_1 = __importDefault(require("@mui/material/AccordionSummary"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const ExpandMore_1 = __importDefault(require("@mui/icons-material/ExpandMore"));
function ControlledAccordion({ items }) {
    items = items || [];
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return items.map((item, i) => {
        const key = item.key || i;
        return (<div>
        <Accordion_1.default expanded={expanded === key} onChange={handleChange(key)}>
          <AccordionSummary_1.default expandIcon={<ExpandMore_1.default />} aria-controls={`${key}bh-content`} id={`${key}bh-header`}>
            <Typography_1.default>{item.title}</Typography_1.default>
          </AccordionSummary_1.default>
          <AccordionDetails_1.default>
            {typeof item.content == "string" ? (<Typography_1.default>{item.content}</Typography_1.default>) : (item.content)}
          </AccordionDetails_1.default>
        </Accordion_1.default>
      </div>);
    });
}
exports.default = ControlledAccordion;
