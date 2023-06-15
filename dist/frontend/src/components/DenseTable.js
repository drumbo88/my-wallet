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
const Table_1 = __importDefault(require("@mui/material/Table"));
const TableBody_1 = __importDefault(require("@mui/material/TableBody"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
const TableHead_1 = __importDefault(require("@mui/material/TableHead"));
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
function DenseTable({ rows, columns }) {
    return (<TableContainer_1.default component={Paper_1.default}>
      <Table_1.default sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead_1.default>
          <TableRow_1.default>
            {columns.map((col, colIndex) => {
            var _a, _b;
            return (<TableCell_1.default key={colIndex} align={(_a = col.align) !== null && _a !== void 0 ? _a : 'inherit'}>{(_b = col.text) !== null && _b !== void 0 ? _b : col}</TableCell_1.default>);
        })}
          </TableRow_1.default>
        </TableHead_1.default>
        <TableBody_1.default>
          {rows.map((row, rowIndex) => (<TableRow_1.default key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((col, colIndex) => {
                var _a;
                return (<TableCell_1.default key={colIndex} align={(_a = col.align) !== null && _a !== void 0 ? _a : 'inherit'} component={colIndex ? undefined : 'th'} scope={colIndex ? '' : 'row'}>
                  {row[col.prop]}
                </TableCell_1.default>);
            })}
            </TableRow_1.default>))}
        </TableBody_1.default>
      </Table_1.default>
    </TableContainer_1.default>);
}
exports.default = DenseTable;
