import React, {useMemo} from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import * as Constants from '../../constants';
import defaultClasses from './mpARProduct.css'
import Gallery from '../Gallery';
import Popup from '../Popup';
 
const MpARProduct = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {location, arpProduct } = props
    const {data, loading, attribute} = arpProduct

    const filterData = useMemo(() => {
        if(data && data[attribute] && data[attribute].items) {
            const mpARPProductItems = data[attribute].items;
            return mpARPProductItems.filter((item) => item.location === location)
        }

        return null
    }, [attribute, data, location])
    
    const content = useMemo(() => {
        if(filterData) {
            return filterData.map((item, index) => {
                if(
                    location === Constants.LOCATION_RIGHT_POPUP_CONTENT 
                    || location === Constants.LOCATION_LEFT_POPUP_CONTENT
                ) {
                    return (
                        <Popup 
                            key={index}
                            item={item}
                        />
                    )
                } else {
                    return (
                        <div key={index}  className={classes.wrapper}>
                            <Gallery
                                item={item}
                            />
                         </div>
                    )
                }
            }) 
        }

        return null;
    }, [
        classes,
        filterData,
        location
    ])

    if(loading) {
        return <div className={classes.root}></div>
    }

    if(content && content.length && content.length > 0) {
        return (
            <div className={classes.root}>
                {content}
            </div>
        )
    }

    return null
}

export default MpARProduct;