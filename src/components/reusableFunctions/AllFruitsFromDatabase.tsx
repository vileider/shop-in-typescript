import { CustomFetch } from './CustomFetch';
import { AccesToServerPath } from '../../maintence/AccesToServerPath';
export const loadListEndPoint = [
    'vegAndFruit',
    'chemicals',
    'dinners',
    'dairyWheatAndEggs',
    'everythingElse'];


export const loadList = loadListEndPoint.map(async x => {
    const data = await CustomFetch(`${AccesToServerPath()}${x}`, 'GET')

})