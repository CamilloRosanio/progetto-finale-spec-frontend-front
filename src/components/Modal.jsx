// UTILITY
import { createPortal } from "react-dom";


// COMPONENTS
import RoundButton from "./RoundButton";


// COMPONENT EXPORT
export default function Modal({ showModal, message, confirm, close }) {

    return createPortal(<>

        {showModal &&
            <div className="modalContainer">
                <div className="modal">
                    <div className="flexCol">
                        <div className="flex modalheader">
                            <h2>Confirm action</h2>
                            <RoundButton onClick={close} />
                        </div>

                        <p>{message}</p>
                    </div>

                    <div className="flex">
                        <button className="button" onClick={confirm}>confirm</button>
                        <button className="button close" onClick={close}>close</button>
                    </div>
                </div>
            </div>
        }
    </>
        ,
        document.body
    )
}