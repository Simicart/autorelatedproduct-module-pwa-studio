import React from 'react'

// import Giftcard from '@simicart/simi-giftcard'
// import Rewardpoint from '@simicart/simi-rewardpoint'
// import Storecredit from '@simicart/simi-storecredit'

const modules = [
    // Giftcard,
    // Rewardpoint,
    // Storecredit
]

export const positionComponent = (name, position, props) => {
    const components = []
    modules.forEach((module) => {
        if(module && module.name) {
            const loadFuncName = `use${module.name}`
            const loadFunc = module[loadFuncName]
            const moduleProps = loadFunc && loadFunc(props)
            if(moduleProps && moduleProps[name] && moduleProps[name][position]) {
                const injectComponents = moduleProps[name][position];
                if(injectComponents && injectComponents.length && injectComponents.length) {
                    injectComponents.forEach((Component, index) => {
                        components.push(<Component {...props} key={index}/>)
                    })
                }
            }
        }
        
    })


    return components
}