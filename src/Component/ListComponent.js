import React from 'react'

const ListComponent = (props) => {
    return (
        <>
            {
                props.itemList && props.itemList.map((item, index) => {
                    return props.renderItem && props.renderItem(item, index)
                })
            }
        </>
    )
}

export default ListComponent
