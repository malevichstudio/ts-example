import React from 'react'
import { Modal, Backdrop, Fade } from '@material-ui/core'
import useStyles from './styles'

const ModalBox: React.FC<{
    isOpen: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({isOpen, setOpen, children}) => {
    const classes = useStyles();

    return (
        <Modal
            open={isOpen}
            onClose={() => setOpen(false)}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <div className={classes.modalPaper}>
                    {children}
                </div>
            </Fade>
        </Modal>
    )
}
export default ModalBox
