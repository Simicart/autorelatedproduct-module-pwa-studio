import React, {useMemo, useRef} from 'react';
import defaultClasses from './popup.css'
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { X, ChevronDown, ChevronUp } from 'react-feather'
import {usePopup} from '../../talons/MpARP/usePopup'
import {Item} from '../GridItem'
import * as Constants from '../../constants'

const Popup = props => {
    const popupWrapperRef = useRef(null)
    const classes = mergeClasses(defaultClasses, props.classes);
    const {item} = props;
    const {match_products, location, block_name, rule_id} = item;

    const talonProps = usePopup({popupWrapperRef});

    const {
        isClose,
        isShowButton,
        isMiniPopup,
        handleSetIsClose,
        handleShowButton,
        handleMiniPopup,
        handleMaxPopup
    } = talonProps

    const blockName = useMemo(() => {
        if(block_name) {
            return block_name
        }

        return 'Recommended for you'
    }, [block_name])

    const headerButton = useMemo(() => {
        if(isMiniPopup) {
            return (
                <div className={`${classes.header}`}>
                    <div className={classes.headerButton} onClick={handleMaxPopup}>
                        <ChevronUp size={16}/>
                    </div> 
                    {isShowButton ? <div className={classes.headerButton} onClick={handleSetIsClose}>
                        <X size={16}/> 
                    </div> : null}
                </div>
            )
        }

        if(isShowButton) {
            return (
                <div className={`${classes.header}`}>
                    <div className={classes.headerButton} onClick={handleMiniPopup}>
                        <ChevronDown size={16}/>
                    </div> 
                    <div className={classes.headerButton} onClick={handleSetIsClose}>
                        <X size={16}/>
                    </div>
                </div>
            )
        } 

        return (
            <div className={`${classes.header}`} />
        )
    }, [isShowButton, classes, isMiniPopup, handleSetIsClose, handleMaxPopup, handleMiniPopup])

    return useMemo(() => {
        if(!isClose && match_products && match_products.length) {
            const product = match_products[0];
            const style = {}
            if(isMiniPopup) {
                style.display = 'none';
            }
            
            return (
                <div 
                    ref={popupWrapperRef}
                    className={`${classes.root} ${location === Constants.LOCATION_LEFT_POPUP_CONTENT ? classes.leftPopup : classes.rightPopup} `}
                    onMouseLeave={() => handleShowButton('leave')}
                    onMouseEnter={() => handleShowButton('enter')}
                >
                    {headerButton}
                    <div className={classes.content} style={style}>
                        <Item 
                            ruleId={rule_id}
                            blockName={blockName}
                            product={product}
                        />
                    </div>
                </div>
            )
            
        }

        return null
    }, [
        match_products, 
        rule_id,
        location,
        isClose,
        isMiniPopup,
        headerButton,
        blockName,
        classes, 
        handleShowButton,
    ])
}

export default Popup;