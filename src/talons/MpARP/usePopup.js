import {useState, useCallback} from 'react'

export const usePopup = props => {

    // const {popupWrapperRef} = props

    const [isClose, setIsClose] = useState(false)

    const [isShowButton, setIsShowButton] = useState(false)

    const [isMiniPopup, setIsMiniPopup] = useState(false)

    const handleSetIsShowButton = useCallback((value) => setIsShowButton(value), [setIsShowButton])

    const handleSetIsMiniPopup = useCallback((value) => setIsMiniPopup(value), [setIsMiniPopup])

    const handleSetIsClose = useCallback(() => setIsClose(!isClose), [isClose, setIsClose])

    const handleShowButton = useCallback((type) => {
        if(type === 'enter') {
            handleSetIsShowButton(true)
        } else if (type === 'leave') {
            handleSetIsShowButton(false)
        }
    }, [handleSetIsShowButton])

    const handleMiniPopup = useCallback(() => {
        handleSetIsMiniPopup(true)
        handleSetIsShowButton(false)
    }, [handleSetIsMiniPopup, handleSetIsShowButton])

    const handleMaxPopup = useCallback(() => {
        handleSetIsMiniPopup(false)
        handleSetIsShowButton(true)
    }, [handleSetIsMiniPopup, handleSetIsShowButton])

    return {
        isClose,
        isShowButton,
        isMiniPopup,
        handleSetIsClose,
        handleShowButton,
        handleMiniPopup,
        handleMaxPopup
    }
}