import {useCallback} from 'react'
import { useMutation, useLazyQuery } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { resourceUrl, useHistory } from '@magento/venia-drivers';
import {
    ADD_SIMPLE_MUTATION
} from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.gql';
import MP_ARP_UPDATE_TOTAL from '../../queries/mpARPUpdateTotal.graphql'

const SimpleProduct = 'SimpleProduct'

export const useGridItem = props => {

    const history = useHistory();

    const {product, ruleId} = props;

    const productType = product.__typename;

    const [{ cartId }] = useCartContext();

    const [
        addSimpleProductToCart,
        { error: errorAddingSimpleProduct, loading: isAddSimpleLoading }
    ] = useMutation(ADD_SIMPLE_MUTATION);

    const [
        updateTotal,
    ] = useMutation(MP_ARP_UPDATE_TOTAL, {ignoreResults: true})

    const quantity = 1;

    const handleClickItem = useCallback(() => {
        updateTotal({variables: {ruleId}})
    }, [updateTotal, ruleId])

    const handleAddToCart = useCallback(async() => {
        if(productType === SimpleProduct) {
            
            await addSimpleProductToCart({
                variables: {
                    cartId,
                    quantity,
                    sku: product.sku
                }
            })
        } else {
            const productLink = resourceUrl(`/${product.url_key}${product.url_suffix}`);
            history.push(productLink)
        }
    }, [
        addSimpleProductToCart,
        cartId,
        history,
        productType,
        product
    ])
    
    return {
        handleAddToCart,
        handleClickItem,
        isAddSimpleLoading,
        errorAddingSimpleProduct,
    }
}