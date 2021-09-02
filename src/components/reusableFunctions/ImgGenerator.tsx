const imgUrlGenerator = (props: string) => {
    return require('../../images/' + props + '.png').default;
}

export const errorHandlerForUrlGenerator = (props: string) => {
    try {
        return imgUrlGenerator(props)
    } catch (e) {
        if (e.message) {
            //console.log('there is no image for this:', e.message)
            return require('../../images/picture-not-found.png').default
        }
    }
}