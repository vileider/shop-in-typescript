import vegAndFruitImage from '../images/veg-fruit.png'
import chemicalsImage from '../images/chemicals.png'
export const ProductListObject = function () {

    const mainTopicButton = (imageSource, altName,) => {
        return (
            <button className='mainButtonContent' onTouchStart={(e) => {
                mainButtonClick(e)
            }}>
                <img src={imageSource} alt={altName} />
            </button>
        )
    }



    return
}