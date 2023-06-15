"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button_1 = __importDefault(require("@mui/material/Button"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const Fab_1 = __importDefault(require("@mui/material/Fab"));
const Add_1 = __importDefault(require("@mui/icons-material/Add"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const Favorite_1 = __importDefault(require("@mui/icons-material/Favorite"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Navigation_1 = __importDefault(require("@mui/icons-material/Navigation"));
const Modal_1 = __importDefault(require("@mui/material/Modal"));
const style = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function HomePage() {
    const [open, setOpen] = react_1.default.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (<div>
        <div>
        <Button_1.default onClick={handleOpen}>Open modal</Button_1.default>
        <Modal_1.default open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box_1.default sx={style}>
            <Typography_1.default id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography_1.default>
            <Typography_1.default id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography_1.default>
          </Box_1.default>
        </Modal_1.default>
      </div>
      <Button_1.default variant="outlined">Texto</Button_1.default>
      <Button_1.default variant="contained">Texto</Button_1.default>
      <Fab_1.default color="primary" aria-label="add">
        <Add_1.default />
      </Fab_1.default>
      <Fab_1.default color="secondary" aria-label="edit">
        <Edit_1.default />
      </Fab_1.default>
      <Fab_1.default variant="extended">
        <Navigation_1.default sx={{ mr: 1 }}/>
        Navigate
      </Fab_1.default>
      <Fab_1.default disabled aria-label="like">
        <Favorite_1.default />
      </Fab_1.default> 
    </div>);
}
exports.default = HomePage;
