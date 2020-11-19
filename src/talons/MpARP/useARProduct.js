import {useMemo} from 'react'
import {useQuery} from '@apollo/client'
import * as Constants from '../../constants'
import GET_MP_ARP_PRODUCT_PAGE from '../../queries/getMpARPProductPage.graphql'
import GET_MP_ARP_CART_PAGE from '../../queries/getMpARPShoppingCartPage.graphql'
import GET_MP_ARP_CATEGORY_PAGE from '../../queries/getMpARPCategoryPage.graphql'
import GET_MP_ARP_CHECKOUT_PAGE from '../../queries/getMpARPCheckoutPage.graphql'

const getQuery = (page, productSku, categoryId) => {
    const query = {variables: {}}
    switch (page) {
        case Constants.PRODUCT_PAGE:
            query.graphql = GET_MP_ARP_PRODUCT_PAGE
            query.attribute = 'mpARPProductPage'
            query.variables.sku = productSku
            break;
        case Constants.CATEGORY_PAGE:
            query.graphql = GET_MP_ARP_CATEGORY_PAGE
            query.attribute = 'mpARPCategoryPage'
            query.variables.categoryId = categoryId
            break;
        case Constants.CART_PAGE:
            query.graphql = GET_MP_ARP_CART_PAGE
            query.attribute = 'mpARPShoppingCartPage'
            break;
        case Constants.CHECKOUT_PAGE:
            query.graphql = GET_MP_ARP_CHECKOUT_PAGE
            query.attribute = 'mpARPCheckoutPage'
            break;
        default:
            query.graphql = GET_MP_ARP_PRODUCT_PAGE
            query.attribute = 'mpARPProductPage'
            break;
    }

    return query
}

export const useARProduct = props => {
    const {productSku, page, categoryId} = props;

    const query = useMemo(() => getQuery(page, productSku, categoryId), [page, productSku, categoryId])

    const {graphql, variables} = query

    const { data, loading } = useQuery(graphql, {
        variables,
    })

    return {
        loading,
        data,
        attribute: query.attribute
    }
}